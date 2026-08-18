#!/usr/bin/env bash
set -euo pipefail

root=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
cd "$root"
work=$(mktemp -d "${TMPDIR:-/tmp}/miniface-python-compat.XXXXXX")
server_pid=

stop_server() {
  if [[ -n "$server_pid" ]] && kill -0 "$server_pid" 2>/dev/null; then
    kill -TERM "$server_pid" 2>/dev/null || true
    wait "$server_pid" || true
  fi
  server_pid=
}

redact_log() {
  sed -E 's/"token":"[^"]+"/"token":"[redacted]"/g' "$1" >&2
}

cleanup() {
  local status=$?
  stop_server
  if [[ "$status" -ne 0 ]]; then
    for log in "$work"/server-*.log; do
      [[ -f "$log" ]] && redact_log "$log"
    done
  fi
  rm -rf -- "$work"
  return "$status"
}
trap cleanup EXIT INT TERM

if [[ -n "${MINIFACE_PYTHON:-}" ]]; then
  python=$MINIFACE_PYTHON
else
  python3 -m venv "$work/venv"
  python="$work/venv/bin/python"
  "$python" -m pip --disable-pip-version-check --quiet install \
    huggingface_hub==1.27.0 hf_xet==1.6.0
fi

"$python" - <<'PY'
from importlib.metadata import version

expected = {"huggingface_hub": "1.27.0", "hf_xet": "1.6.0"}
actual = {package: version(package) for package in expected}
if actual != expected:
    raise SystemExit(f"incompatible Python environment: expected {expected}, got {actual}")
PY

go build -o "$work/miniface" ./cmd/miniface

port=$("$python" - <<'PY'
import socket

with socket.socket() as sock:
    sock.bind(("127.0.0.1", 0))
    print(sock.getsockname()[1])
PY
)
endpoint="http://127.0.0.1:$port"

start_server() {
  local log=$1
  "$work/miniface" \
    --listen "127.0.0.1:$port" \
    --base-url "$endpoint" \
    --data-dir "$work/data" \
    --import-root "$work" >"$log" 2>&1 &
  server_pid=$!
  for _ in $(seq 1 200); do
    if curl --fail --silent --show-error "$endpoint/readyz" >/dev/null 2>&1; then
      return
    fi
    if ! kill -0 "$server_pid" 2>/dev/null; then
      redact_log "$log"
      return 1
    fi
    sleep 0.05
  done
  echo "Miniface did not become ready" >&2
  redact_log "$log"
  return 1
}

mkdir -p "$work/adapter"
"$python" - "$work/adapter" <<'PY'
import json
import pathlib
import sys

target = pathlib.Path(sys.argv[1])
(target / "adapter_config.json").write_text(json.dumps({
    "base_model_name_or_path": "local/base-model",
    "revision": "0123456789abcdef0123456789abcdef01234567",
    "peft_type": "LORA",
}), encoding="utf-8")
(target / "adapter_model.safetensors").write_bytes(
    (b"miniface-python-compatibility\n" * 100_000)[: 2 * 1024 * 1024]
)
(target / "README.md").write_text("---\nlicense: other\n---\n# Ignored by this profile\n", encoding="utf-8")
PY

start_server "$work/server-first.log"

token=
for _ in $(seq 1 100); do
  token=$("$python" - "$work/server-first.log" <<'PY'
import json
import pathlib
import sys

for line in pathlib.Path(sys.argv[1]).read_text(encoding="utf-8").splitlines():
    try:
        record = json.loads(line)
    except json.JSONDecodeError:
        continue
    if record.get("msg", "").startswith("generated administrator token"):
        print(record["token"])
        break
PY
  )
  [[ -n "$token" ]] && break
  sleep 0.05
done
if [[ -z "$token" ]]; then
  echo "First startup did not produce an administrator token" >&2
  exit 1
fi

HF_ENDPOINT="$endpoint" \
HF_TOKEN="$token" \
HF_HUB_DISABLE_XET=1 \
"$python" - "$work/adapter" "$work/revision" <<'PY'
import pathlib
import sys

from huggingface_hub import HfApi

source, revision_file = map(pathlib.Path, sys.argv[1:])
api = HfApi()
api.create_repo("local/compat-adapter", exist_ok=True)
commit = api.upload_folder(
    repo_id="local/compat-adapter",
    folder_path=source,
    ignore_patterns="README.md",
    commit_message="Python compatibility adapter",
)
revision_file.write_text(commit.oid, encoding="ascii")
PY

revision=$(cat "$work/revision")
if [[ ! "$revision" =~ ^[0-9a-f]{40}$ ]]; then
  echo "Upload returned an invalid revision" >&2
  exit 1
fi

env -u HF_HUB_DISABLE_XET \
  HF_ENDPOINT="$endpoint" \
  HF_TOKEN="$token" \
  "$python" - "$work/adapter" "$work/native" "$revision" "$work/revision" <<'PY'
import pathlib
import sys

from huggingface_hub import HfApi, snapshot_download

source, destination = map(pathlib.Path, sys.argv[1:3])
revision, revision_file = sys.argv[3], pathlib.Path(sys.argv[4])
expected = source / "adapter_model.safetensors"
downloaded = pathlib.Path(snapshot_download(
    "local/compat-adapter",
    revision=revision,
    local_dir=destination,
)) / expected.name
if downloaded.read_bytes() != expected.read_bytes():
    raise SystemExit("native Xet download did not match the uploaded bytes")

# Keep the download and native Xet upload in this one process. huggingface_hub
# and hf_xet cache endpoint/Xet settings at import time, so this catches the
# process-global interoperability failure that separate commands would miss.
expected.write_bytes(expected.read_bytes() + b"native-xet-update\n")
commit = HfApi().upload_folder(
    repo_id="local/compat-adapter",
    folder_path=source,
    ignore_patterns="README.md",
    commit_message="Native Xet compatibility update",
)
if commit.oid == revision:
    raise SystemExit("native Xet upload did not publish a new revision")
revision_file.write_text(commit.oid, encoding="ascii")
PY

revision=$(cat "$work/revision")
"$python" - "$work/server-first.log" <<'PY'
import json
import pathlib
import sys

records = []
for line in pathlib.Path(sys.argv[1]).read_text(encoding="utf-8").splitlines():
    try:
        records.append(json.loads(line))
    except json.JSONDecodeError:
        pass
if not any("/xet-write-token/" in record.get("path", "") and record.get("status") == 200 for record in records):
    raise SystemExit("native upload did not obtain an Xet write token")
PY
stop_server
start_server "$work/server-second.log"

HF_ENDPOINT="$endpoint" \
HF_TOKEN="$token" \
HF_HUB_DISABLE_XET=1 \
"$python" - "$work/adapter/adapter_model.safetensors" "$work/fallback" "$revision" <<'PY'
import pathlib
import sys

from huggingface_hub import HfApi, snapshot_download

expected, destination = map(pathlib.Path, sys.argv[1:3])
revision = sys.argv[3]
info = HfApi().model_info("local/compat-adapter", revision=revision)
if info.sha != revision:
    raise SystemExit(f"revision changed across restart: {info.sha} != {revision}")
downloaded = pathlib.Path(snapshot_download(
    "local/compat-adapter",
    revision=revision,
    local_dir=destination,
)) / expected.name
if downloaded.read_bytes() != expected.read_bytes():
    raise SystemExit("ordinary HTTP download did not match the uploaded bytes")
PY

"$python" - "$endpoint" "$token" "$revision" <<'PY'
import http.cookiejar
import json
import sys
import urllib.request

endpoint, token, revision = sys.argv[1:]
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
login = urllib.request.Request(
    endpoint + "/api/miniface/v1/session",
    data=json.dumps({"token": token}).encode(),
    headers={"Content-Type": "application/json"},
    method="POST",
)
with opener.open(login) as response:
    if not json.load(response).get("authenticated"):
        raise SystemExit("Miniface UI login failed after Hub upload")
with opener.open(endpoint + "/api/miniface/v1/models") as response:
    models = json.load(response)["models"]
model = next((item for item in models if item["id"] == "local/compat-adapter"), None)
if model is None:
    raise SystemExit("Hub-uploaded model is absent from the Miniface model API")
expected = {
    "sha": revision,
    "kind": "adapter",
    "base_model": "local/base-model",
    "base_revision": "0123456789abcdef0123456789abcdef01234567",
    "validation_status": "valid",
}
actual = {key: model.get(key) for key in expected}
if actual != expected:
    raise SystemExit(f"Miniface metadata did not integrate the Hub commit: {actual} != {expected}")
PY

echo "Python compatibility passed: basic-LFS upload, native-Xet download then upload in one process, restart persistence, HTTP fallback"
