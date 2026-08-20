# Miniface

Miniface is a local-first model registry: a deliberately small slice of the
Hugging Face Hub for models you own and train locally. It combines a Go server,
an embedded Svelte UI, and [`xet-go`](https://github.com/jmwoliver/xet-go) for
deduplicated model storage and Xet-compatible transfers.

The current alpha implements the useful local loop:

1. Import a Transformers model from a local directory or mirror a pinned
   repository snapshot directly from Hugging Face, or create an empty model
   repository.
2. Inspect its files, immutable revisions, model card, storage usage, and
   detected architecture/adapter provenance in the browser.
3. Download it with `hf`, `huggingface_hub`, Transformers, PEFT, or Unsloth by
   setting `HF_ENDPOINT`.
4. Fine-tune outside Miniface.
5. Upload weights or adapters with `HfApi.upload_folder`/`hf upload` through
   native Xet, with basic LFS as the no-`hf_xet` fallback.
6. Reload the adapter with both its adapter revision and immutable base-model
   revision pinned.

The detailed product and architecture blueprint is in [PLAN.md](PLAN.md).

## Architecture

```text
┌──────────────────────────────┐
│ Svelte 5 + SvelteKit         │
│ static SPA built by Vite     │
└──────────────┬───────────────┘
               │ embedded in one binary
┌──────────────▼───────────────┐
│ Go HTTP server               │
│ UI API · HF API · auth/jobs  │
└──────┬──────────────┬────────┘
       │              │
┌──────▼───────┐  ┌───▼─────────────────────────────┐
│ Miniface     │  │ xet-go local profile            │
│ SQLite       │  │ catalog SQLite · CAS SQLite     │
│ jobs/secrets │  │ ordinary files · Xet objects    │
└──────────────┘  └─────────────────────────────────┘
```

Miniface application state is kept separate from the `xet-go` catalog and CAS
schemas. The catalog is authoritative for repositories, immutable snapshots,
refs, and file identities. `xet-go` is pinned to an exact release and is
contained behind `internal/storage`.

## Requirements

- Go 1.26+
- Bun 1.3+
- Linux or macOS for the durable local filesystem profile

Bun is the package manager and task runner. Vite remains the Svelte compiler,
development server, HMR implementation, and production bundler.

`xet-go` is available under the MIT License.

## Build and run

Build the frontend first because its output is embedded into the Go binary:

```bash
bun install --cwd web --frozen-lockfile
bun run --cwd web check
bun run --cwd web test
bun run --cwd web build

go test ./...
go build -o miniface ./cmd/miniface
```

Start the local server:

```bash
./miniface \
  --listen 127.0.0.1:8080 \
  --data-dir "$HOME/.local/share/miniface" \
  --import-root "$HOME/models"
```

On first startup, Miniface prints a high-entropy, one-time setup secret. Enter
it in the browser and create the administrator password; setup consumes the
secret atomically. Browser sign-in creates a persistent HttpOnly, SameSite
session with a separate CSRF token. Password verifiers use Argon2id.

Create a named personal access token under **Settings → Tokens** before using
the `hf` CLI or Python clients. PATs are shown once, stored only as SHA-256
verifiers, independently revocable, optionally expiring, and scoped to read or
read/write access. Browser passwords, browser sessions, Miniface PATs, and the
optional Hugging Face credential used to mirror a private model are separate
credentials.

If the administrator password is lost, stop Miniface and run:

```bash
./miniface auth recover --data-dir "$HOME/.local/share/miniface"
```

Recovery revokes all PATs, invalidates every browser session, and prints a new
one-time setup secret. Existing installations that still have the former
shared `mf_…` administrator token may enter it once on the setup screen; it is
revoked when setup completes.

By default local-directory imports are limited to the user's home directory.
Repeat `--import-root` to define narrower or additional roots. Imports use Go's
rooted filesystem API, reject symlinks, special files, `.git`, and `.cache`, and
re-check source file identity after ingest.

### Import directly from Hugging Face

Open **Imports**, select **Hugging Face**, and search public models or enter an
exact `owner/model` repository ID. Miniface defaults the target repository to
the same ID. Choose a branch, tag, or commit (default `main`), then start the
import. The server:

1. Resolves the requested revision once to its immutable Hugging Face commit.
2. Enumerates the complete repository tree, including paginated results.
3. Matches Hugging Face Xet files against every local model revision by exact
   Xet hash, logical size, and SHA-256. A match is registered in the destination
   repository through `xet-go` without downloading, reconstructing, chunking,
   or uploading the logical file or its Xorb payloads.
4. Checks that local free space can hold only the files that still require a
   transfer plus a 5 GiB safety reserve. On Linux it applies the memory check to
   the largest Xet file that cannot use the local clone path.
5. Streams the remaining files from that commit directly into managed Miniface
   storage. Large reconstructed files are streamed through `xet-go` without a
   full-file staging copy or Python dependency.
6. Publishes the Miniface snapshot only after all files are durable and records
   the source repository and immutable source commit as provenance.

The clone path is exact-file reuse within Miniface's own CAS, not a server-side
copy from Hugging Face. It makes a mirrored or forked model nearly immediate
when its large files already exist locally, while changed or unavailable files
fall back to the normal verified transfer. Small configuration files continue
to download so model classification metadata stays current.

Public search does not require a credential. For a private or gated repository,
enter an optional Hugging Face user access token in the import form. You must
first accept or request any gated-model terms on `huggingface.co`. The token is
sent only to Hugging Face, is stripped before cross-origin signed CDN requests,
and exists only in the active in-memory job; Miniface does not log or persist
it. Because the credential is intentionally not durable, a server restart
fails an in-progress remote import rather than automatically resuming it.
Queued and running imports can be canceled from **Jobs**. Cancellation stops
network and Xet work and never deletes an already published model. Miniface
does not currently support pause/resume. Xet objects written before a canceled
or failed snapshot may remain until safe shared-object garbage collection is
implemented.

The pinned upstream `xet-go` revision releases each finalized Xorb's raw chunk
payloads while retaining its reconstruction metadata. Xet ingestion therefore
uses bounded payload memory rather than a working set proportional to the
largest model file. It uses one upload worker and, on Linux, requires 4 GiB of
available memory to cover Xorb encoding, the local CAS server, and process
overhead.

Run `./miniface -h` for all configuration flags. Non-loopback binds require
`--allow-remote` and an HTTPS `--base-url`; the current single-administrator
profile is still intended for private use, not an Internet-facing deployment.

## Download profile: Xet enabled

Set the endpoint and token **before** starting Python or the `hf` CLI:

```bash
export HF_ENDPOINT=http://127.0.0.1:8080
export HF_TOKEN=mf_pat_your_token

hf download local/my-model --revision 0123456789abcdef0123456789abcdef01234567
```

Python:

```python
import os

os.environ["HF_ENDPOINT"] = "http://127.0.0.1:8080"
os.environ["HF_TOKEN"] = "mf_pat_your_token"

from transformers import AutoModelForCausalLM, AutoTokenizer

repo_id = "local/my-model"
revision = "0123456789abcdef0123456789abcdef01234567"
tokenizer = AutoTokenizer.from_pretrained(repo_id, revision=revision)
model = AutoModelForCausalLM.from_pretrained(
    repo_id,
    revision=revision,
    trust_remote_code=False,
)
```

The server supports model info, recursive tree, full/range resolve, Xet read
token, CAS reconstruction, and exact-range capability routes. Exact-range URLs
are HMAC-bound to one physical object, range, and expiration and carry no Hub
bearer credential.

To test the ordinary HTTP fallback in a **fresh process**:

```bash
HF_HUB_DISABLE_XET=1 hf download local/my-model --revision "$REVISION"
```

## Upload profile: native Xet with basic LFS fallback

When `hf_xet` is installed, `huggingface_hub` selects native Xet writes and
Miniface exchanges a repository-scoped write token for its embedded Xet CAS.
No Xet environment override is needed:

```bash
export HF_ENDPOINT=http://127.0.0.1:8080
export HF_TOKEN=mf_pat_your_token

hf upload local/my-adapter ./adapter-output --exclude README.md
```

Equivalent explicit Python flow:

```python
import os

os.environ["HF_ENDPOINT"] = "http://127.0.0.1:8080"
os.environ["HF_TOKEN"] = "mf_pat_your_token"

from huggingface_hub import HfApi

api = HfApi(endpoint=os.environ["HF_ENDPOINT"], token=True)
api.create_repo("local/my-adapter", exist_ok=True)
commit = api.upload_folder(
    repo_id="local/my-adapter",
    folder_path="./adapter-output",
    ignore_patterns="README.md",
    commit_message="Upload trained adapter",
)
print(commit.oid)
```

Clients without `hf_xet` use the basic LFS fallback. To exercise that profile
explicitly, set `HF_HUB_DISABLE_XET=1` before importing `huggingface_hub` or
starting `hf`; Miniface verifies the complete SHA-256 and length before
streaming the object through the Xet engine.

Root `README.md` is intentionally excluded from this generic local-only flow.
`huggingface_hub` 1.27.0 sends root model cards to a hard-coded public
`https://huggingface.co/api/validate-yaml` endpoint before contacting a custom
registry. Edit the model card in Miniface's UI/API instead; that path performs
no public validation request. Non-root README files do not trigger that client
behavior.

Large files (currently 1 MiB and above) are classified for Xet/LFS transfer.
Native clients write Xorbs and shards through scoped CAS routes; fallback
clients receive a short-lived self-authorizing PUT. Small files are included in
the NDJSON commit as ordinary content. Snapshot publication and ref advancement
are atomic. Replaying an identical upload returns the existing immutable
revision rather than creating a duplicate commit.

## Unsloth and PEFT adapters

Load a base model at an immutable revision:

```python
import os

os.environ["HF_ENDPOINT"] = "http://127.0.0.1:8080"
os.environ["HF_TOKEN"] = "mf_pat_your_token"

from unsloth import FastLanguageModel

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="local/base-model",
    revision="BASE_COMMIT_OID",
    use_exact_model_name=True,
    fast_inference=False,
)
```

For an adapter, pin the base and adapter independently. An adapter revision
does not pin the base model used by PEFT/Unsloth:

```python
from peft import PeftModel
from unsloth import FastLanguageModel

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="local/base-model",
    revision="BASE_COMMIT_OID",
    use_exact_model_name=True,
    fast_inference=False,
)
model = PeftModel.from_pretrained(
    model,
    "local/my-adapter",
    revision="ADAPTER_COMMIT_OID",
)
```

Miniface reads `base_model_name_or_path` and `revision` from
`adapter_config.json`. Missing base revision is shown as a warning. The UI
generates the two-stage pinned load snippet for recognized adapters.

## Verified compatibility

The current implementation was exercised with:

- `xet-go` `v0.1.1`
- `huggingface_hub` 1.27.0
- `hf_xet` 1.6.0
- Svelte 5.38.7, SvelteKit 2.27.0, Vite 6.1.0, Bun 1.3.10

Repository tests cover setup-secret consumption, password and PAT persistence,
scope/expiry/revocation, persistent browser sessions, CSRF-authenticated UI imports,
rooted and Hugging Face import behavior, ordinary and Xet storage selection,
remote revision pinning and credential stripping, zero-transfer exact Xet
clones, Hub resolve byte identity, metadata classification, and exact-range
capability tampering and expiry. During implementation, the official Python
client was also used to verify native-Xet and Xet-disabled downloads, native-Xet
and basic-LFS adapter uploads, retry idempotency, restart-stable OIDs, and byte
identity.

Run that official-client compatibility path repeatably with:

```bash
./scripts/test-python-compat.sh
```

The script creates a disposable data directory and Python virtual environment,
installs the pinned client versions above, builds Miniface, uploads a 2 MiB
adapter through basic LFS, then downloads and updates it through native Xet in
one Python process. It restarts Miniface, downloads the same immutable revision
through the ordinary HTTP fallback, and verifies the upload appears with its
adapter metadata in Miniface's own API.
To reuse an already prepared environment, set `MINIFACE_PYTHON` to its Python
executable. The script never prints the generated setup secret or PAT.

## Current scope and limitations

Implemented now:

- Local SQLite/filesystem profile and one embedded static UI binary.
- Model-only repositories, immutable snapshots, branches/refs used by clients.
- Single-administrator password authentication, persistent browser sessions,
  CSRF, one-time setup, recovery, and named revocable PATs.
- Safe local-directory import and persistent job history.
- Direct Hugging Face search/import with immutable source provenance and
  ephemeral private/gated-model credentials.
- Hugging Face model read/write APIs, native Xet transfer, and basic LFS
  fallback.
- Model-card editing through Miniface.
- Architecture, quantization, remote-code warning, and PEFT base provenance.
- Hierarchical revision-aware file browsing, bounded text previews, downloads,
  repository storage inventory, and deduplication statistics.
- Liveness/readiness, structured request logs, and graceful shutdown.

Not implemented yet:

- PostgreSQL/S3 remote profile and OIDC/multi-user ACLs.
- Git smart HTTP, datasets, Spaces, inference serving, or a training scheduler.
- Pull requests and the full hosted Hugging Face API surface.
- Garbage collection. Physical immutable storage currently grows monotonically.
- Windows durability guarantees.

Back up the complete data directory together: Miniface SQLite, catalog SQLite,
CAS-index SQLite, ordinary objects, Xet objects, and signing keys are one
operational unit.
