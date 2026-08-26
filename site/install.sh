#!/bin/sh
set -eu

repository="jmwoliver/miniface"
download_root="${MINIFACE_DOWNLOAD_ROOT:-https://github.com/${repository}/releases}"
version="${MINIFACE_VERSION:-latest}"
install_dir="${MINIFACE_INSTALL_DIR:-${HOME}/.local/bin}"

fail() {
  printf 'miniface: %s\n' "$1" >&2
  exit 1
}

command -v curl >/dev/null 2>&1 || fail "curl is required"
command -v tar >/dev/null 2>&1 || fail "tar is required"

case "$(uname -s)" in
  Linux) os="linux" ;;
  Darwin) os="darwin" ;;
  *) fail "unsupported operating system: $(uname -s) (Linux and macOS are supported)" ;;
esac

case "$(uname -m)" in
  x86_64|amd64) arch="amd64" ;;
  arm64|aarch64) arch="arm64" ;;
  *) fail "unsupported architecture: $(uname -m) (x86-64 and ARM64 are supported)" ;;
esac

case "$version" in
  latest) release_path="latest/download" ;;
  v[0-9]*.[0-9]*.[0-9]*) release_path="download/${version}" ;;
  *) fail "MINIFACE_VERSION must be 'latest' or a tag such as v0.1.0" ;;
esac

archive="miniface_${os}_${arch}.tar.gz"
temporary="$(mktemp -d 2>/dev/null || mktemp -d -t miniface)"
trap 'rm -rf "$temporary"' EXIT HUP INT TERM

printf 'Downloading Miniface for %s/%s...\n' "$os" "$arch"
curl -fsSL "${download_root}/${release_path}/${archive}" -o "${temporary}/${archive}"
curl -fsSL "${download_root}/${release_path}/checksums.txt" -o "${temporary}/checksums.txt"

expected="$(awk -v archive="$archive" '$2 == archive || $2 == "*" archive { print $1; exit }' "${temporary}/checksums.txt")"
[ -n "$expected" ] || fail "release checksum for ${archive} was not found"

if command -v sha256sum >/dev/null 2>&1; then
  actual="$(sha256sum "${temporary}/${archive}" | awk '{ print $1 }')"
elif command -v shasum >/dev/null 2>&1; then
  actual="$(shasum -a 256 "${temporary}/${archive}" | awk '{ print $1 }')"
else
  fail "sha256sum or shasum is required to verify the download"
fi

[ "$actual" = "$expected" ] || fail "checksum verification failed for ${archive}"

tar -xzf "${temporary}/${archive}" -C "$temporary" miniface
mkdir -p "$install_dir"
install -m 0755 "${temporary}/miniface" "${install_dir}/miniface"

printf 'Installed Miniface to %s/miniface\n' "$install_dir"
case ":${PATH:-}:" in
  *":${install_dir}:"*) printf 'Run: miniface\n' ;;
  *)
    printf 'Add %s to your PATH, then run: miniface\n' "$install_dir"
    ;;
esac
