# Miniface implementation plan

- **Status:** Proposed
- **Last updated:** 2026-08-11

## 1. Executive summary

Miniface will be a local-first, model-only Hugging Face-compatible registry backed by Xet storage. It will let a user:

1. Import and inspect models stored locally.
2. Use `hf download`, a documented `hf upload` compatibility profile, `huggingface_hub`, Transformers, and PEFT against Miniface through `HF_ENDPOINT`.
3. Load Miniface models with Unsloth.
4. Fine-tune a model with Unsloth and publish the resulting adapter or merged weights back to Miniface.
5. Start with a single-user SQLite/filesystem deployment and later run the same server with PostgreSQL/S3.

Miniface is not intended to reproduce all of Hugging Face. The initial product is a small, coherent model registry with immutable revisions, large-file deduplication, a useful local UI, and reliable training-tool interoperability.

The application will be delivered as one Go server containing an embedded static Svelte frontend:

```text
Svelte 5 + SvelteKit + TypeScript
              │
              │ static build produced by Vite
              ▼
       embedded in Go binary
              │
              ▼
Hub API + Miniface API + Xet CAS + UI
              │
       ┌──────┴──────┐
       ▼             ▼
SQLite/filesystem  PostgreSQL/S3
```

The first prerequisite is resolving the license of `github.com/jmwoliver/xet-go`. At the time of this plan, the repository has no visible license file or tagged release. Miniface must not distribute an embedded copy until an explicit license or other permission exists.

## 2. Product definition

### 2.1 Goals

#### Local model registry

- List repositories and model revisions managed by Miniface.
- Inspect files, model configuration, safetensors layout, tokenizer/processor availability, quantization, and model cards.
- Distinguish base models, PEFT adapters, merged models, and initially unknown artifacts.
- Display adapter-to-base-model relationships.
- Show logical size, physical storage use, and deduplication savings when available.
- Import arbitrary local model directories into Miniface-owned Xet storage.
- Later discover existing Hugging Face cache snapshots without treating the external cache as authoritative.

#### Hugging Face client compatibility

- Support model repositories through `HF_ENDPOINT`.
- Support `hf download`, `hf_hub_download`, and `snapshot_download`.
- Support `hf upload`, `HfApi.upload_file`, and `HfApi.upload_folder` under an explicitly pinned and tested client profile.
- Support repository creation, immutable revisions, branch resolution, file trees, commits, regular files, and large files.
- Retain ordinary HTTP download fallback when `hf_xet` is unavailable or disabled.
- Keep the accepted local-only upload workflow from contacting the public Hugging Face service.

#### Unsloth interoperability

- Load a Miniface base model by repository ID and immutable revision.
- Load a Miniface PEFT adapter and resolve its base model.
- Fine-tune outside Miniface using ordinary Unsloth/TRL workflows.
- Save an adapter or merged safetensors model locally.
- Upload the output back to Miniface.
- Generate copyable, endpoint-correct examples from the UI.

#### Local-first operation

- Run as one process and one distributable binary.
- Use SQLite and the local filesystem by default.
- Require no Node, Bun, or Python runtime to serve the production UI.
- Bind to the loopback interface by default in local mode.
- Preserve immutable revisions across server restarts.

#### Remote operation

- Support PostgreSQL and S3 without changing the external Hub contract.
- Support multiple users, personal access tokens, repository policies, and short-lived CAS credentials.
- Provide recovery, observability, backup, and lifecycle tooling suitable for a persistent server.

### 2.2 Explicit non-goals for the first release

- Datasets and Spaces.
- Git smart HTTP, `git clone`, or `git push` compatibility.
- Pull requests, discussions, likes, download counts, or other social Hub features.
- Hosted inference.
- A GPU scheduler or embedded training runtime.
- Copying or embedding the Unsloth Studio UI.
- Direct native `hf_xet` uploads in the first writable release.
- Safe object deletion or garbage collection in the first alpha.
- Durable local server operation on Windows in the first release.

These can be revisited only after the model upload/download and Unsloth vertical slice is reliable.

## 3. Technology decisions

### 3.1 Chosen stack

| Layer | Choice |
| --- | --- |
| Backend language | Go 1.26 |
| HTTP server | Standard `net/http`; add a small router only if route complexity requires it |
| Xet integration | `github.com/jmwoliver/xet-go`, pinned behind Miniface-owned interfaces |
| Local metadata | SQLite |
| Local object storage | Filesystem |
| Remote metadata | PostgreSQL |
| Remote object storage | S3-compatible storage |
| Frontend language | TypeScript in strict mode |
| Frontend framework | Svelte 5 + SvelteKit |
| Frontend build | Vite |
| JS package manager/task runner | Bun |
| Frontend deployment | `@sveltejs/adapter-static`, embedded with Go `//go:embed` |
| UI API | Versioned JSON REST API |
| API types | OpenAPI-generated TypeScript types for the Miniface UI API |
| Backend tests | Go unit, integration, race, and protocol compatibility tests |
| Frontend tests | Vitest, Svelte Testing Library, and targeted Playwright tests |

### 3.2 Why Go owns the backend

- `xet-go` can be embedded directly without FFI or an additional storage service.
- Go is well suited to streaming multi-gigabyte request and response bodies.
- The standard HTTP interfaces compose naturally with `xet-go` handlers.
- One implementation can serve local SQLite/filesystem and remote PostgreSQL/S3 profiles.
- A statically linked server keeps local installation and operation simple.
- Go can serve the UI, Hub routes, Xet CAS routes, jobs, and administration from one process.

Miniface should begin with `net/http`. Gin, Echo, Fiber, or a larger framework should not be introduced unless standard routing demonstrably becomes a maintenance problem.

### 3.3 Why SvelteKit, Bun, and Vite are all used

The tools have complementary responsibilities:

- **SvelteKit** provides application routing, layouts, and build conventions.
- **Vite** compiles Svelte components, provides development HMR, and emits browser assets.
- **Bun** installs dependencies, maintains the lockfile, and runs development/build commands.
- **Go** serves the resulting assets in production.

The production deployment will not run a SvelteKit server. SvelteKit will use its static adapter in client-side application mode. Dynamic UI routes will resolve to the static application shell after API, Hub, CAS, and file-resolution routes have been checked by Go.

Expected development flow:

```text
bun install
bun run dev       # SvelteKit/Vite development server
bun run build     # static frontend output
go build          # embeds the static output
```

Bun's browser bundler will not replace Vite. Svelte's official compiler integration, HMR, plugins, and SvelteKit itself are built around Vite.

### 3.4 Frontend dependency policy

Start with a restrained set of dependencies:

- Svelte and SvelteKit.
- TypeScript.
- Vite and the Svelte Vite plugin.
- Tailwind CSS for layout and styling.
- A small accessible Svelte primitive library only for controls that are difficult to implement correctly, such as dialogs and menus.
- A generated typed API client.
- Svelte runes/stores and ordinary fetch logic initially.
- `@tanstack/svelte-query` only when job polling, cache invalidation, and cross-route server state justify it.

Do not add a global client-state framework, large component suite, or form abstraction without a concrete need.

## 4. System architecture

```text
                            ┌──────────────────────────────┐
                            │  Svelte Miniface web UI      │
                            │  models, imports, jobs,      │
                            │  revisions, storage, tokens  │
                            └──────────────┬───────────────┘
                                           │ JSON
                                           ▼
┌──────────────────────┐       ┌──────────────────────────────┐
│ hf CLI               │       │ Miniface Go server           │
│ huggingface_hub      │──────▶│                              │
│ Transformers / PEFT  │       │ ┌──────────────────────────┐ │
│ Unsloth              │       │ │ HF-compatible API        │ │
└──────────────────────┘       │ ├──────────────────────────┤ │
                               │ │ Miniface UI/admin API    │ │
                               │ ├──────────────────────────┤ │
                               │ │ auth / commit / jobs     │ │
                               │ ├──────────────────────────┤ │
                               │ │ xet-go adapter           │ │
                               │ └────────────┬─────────────┘ │
                               └──────────────┼───────────────┘
                                              │
                   ┌──────────────────────────┴──────────────────────────┐
                   ▼                                                     ▼
        ┌─────────────────────────┐                         ┌─────────────────────────┐
        │ Local profile           │                         │ Remote profile          │
        │ app SQLite              │                         │ Miniface PG schema      │
        │ xet catalog SQLite      │                         │ xet catalog PG schema   │
        │ xet CAS-index SQLite    │                         │ xet CAS-index PG schema │
        │ ordinary filesystem     │                         │ ordinary S3 prefix      │
        │ Xet object filesystem   │                         │ Xet object S3 prefix    │
        └─────────────────────────┘                         └─────────────────────────┘
```

### 4.1 Server responsibilities

The Go server will own:

- Process configuration and backend composition.
- HTTP routing and middleware.
- Static UI assets.
- Hugging Face-compatible model APIs.
- Miniface-specific UI and administration APIs.
- Authentication and repository authorization.
- Upload-session and commit orchestration.
- Model import and metadata indexing jobs.
- Xet CAS serving and local range capabilities.
- Health, readiness, logging, metrics, and graceful shutdown.
- Recovery and, later, garbage-collection jobs.

### 4.2 Route families

The intended route families are:

```text
/                              Svelte application
/api/miniface/v1/*             Miniface UI/admin API
/api/models*                   Hugging Face model API
/api/repos/create              Hugging Face repository creation
/{owner}/{repo}/resolve/*      Hugging Face file resolution
/{owner}/{repo}.git/info/lfs/* Hugging Face LFS negotiation
/cas/*                         Xet CAS API
/objects/*                     short-lived exact-range capabilities
/healthz                       liveness
/readyz                        backend readiness
```

Route precedence must prevent the Svelte fallback from consuming Hub, CAS, object, or health routes.

### 4.3 Miniface-owned storage interface

`xet-go` is untagged and may evolve. Its types should remain inside one adapter boundary. Miniface application code should depend on an interface representing product operations, not raw CAS internals. Expected capabilities include:

- Create and list repositories.
- Resolve a branch, tag, or immutable revision.
- Read a complete immutable file tree.
- Open a file or byte range independently of its physical representation.
- Ingest an ordinary blob.
- Stream a large file into Xet.
- Publish a complete snapshot and compare-and-swap a ref.
- Enumerate storage inventory for audits and lifecycle jobs.

The exact interface should be extracted from the first vertical slice rather than designed exhaustively in advance.

## 5. Storage design

### 5.1 Storage roles

There are three distinct storage concerns:

1. **Repository catalog:** repository identities, immutable snapshots, refs, and file references.
2. **Ordinary content:** small files addressed by SHA-256 and exact length.
3. **Xet CAS:** Xorb/shard bytes plus reconstruction, deduplication, and protection indexes.

Small configuration, tokenizer, model-card, and metadata files should normally use ordinary storage. Large weights and other large binary files should use Xet. The regular-versus-large threshold will be a fixed server policy in the first release and selected during the protocol spike; it will not initially be exposed as user-facing configuration.

### 5.2 Local profile

| Concern | Implementation |
| --- | --- |
| Miniface users, jobs, uploads, annotations | Miniface SQLite database |
| Repository catalog | `xet-go/catalog/sqlite` |
| Ordinary content | `xet-go/content/filesystem` |
| Xet bytes | `xet-go/xetcas/server.FilesystemBlobStore` |
| Xet indexes | `xet-go/xetcas/server.SQLiteIndexStore` |

The local profile assumes one Miniface server owns the CAS filesystem root. Initial durable support will target Linux and macOS. Network filesystems and Windows durability will not be claimed until tested and explicitly supported.

### 5.3 Remote profile

| Concern | Implementation |
| --- | --- |
| Miniface users, jobs, uploads, annotations | PostgreSQL `miniface` schema |
| Repository catalog | `xet-go/catalog/postgres`, separate schema |
| Ordinary content | `xet-go/content/s3`, separate prefix |
| Xet bytes and signed ranges | `xet-go/xetcas/server/s3store` |
| Xet indexes | `xet-go/xetcas/server/postgresstore`, separate schema |

The catalog and CAS schemas should remain isolated from Miniface application tables to avoid migration collisions with `xet-go`.

### 5.4 Local exact-range capability handler

Official Xet downloads obtain short-lived URLs for exact object ranges. S3 can provide these through presigned requests; the local filesystem profile does not currently include a production signer/handler bundle.

Miniface must implement a local capability route that:

- Binds a token to one physical object and one exact range.
- Has a short, authoritative expiry.
- Does not reveal filesystem paths.
- Requires no Hub bearer to be forwarded to the capability URL.
- Returns exact range and length metadata.
- Is covered by tampering, expiry, traversal, and replay tests.

### 5.5 Snapshot and revision identity

Every commit produces a complete immutable snapshot. Branches and tags resolve to snapshot OIDs. A Miniface commit OID will be a random 20-byte value rendered as 40 lowercase hexadecimal characters.

It must be:

- Stable for the lifetime of the snapshot.
- Returned consistently from model info, tree, resolve, commit, and history APIs.
- Accepted directly wherever a revision is allowed.
- Distinct from internal snapshot fingerprints.

Miniface does not need to synthesize real Git commits unless Git compatibility becomes a future requirement.

## 6. Application data model

The `xet-go` catalog remains authoritative for repository trees and file identities. Miniface owns product and operational metadata in a separate schema.

### 6.1 Principal and token

- Stable principal ID.
- Display name.
- Token prefix and cryptographic verifier, never the original token.
- Read/write/admin scopes.
- Creation, last-use, expiry, and revocation timestamps.

### 6.2 Repository settings

- Repository key.
- Owner/principal.
- Visibility.
- Default branch.
- Display metadata and labels.
- Optional retention policy in later releases.

### 6.3 Commit annotation

`xet-go` snapshots are authoritative for the OID, parent, creation time, author identity, message, and complete file tree. Miniface must not maintain independent authoritative copies of those values in another database.

A Miniface operation/provenance record keyed by repository and snapshot OID may add:

- Stable Miniface principal ID corresponding to the snapshot author identity.
- Client request/operation key and canonical intent hash.
- Prepared publication state used for crash recovery.
- Optional training or import provenance not represented by the snapshot.

Miniface completion state is derived bookkeeping. A commit is published only when the `xet-go` catalog target ref resolves to the prepared OID and the retained immutable snapshot exactly matches the prepared intent.

### 6.4 Upload session

- Repository and target revision.
- Author principal.
- Expected SHA-256 and length.
- Resulting Xet identity or ordinary blob identity.
- State: pending, receiving, ready, committed, expired, or failed.
- Created, updated, and expiry timestamps.
- Error information suitable for user-facing diagnostics.

### 6.5 Derived model metadata

Rebuildable, non-authoritative metadata extracted without executing repository code:

- Artifact kind: base, adapter, merged, GGUF, Diffusers, or unknown.
- Model type and architectures.
- Quantization metadata.
- Safetensors files, shard index, and aggregate logical size.
- Tokenizer and processor capabilities.
- Adapter base-model repository, immutable base commit when known, and an explicit pinned/unpinned status.
- Model-card frontmatter.
- Presence of Python files or `auto_map` requiring remote-code consent.
- Validation state and errors.

### 6.6 Background job

- Job type: import, metadata index, audit, repair, backup, or future GC.
- State and progress.
- Repository or upload association.
- Created, started, finished, and retry timestamps.
- Structured result or error.

## 7. Hugging Face compatibility plan

`HF_ENDPOINT` is read by `huggingface_hub` during import. Documentation and generated examples must tell users to set it before starting Python or invoking the `hf` CLI.

### 7.1 Read API

Minimum read surface:

| Method | Route | Required behavior |
| --- | --- | --- |
| `GET` | `/api/models` | List Miniface model repositories with pagination |
| `GET` | `/api/models/{repo}` | Return model metadata and current commit |
| `GET` | `/api/models/{repo}/revision/{revision}` | Resolve branch, tag, or commit |
| `GET` | `/api/models/{repo}/tree/{revision}` | Return recursive or paginated file entries |
| `HEAD` | `/{repo}/resolve/{revision}/{path}` | Return commit, identity, size, and optional Xet metadata |
| `GET` | same resolve route | Stream ordinary or reconstructed Xet bytes, including ranges |
| `GET` | `/api/models/{repo}/xet-read-token/{revision}` | Issue scoped short-lived CAS read access |

Resolve metadata must correctly provide:

- `X-Repo-Commit`.
- `ETag` or `X-Linked-Etag`.
- `Content-Length` or `X-Linked-Size`.
- `Accept-Ranges` where supported.
- Xet metadata only when the file has a valid Xet reconstruction.

Ordinary `GET` must remain available for every file, even when Xet metadata is advertised.

### 7.2 Write API

The initial writable compatibility profile requires `HF_HUB_DISABLE_XET=1` to be set before `huggingface_hub` is imported or the `hf` process starts. Current clients select native Xet uploads whenever `hf_xet` is available; a missing `xet-write-token` route does not trigger a documented fallback to basic LFS. `HF_ENDPOINT` alone is therefore insufficient to select the initial upload transport.

This setting is process-global after import. The first release therefore has two process profiles rather than a runtime toggle:

- **Xet read profile:** Xet enabled; used for efficient download and training when no upload occurs in that process.
- **Basic-LFS write profile:** Xet disabled before startup; reads in that process also use ordinary HTTP fallback.

To download through Xet and later upload in one training workflow, save the output locally and launch a separate uploader process with Xet disabled. A single already-imported Python process must not attempt to toggle modes between download and upload.

Minimum write surface:

| Method | Route | Required behavior |
| --- | --- | --- |
| `GET` | `/api/whoami-v2` | Return the bearer principal and organizations/roles needed by clients |
| `POST` | `/api/repos/create` | Create a model repository and return an endpoint-correct URL |
| `POST` | `/api/models/{repo}/preupload/{revision}` | Classify each file as regular or LFS and optionally ignore it |
| `POST` | `/{repo}.git/info/lfs/objects/batch` | Return basic LFS upload actions or report existing content |
| `PUT` | generated upload URL | Stream and verify a large file into Xet storage |
| `POST` | `/api/models/{repo}/commit/{revision}` | Apply NDJSON file, LFS, and deletion operations atomically |

The first release will implement basic LFS transfer, not multipart LFS or native Xet upload negotiation.

Current `huggingface_hub` also validates a root `README.md` by posting its contents to a hard-coded public `https://huggingface.co/api/validate-yaml` endpoint on ordinary `create_commit` paths. The first fully local upload profile must therefore exclude a root `README.md` from generic client commits and manage the card through Miniface's own UI/API, unless a pinned future client version passes the no-public-network gate. Miniface cannot fix this client behavior by implementing a local route because the current URL ignores `HF_ENDPOINT`.

### 7.3 Initial large-file upload flow

```text
hf client                        Miniface                       xet-go
    │                               │                              │
    ├── preupload manifest ────────▶│ classify regular/LFS        │
    │◀── upload modes ──────────────┤                              │
    │                               │                              │
    ├── LFS batch ─────────────────▶│ create upload session       │
    │◀── basic upload URL ──────────┤                              │
    │                               │                              │
    ├── PUT whole file stream ─────▶│── chunk/hash/upload ────────▶│
    │                               │◀── Xet file identity ────────┤
    │◀── success ───────────────────┤                              │
    │                               │                              │
    ├── NDJSON commit ─────────────▶│ validate complete tree      │
    │                               │── publish snapshot/ref ─────▶│
    │◀── commit OID ────────────────┤                              │
```

This stores large files as Xet immediately while avoiding dependence on the evolving native `hf_xet` write-session integration. It does not provide network-level chunk deduplication on upload; the client sends the full file. Native Xet uploads are a later optimization after baseline compatibility is stable.

The supported first-release invocation must set both `HF_ENDPOINT` and `HF_HUB_DISABLE_XET=1` before client import/startup. Tests and generated examples must not rely on changing either variable after `huggingface_hub` has already been imported.

### 7.4 Commit algorithm

1. Authenticate and authorize the repository write.
2. Resolve the target ref and optional parent commit.
3. Parse the NDJSON header and operations incrementally with strict size limits.
4. Resolve regular file bodies and previously completed LFS upload sessions.
5. Apply add/delete operations to the immutable parent tree.
6. Validate paths, duplicate operations, file identities, lengths, and complete target state.
7. Allocate a commit OID and durably prepare one Miniface operation containing the repository, target ref, expected old OID, new OID, and the exact canonical snapshot intent or sufficient immutable inputs to reconstruct it exactly.
8. Atomically publish that exact complete snapshot and compare-and-swap the target ref through `xet-go`.
9. Reconcile catalog state and mark the Miniface operation complete only when the target ref and retained snapshot match the prepared OID and intent.
10. Return the endpoint-correct commit URL and OID.
11. Enqueue derived model-metadata indexing.

An equivalent retry after an ambiguous response must reuse the prepared OID and immutable snapshot; it must never allocate a replacement OID. On startup and after ambiguous publication errors:

- If the target ref equals the prepared OID and the retained snapshot matches, mark the operation complete.
- If the target ref still equals the expected old state, retry the exact prepared publication.
- If the target ref points elsewhere or the OID retains different immutable state, record a terminal conflict for operator/user resolution.

This is required because `xet-go` target-state idempotency applies only when the same OID, same immutable snapshot, and same ref target are replayed. Its private SQLite/PostgreSQL catalog transactions cannot be atomically enlisted with Miniface's separate application database.

### 7.5 Error behavior

Compatibility errors should include an appropriate HTTP status, JSON `error` field, request ID, and Hugging Face error headers where expected. Miniface must distinguish:

- Repository not found or concealed authorization failure.
- Revision not found.
- File not found within a valid revision.
- Parent/ref conflict.
- Invalid commit body.
- Missing or incomplete large-file upload.
- Hash/length mismatch.
- Expired upload session or CAS token.

### 7.6 Deferred Hub behavior

The initial compatibility contract excludes:

- Datasets and Spaces route variants.
- Pull-request commits.
- Git smart HTTP.
- Multipart LFS.
- Native Xet writes.
- Advanced Hub search filters.
- Social and hosted-inference APIs.
- The newest large-folder pipelining until separately tested.

## 8. Unsloth workflow

Unsloth Core delegates ordinary model access to Transformers, PEFT, and `huggingface_hub`. Miniface should interoperate through those standard paths instead of adding a private Unsloth protocol.

### 8.1 Loading a base model

Generated guidance should set `HF_ENDPOINT` before importing Python libraries and use an immutable Miniface revision:

```python
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="owner/model",
    revision="<miniface-commit>",
    token=miniface_token,
    use_exact_model_name=True,
    fast_inference=False,
)
```

Miniface should explain why:

- `use_exact_model_name=True` prevents Unsloth from replacing known IDs with public `unsloth/*` mirrors.
- `fast_inference=False` preserves exact revision behavior where current vLLM integration can otherwise drop it.
- `trust_remote_code=False` should remain the default.

### 8.2 Adapter repositories

Base models, adapters, and merged models should normally be separate repositories:

```text
team/base-model
team/experiment-adapter
team/experiment-merged
```

An adapter repository should contain standard PEFT files such as:

```text
adapter_config.json
adapter_model.safetensors
README.md
optional tokenizer/processor files
```

Miniface will validate `base_model_name_or_path`. It should be a portable repository ID, not a transient Hugging Face cache snapshot or workstation-only path. For a reproducible managed adapter, Miniface must also record the immutable base-model commit independently from the adapter commit. An adapter with no base commit may still be imported, but it must be marked as unpinned and must not satisfy the reproducible fine-tuning acceptance criteria.

Current Unsloth adapter-by-repository loading pins the adapter revision but loads the base repository without forwarding PEFT's recorded base revision. Miniface must therefore treat direct adapter-ID loading as unsupported until a pinned Unsloth/PEFT combination proves otherwise. The generated reproducible workflow will load the base with Unsloth at `base_commit`, then attach the adapter with PEFT at `adapter_commit`.

### 8.3 Saving and pushing

Miniface will distinguish two paths:

1. The supported fully local first-release path: save locally, validate the result, and launch an uploader process using an explicit `HfApi(endpoint=...)` client while Xet uploads are disabled before import and root `README.md` is excluded from the generic commit. Publish/edit the model card through Miniface's UI/API.
2. A future convenience path using Unsloth's built-in `push_to_hub_merged`, accepted only after a pinned dependency set proves both native Xet write compatibility and zero public-Hub requests.

The explicit-client path is safer for automation because Unsloth's push helpers do not expose an `endpoint=` argument, can enter native Xet upload paths whenever `hf_xet` is installed, can trigger hard-coded public model-card validation, and may print public Hugging Face URLs even when the configured endpoint handled repository requests. An explicit `endpoint=` still does not disable Xet by itself; the supported environment profile is also required. If the training process used Xet reads, the uploader must be a fresh process because the disable flag is captured when `huggingface_hub` is imported.

The UI should generate snippets for:

- Loading a pinned base model.
- Saving a LoRA adapter as safetensors.
- Saving a merged 16-bit safetensors model.
- Recording both the immutable base commit and adapter commit in Miniface provenance and, where supported, in PEFT adapter configuration.
- Uploading an output directory to a new or existing Miniface repository under the supported local-only client profile.
- Reloading the uploaded adapter by first loading the exact base commit with Unsloth and then attaching the exact adapter commit with PEFT.

The adapter acceptance test must advance the base repository's `main` branch after training and prove that the generated two-stage reload still selects the original base commit. A successful reload while `main` has not moved is insufficient evidence of reproducibility.

### 8.4 Training remains outside Miniface initially

Miniface will not initially own CUDA environments, GPU scheduling, TRL configuration, logs, cancellation, or checkpoints. It will provide model registry integration and reproducible examples. A later training launcher must be scoped as a separate project phase.

## 9. Local model inventory

The UI will distinguish two inventories.

### 9.1 Managed models

- Owned by Miniface.
- Stored through ordinary/Xet storage.
- Revisioned and available through `HF_ENDPOINT`.
- Included in Miniface backup and lifecycle policy.
- Authoritative for repeatable workflows.

### 9.2 Discovered external models

- Existing Hugging Face cache snapshots.
- Arbitrary local model or adapter directories.
- Read-only and externally managed until imported.
- Potentially partial, changed, or evicted without Miniface's knowledge.

The Hugging Face cache must never be used as Miniface's mutable catalog. `refs/main` moves, snapshots may be partial, cleanup can remove files, and the cache layout belongs to `huggingface_hub`.

For cache discovery, use the public `scan_cache_dir` behavior through either a small optional Python integration or a carefully isolated read-only scanner. This decision belongs in the local-inventory phase. Regardless of implementation:

- Store full commit hashes and exact snapshot paths, not moving refs alone.
- Surface cache scan warnings.
- Revalidate an external path immediately before use.
- Never write refs, blobs, snapshots, links, or lock files into the HF cache.
- Offer an explicit **Import and retain** action that streams logical files into Miniface-owned storage.

## 10. UI plan

### 10.1 Primary routes

```text
/                                  dashboard
/models                            managed model list
/models/{owner}/{repo}             repository overview
/models/{owner}/{repo}/files       file tree
/models/{owner}/{repo}/revisions   revisions and refs
/models/{owner}/{repo}/use         HF/Transformers/Unsloth examples
/local                             discovered external models
/imports                           imports and upload jobs
/storage                           logical/physical storage and health
/settings                          server and endpoint settings
/settings/tokens                   personal access tokens
```

Exact routes may change with implementation, but the UI should preserve these responsibilities.

### 10.2 Dashboard and model list

Display:

- Repository name and visibility.
- Artifact kind.
- Current commit and last update.
- Architecture and quantization.
- Logical size.
- Validation state.
- Adapter/base relationship.
- Import or background-job status.

### 10.3 Repository detail

Display:

- Model-card content.
- Parsed configuration summary.
- Immutable commit and branch/tag context.
- File tree with logical sizes and storage representation.
- Safetensors shard information.
- Tokenizer and processor availability.
- Adapter base model.
- Remote-code warning.
- Copyable download, Transformers, PEFT, and Unsloth usage snippets.

### 10.4 Import experience

The import flow should:

1. Accept a local directory, a discovered snapshot, or a Hugging Face model
   repository. Public Hub models can be searched; private and gated models use
   exact repository IDs and an ephemeral user token after access is granted on
   `huggingface.co`.
2. Inspect files without executing repository code.
3. Classify the artifact and validate required files/shards.
4. Show warnings and expected logical size.
5. Select target owner, repository, and commit message.
6. Resolve moving Hub refs to one immutable source commit, then stream ordinary,
   LFS, and Xet-backed file bytes into Miniface in a background job without a
   full snapshot staging copy.
7. Publish one complete snapshot only after all files are durable.
8. Record remote source repository/commit provenance and show byte, file, and
   deduplication progress. Hub access tokens must never be logged or persisted
   and must be removed on cross-origin signed-download redirects.

### 10.5 Clean-room UI requirement

Unsloth Studio's frontend and backend are AGPL-3.0-only. Miniface may learn from general workflows but must not copy Studio source, components, styles, or branded assets unless Miniface intentionally accepts and complies with the AGPL. The planned Svelte implementation will be independent.

## 11. Authentication and security

### 11.1 Local mode

- Bind to loopback by default.
- Generate and atomically consume one high-entropy bootstrap secret on first setup.
- Store the administrator password with Argon2id and use persistent HttpOnly browser sessions.
- Issue hashed, named, revocable, optionally expiring read or read/write PATs for Hub clients.
- Provide host-local administrator recovery that invalidates sessions and PATs.
- Make anonymous reads an explicit opt-in policy.
- Keep browser sessions distinct from Hub personal access tokens.
- Use CSRF protection for browser-originated writes.
- Redact tokens, signed URLs, and sensitive headers from logs.

### 11.2 Remote mode

- Require TLS.
- Integrate OIDC or another external identity mechanism for UI login.
- Issue hashed/revocable personal access tokens for CLI and Python clients.
- Enforce repository ACLs independently of authentication.
- Mint least-privilege, short-lived, repository-scoped CAS tokens.
- Support key rotation and audit events.
- Add rate, body-size, concurrency, and timeout limits.
- Never share a process-global `HF_TOKEN` between user jobs.

### 11.3 Repository code

Model discovery and indexing will never import repository Python. Repositories containing Python files or Transformers `auto_map` metadata will be marked as containing remote code. Generated load examples will default to `trust_remote_code=False` and require an explicit user decision to change it.

## 12. Operations and lifecycle

### 12.1 Health and observability

The server should expose:

- Liveness independent of storage availability.
- Readiness based on the configured catalog, ordinary store, CAS index, and CAS object store.
- Structured request and job logs.
- Request IDs propagated into compatibility errors.
- Metrics for request latency, active uploads/downloads, ingest concurrency, job state, logical bytes, physical bytes, and deduplication.

### 12.2 Recovery

Miniface must schedule and monitor the `xet-go` recovery and audit capabilities appropriate to the selected profile, including:

- Expired publication-stage recovery.
- Xorb-index repair.
- Payload and inventory audits.
- Reconciliation after ambiguous S3/PostgreSQL publication windows.

Recovery work should be resumable and visible as jobs rather than hidden startup side effects.

### 12.3 Backups

A local backup must include:

- Miniface application SQLite.
- Xet catalog SQLite.
- Xet CAS-index SQLite.
- Ordinary content.
- Xet objects.
- Configuration and token-signing keys.

A remote backup must include the corresponding PostgreSQL schemas, S3 prefixes, configuration, and signing keys. Backup and restore order must preserve the rule that catalog/index references never point to missing immutable objects.

### 12.4 Garbage collection

The first alpha will document that physical storage grows monotonically. Safe deletion requires a separate design and test phase.

Future GC must:

1. Define roots from retained refs and snapshots.
2. Mark ordinary files, Xet files, shards, and Xorbs.
3. Respect active upload stages and read leases.
4. Apply a grace period.
5. Support dry-run reporting.
6. Resume after interruption.
7. Delete only after a catalog-consistent mark epoch.
8. Coordinate with S3 retention/lifecycle settings.

## 13. Proposed repository organization

The repository is currently empty. A likely structure is:

```text
miniface/
├── cmd/
│   └── miniface/
│       └── main.go
├── internal/
│   ├── server/
│   ├── hub/
│   ├── storage/
│   ├── models/
│   ├── uploads/
│   ├── auth/
│   ├── jobs/
│   └── config/
├── api/
│   └── openapi.yaml
├── web/
│   ├── src/
│   ├── static/
│   ├── package.json
│   ├── bun.lock
│   ├── svelte.config.js
│   └── vite.config.ts
├── go.mod
├── PLAN.md
└── README.md
```

This is directional. Empty packages should not be created up front; each boundary should appear only when the vertical slice gives it a concrete responsibility.

## 14. Delivery phases

Effort ranges are planning estimates for an experienced engineer, not calendar commitments.

### Phase 0: adoption and protocol spike — 1–2 engineer-weeks

#### Deliverables

- Resolve `xet-go` licensing.
- Pin an exact `xet-go` revision or pseudo-version.
- Assemble its local SQLite/filesystem hosted profile.
- Implement a minimal local exact-range signer/handler.
- Prove in-process or loopback streaming ingest into Xet.
- Exercise the official `huggingface_hub` and `hf_xet` read path.
- Record the supported client versions and HTTP contract fixtures.
- Pin and prove one writable client profile: Xet-enabled reads and `HF_HUB_DISABLE_XET=1` basic-LFS writes.
- Run upload tests with public Hugging Face network access blocked and record every outbound destination.
- Establish the root `README.md` policy for the pinned client: exclude it from generic local-only commits and use Miniface's card API unless upstream behavior changes and passes the privacy gate.

#### Exit criteria

- A multi-gigabyte safetensors file uploads through a prototype LFS body stream.
- The server survives restart.
- `snapshot_download` retrieves it through Xet.
- Disabling Xet retrieves the same bytes through resolve `GET`.
- Hash and length verification succeed in both paths.
- Basic-LFS upload succeeds with Xet disabled before client import/startup.
- The accepted upload workflow makes zero requests to public Hugging Face hosts, including model-card validation.

### Phase 1: read-only local registry — 3–5 engineer-weeks

#### Deliverables

- Go server binary and local configuration.
- Embedded Svelte application shell.
- Local repository creation and directory import.
- Model list and detail UI.
- Metadata classification and validation.
- Model info, tree, resolve, and Xet read-token routes.
- Static local bearer authentication.
- Browser session/bootstrap and CSRF protection for UI-originated writes; the UI must not persist or submit the administrator Hub bearer as ordinary browser state.
- Race-safe import containment for arbitrary local directories, including canonical-root, symlink, path-escape, and special-file policy.
- Health, readiness, logs, and graceful shutdown.
- `hf download`, `snapshot_download`, Transformers, and Unsloth documentation/tests.

#### Exit criteria

- Import a real Transformers model directory.
- Inspect it in the UI.
- Download it with `hf` at a pinned commit.
- Load it with Transformers and Unsloth.
- Restart the server without changing its commit identity or file bytes.
- Perform browser-originated imports without exposing the Hub PAT or bypassing CSRF checks.
- Reject an import that attempts to escape its selected root through traversal, symlink replacement, or a special file.

### Phase 2: writable Hub and Unsloth adapter loop — 4–7 engineer-weeks

#### Deliverables

- `whoami-v2`.
- Repository creation.
- Preupload classification.
- Basic LFS batch and streaming Xet ingestion.
- NDJSON commits with regular, LFS, deletion, and folder-deletion operations.
- Parent/ref conflict handling.
- Durable commit preparation, exact-OID retry idempotency, and startup reconciliation for prepared operations.
- Upload-session cleanup and diagnostics.
- Fully local folder upload under the pinned Xet-disabled profile.
- Model-card editing/publication through Miniface's own API while the pinned ordinary Hub client hard-codes public validation.
- Adapter and merged-model metadata.
- Generated Unsloth save and push-back examples.

#### Exit criteria

- Fine-tune a Miniface base model with Unsloth.
- Save a LoRA adapter locally.
- Upload it with `hf upload` or `HfApi.upload_folder` under the pinned Xet-disabled, no-root-README profile while public Hugging Face access is blocked.
- See the adapter, immutable base commit, and adapter commit in the UI.
- Advance the base repository's default branch, then reload the original base commit with Unsloth and attach the adapter commit with PEFT.
- Repeat an interrupted/ambiguous commit without creating duplicate revisions.
- Kill the process before publication, after catalog publication, and before Miniface completion bookkeeping; reconciliation must either complete the exact prepared OID or report a deterministic conflict.

### Phase 3: local product hardening — 3–5 engineer-weeks

#### Deliverables

- Existing Hugging Face cache discovery.
- Managed-versus-external inventory UI.
- Branches, tags, and commit history.
- Job progress, cancellation, and recovery UI.
- Storage/deduplication reporting.
- Backup and restore commands.
- Recovery scheduling and operator diagnostics.
- Linux/macOS packaging and service startup.
- Compatibility tests against current and previous supported clients.

#### Exit criteria

- A user can discover, reference, or import an existing cached model without Miniface mutating the HF cache.
- Backup and restore reproduce repository identities and bytes.
- Interrupted imports and uploads are diagnosable and recoverable.

### Phase 4: PostgreSQL/S3 and multi-user deployment — 5–8 engineer-weeks

#### Deliverables

- PostgreSQL/S3 backend profile.
- Configuration validation and migration tooling.
- OIDC-backed UI authentication.
- Personal access token management.
- Repository ACLs.
- S3/PostgreSQL recovery jobs.
- Remote backup and restore.
- Metrics, tracing, and operational documentation.
- Multi-instance HTTP load testing where supported by storage ownership rules.

#### Exit criteria

- The same Hub compatibility suite passes against local and remote profiles.
- Injected S3/PostgreSQL failure windows recover after restart.
- Repository authorization remains isolated under concurrent users.

### Phase 5: efficiency and optional expansion

- Native `hf_xet` write-token and upload-session support.
- Network-level chunk deduplication on upload.
- Safe garbage collection.
- Multipart and large-folder upload variants.
- Broader model formats.
- Optional clean integration with Unsloth Studio's configurable endpoint behavior.
- Optional local training launcher as a separately scoped subsystem.

## 15. Verification strategy

### 15.1 Supported client matrix

Pin and continuously test:

- Current and previous supported `huggingface_hub` versions.
- Current supported `hf_xet` version.
- Read profile with `hf_xet` installed and active.
- Read fallback and initial write profile with Xet disabled before process startup/import.
- `hf download` under both read profiles.
- `hf upload` only under each explicitly supported write profile; basic LFS first and native Xet later.
- `hf_hub_download` and `snapshot_download`.
- `HfApi.upload_file` and `HfApi.upload_folder`.
- Transformers `from_pretrained`.
- PEFT adapter resolution.
- Unsloth base-model and adapter loading.
- The explicit local-save plus `HfApi` upload flow.
- Unsloth built-in push only after it independently passes the native-write and no-public-network gates.
- Root `README.md` behavior with public Hugging Face blocked.

Client versions should be an explicit compatibility policy, not an accidental result of whichever packages are installed in development.

### 15.2 Repository fixtures

- Empty and small regular files.
- Nested paths and Unicode names accepted by the Hub contract.
- Single-file safetensors model.
- Sharded safetensors model and index.
- Large file crossing multiple Xorbs.
- Adapter repository.
- Merged model repository.
- Duplicate file across repositories.
- Similar model revisions with partial chunk overlap.
- Branch, tag, and raw commit access.
- Repository, revision, and file misses.

### 15.3 Failure and concurrency tests

- Client disconnect during LFS PUT.
- Server restart during ingest.
- Xet objects durable but commit absent.
- Concurrent updates from the same parent.
- Lost response after successful commit.
- Process death after durable operation prepare, after catalog publication, and before operation completion bookkeeping.
- Duplicate LFS object negotiation.
- Expired upload session.
- Expired or tampered range capability.
- Xet token refresh.
- Interrupted and resumed range download.
- Corrupt retained object.
- SQLite write contention and request cancellation.
- S3 write applied with response loss.
- PostgreSQL publication failure.
- Metadata-indexing failure after a successful commit.

### 15.4 Security tests

- Repository isolation even when a caller knows another file hash.
- Concealment behavior for unauthorized private repositories.
- Token scope, expiry, revocation, and rotation.
- No bearer forwarding to external signed URLs.
- Path traversal and symlink escape during import.
- Symlink replacement and source mutation races during import.
- Oversized JSON/NDJSON fields and decompression limits.
- Remote-code detection without execution.
- Log redaction.
- No outbound request to public Hugging Face during the accepted local-only upload workflow.

### 15.5 End-to-end product acceptance flow

```text
Import base model
      │
      ▼
Inspect in Miniface UI
      │
      ▼
Download/load by immutable revision
      │
      ▼
Fine-tune with Unsloth
      │
      ▼
Save adapter locally
      │
      ▼
Upload adapter to Miniface
      │
      ▼
Inspect adapter/base relationship
      │
      ▼
Reload adapter through Unsloth
```

This flow is the primary definition of product success. Features that do not advance or protect it should not displace work from the initial milestones.

## 16. Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| `xet-go` has no visible license | Blocks lawful embedding/distribution | Resolve before importing; record permission/license and pin revision |
| `xet-go` is untagged and rapidly evolving | API breakage | Miniface adapter boundary and exact revision pin |
| Hugging Face Hub APIs are not a stable formal server specification | Client regressions | Wire-level tests against pinned released clients |
| Current clients select Xet writes whenever `hf_xet` is available | Basic-LFS server appears broken instead of receiving fallback | Require `HF_HUB_DISABLE_XET=1` before import/startup for the initial write profile; move native Xet writes earlier if this constraint is unacceptable |
| Current root model-card validation contacts public Hugging Face | Privacy leak and offline upload failure | Exclude root `README.md` from initial generic commits, provide a Miniface card API, and gate every supported flow with public-network blocking |
| Native Xet upload integration evolves | High implementation risk | Start with basic LFS transport streamed into Xet |
| Local range signer is missing | Blocks official Xet local downloads | Implement and security-test a narrow capability handler in Phase 0 |
| Opaque OIDs are not real Git commits | Some clients may assume Git semantics | Test every supported client; do not claim Git compatibility |
| Separate Miniface/catalog transactions create an ambiguous commit window | Duplicate or unrecoverable commit outcome | Durably prepare one OID and immutable snapshot, replay it exactly, and reconcile catalog truth before marking complete |
| Unsloth may remap model IDs | Loads public model unexpectedly | Generate `use_exact_model_name=True` |
| Unsloth/vLLM may drop revisions | Reproducibility failure | Generate `fast_inference=False` when a revision is pinned |
| Direct Unsloth adapter loading does not forward the base revision | Adapter can silently load a newer base | Record both commits and generate a two-stage pinned Unsloth-base plus PEFT-adapter load |
| Unsloth push has implicit endpoint behavior | Upload ambiguity | Set endpoint before import; prefer explicit `HfApi(endpoint=...)` flow |
| External HF cache is mutable and evictable | Broken local records | Keep it read-only/external; import for retention |
| No initial garbage collection | Monotonic storage growth | Document clearly; expose inventory; implement GC as a dedicated phase |
| S3 and PostgreSQL are not one transaction | Partial publication windows | Reuse protection stages and run reconciliation jobs |
| Local durable profile lacks Windows support | Reduced local platform support | Scope initial server to Linux/macOS; test remote clients independently |
| Unsloth Studio is AGPL | Licensing contamination if copied | Build an independent Svelte UI |

## 17. Decisions and gates

### Resolved

- Go backend.
- Svelte 5/SvelteKit frontend.
- Bun for dependency installation and scripts.
- Vite for Svelte compilation and HMR.
- Static frontend embedded into one Go binary.
- Model-only initial scope.
- Local single-user profile before remote multi-user deployment.
- Basic LFS-compatible upload transport streamed into Xet before native Xet writes.
- Initial basic-LFS writes require `HF_HUB_DISABLE_XET=1` before client import/startup; Xet remains enabled for the primary read profile.
- Root model cards use Miniface's own API in the first fully local write profile because the pinned ordinary client path must not call public validation.
- Miniface-owned UI and discovery rather than depending on Unsloth Studio.
- Training runs outside Miniface in the initial product.
- Reproducible adapters are identified by two independent immutable commits: base and adapter.

### Must be resolved before implementation

- Add or obtain an explicit license for `xet-go`.
- Select and pin the first supported `xet-go`, `huggingface_hub`, and `hf_xet` revisions.
- Confirm the Phase 0 local exact-range design against the official Xet client.
- Prove the initial write profile with public Hugging Face blocked and decide whether its Xet-disabled/no-root-README constraints are acceptable; otherwise native Xet writes must move into the first writable release.

### To resolve during the relevant phase

- Fixed regular-versus-Xet file threshold.
- Exact Svelte accessible-primitives library, based on actual controls needed.
- Whether external HF cache discovery uses an optional Python helper or an isolated Go scanner.
- Initial packaging formats for Linux and macOS.
- OIDC provider contract for remote mode.
- Historical snapshot retention and future GC policy.

## 18. Definition of done for the first useful release

The first useful Miniface release is complete when a user can:

1. Install and start one local Miniface process.
2. Authenticate with a local token.
3. Import a Transformers base model directory.
4. See its repository, files, metadata, storage size, and immutable revision in the Svelte UI.
5. Set `HF_ENDPOINT` and download the model with `hf download`.
6. Load the model through Transformers and Unsloth.
7. Fine-tune it with Unsloth outside Miniface.
8. Save a standard PEFT adapter while retaining the immutable base repository and commit as provenance.
9. Upload the adapter with `hf upload` or `HfApi.upload_folder` under the documented Xet-disabled/no-root-README profile, with public Hugging Face access blocked.
10. Publish or edit its model card through Miniface without sending card contents to a public validator.
11. See the adapter linked to both its base repository and immutable base commit in the UI.
12. Advance the base default branch, then reload the original base commit through Unsloth and attach the adapter commit through PEFT.
13. Restart Miniface without losing any committed repository, prepared commit outcome, or file bytes.

The release must verify both Xet download and ordinary HTTP fallback paths, its separate supported read/write profiles, and zero public-Hub requests during the accepted local-only workflow. It must document its supported client versions, operating systems, authentication behavior, lack of GC, and `xet-go` revision.

## 19. Research references

The design is based on review of the following current sources:

- [`jmwoliver/xet-go`](https://github.com/jmwoliver/xet-go)
- [`xet-go` protocol compatibility](https://github.com/jmwoliver/xet-go/blob/master/PROTOCOL_COMPATIBILITY.md)
- [`xet-go` conformance matrix](https://github.com/jmwoliver/xet-go/blob/master/CONFORMANCE.md)
- [`xet-go` hosted composition](https://github.com/jmwoliver/xet-go/blob/master/bucket/hosted/service.go)
- [`xet-go` Hugging Face read adapter](https://github.com/jmwoliver/xet-go/blob/master/hfcompat/service.go)
- [Hugging Face Xet protocol specification](https://huggingface.co/docs/xet/en/index)
- [`huggingface_hub`](https://github.com/huggingface/huggingface_hub)
- [Hugging Face download guide](https://huggingface.co/docs/huggingface_hub/en/guides/download)
- [`huggingface/xet-core`](https://github.com/huggingface/xet-core)
- [`unslothai/unsloth`](https://github.com/unslothai/unsloth)
- [Unsloth repository licensing](https://github.com/unslothai/unsloth/blob/main/LICENSE)

These dependencies and client contracts are moving targets. Miniface should preserve the conclusions of this plan as executable compatibility tests rather than relying indefinitely on prose or undocumented upstream behavior.
