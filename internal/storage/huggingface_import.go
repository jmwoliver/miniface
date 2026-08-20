package storage

import (
	"bytes"
	"context"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"math"
	"net/http"
	"net/url"
	"strings"
	"sync"
	"time"

	"github.com/jmwoliver/miniface/internal/state"
	xet "github.com/jmwoliver/xet-go"
	"github.com/jmwoliver/xet-go/bucket"
	"github.com/jmwoliver/xet-go/catalog"
	"github.com/jmwoliver/xet-go/content"
	"github.com/jmwoliver/xet-go/model"
	"github.com/jmwoliver/xet-go/xethash"
)

const (
	huggingFaceJSONLimit         = 16 << 20
	huggingFaceUserAgent         = "miniface/dev"
	importFreeSpaceReserve int64 = 5 << 30
	importXetMemoryReserve       = uint64(4 << 30)
)

var errHuggingFaceMetadataRedacted = errors.New("Hugging Face redacted file metadata")

type HuggingFaceModel struct {
	ID          string `json:"id"`
	Downloads   int64  `json:"downloads"`
	Likes       int64  `json:"likes"`
	Gated       bool   `json:"gated"`
	PipelineTag string `json:"pipeline_tag,omitempty"`
	SizeBytes   *int64 `json:"size_bytes,omitempty"`
}

type huggingFaceTreeFile struct {
	Type    string `json:"type"`
	Path    string `json:"path"`
	Size    int64  `json:"size"`
	XetHash string `json:"xetHash"`
	LFS     *struct {
		OID  string `json:"oid"`
		Size int64  `json:"size"`
	} `json:"lfs"`
}

type xetFileIdentity struct {
	hash   xethash.Hash
	size   uint64
	sha256 [sha256.Size]byte
}

func newHuggingFaceHTTPClient() *http.Client {
	transport := http.DefaultTransport.(*http.Transport).Clone()
	transport.ResponseHeaderTimeout = 30 * time.Second
	return &http.Client{
		Transport: transport,
		CheckRedirect: func(request *http.Request, via []*http.Request) error {
			if len(via) >= 10 {
				return errors.New("too many Hugging Face redirects")
			}
			if len(via) > 0 && !sameOrigin(request.URL, via[0].URL) {
				request.Header.Del("Authorization")
			}
			return nil
		},
	}
}

func sameOrigin(left, right *url.URL) bool {
	return strings.EqualFold(left.Scheme, right.Scheme) && strings.EqualFold(left.Host, right.Host)
}

func (l *Local) SearchHuggingFaceModels(ctx context.Context, query string) ([]HuggingFaceModel, error) {
	query = strings.TrimSpace(query)
	if len(query) < 2 {
		return []HuggingFaceModel{}, nil
	}
	if len(query) > 200 || strings.ContainsAny(query, "\r\n") {
		return nil, errors.New("Hugging Face search must be at most 200 characters")
	}
	values := url.Values{}
	values.Set("search", query)
	values.Set("sort", "downloads")
	values.Set("direction", "-1")
	values.Set("limit", "8")
	values.Add("expand[]", "downloads")
	values.Add("expand[]", "likes")
	values.Add("expand[]", "gated")
	values.Add("expand[]", "pipeline_tag")
	values.Add("expand[]", "sha")
	var response []struct {
		ID          string          `json:"id"`
		Downloads   int64           `json:"downloads"`
		Likes       int64           `json:"likes"`
		Gated       json.RawMessage `json:"gated"`
		PipelineTag string          `json:"pipeline_tag"`
		SHA         string          `json:"sha"`
	}
	if err := l.huggingFaceJSON(ctx, strings.TrimRight(l.huggingFaceURL, "/")+"/api/models?"+values.Encode(), "", &response); err != nil {
		return nil, err
	}
	models := make([]HuggingFaceModel, 0, len(response))
	revisions := make([]string, 0, len(response))
	for _, candidate := range response {
		if _, _, err := splitHuggingFaceRepo(candidate.ID); err != nil {
			continue
		}
		models = append(models, HuggingFaceModel{
			ID: candidate.ID, Downloads: candidate.Downloads, Likes: candidate.Likes,
			Gated: huggingFaceGated(candidate.Gated), PipelineTag: candidate.PipelineTag,
		})
		revisions = append(revisions, candidate.SHA)
	}
	l.addHuggingFaceModelSizes(ctx, models, revisions)
	return models, nil
}

func (l *Local) addHuggingFaceModelSizes(ctx context.Context, models []HuggingFaceModel, revisions []string) {
	jobs := make(chan int)
	var workers sync.WaitGroup
	for range min(4, len(models)) {
		workers.Add(1)
		go func() {
			defer workers.Done()
			for index := range jobs {
				if size, err := l.huggingFaceSnapshotSize(ctx, models[index].ID, revisions[index]); err == nil {
					models[index].SizeBytes = &size
				}
			}
		}()
	}
	for index := range models {
		jobs <- index
	}
	close(jobs)
	workers.Wait()
}

func (l *Local) huggingFaceSnapshotSize(ctx context.Context, repoID, revision string) (int64, error) {
	owner, name, _ := splitHuggingFaceRepo(repoID)
	decoded, err := hex.DecodeString(revision)
	if err != nil || len(decoded) != 20 {
		return 0, errors.New("Hugging Face returned an invalid repository commit")
	}
	values := url.Values{}
	values.Set("recursive", "true")
	values.Set("expand", "false")
	values.Set("limit", "1000")
	next := l.huggingFacePath("api", "models", owner, name, "tree", revision) + "?" + values.Encode()
	var total int64
	for next != "" {
		var page []struct {
			Type string `json:"type"`
			Size int64  `json:"size"`
		}
		response, err := l.huggingFaceRequest(ctx, http.MethodGet, next, "")
		if err != nil {
			return 0, err
		}
		if err := decodeHuggingFaceJSON(response, &page); err != nil {
			return 0, err
		}
		for _, entry := range page {
			if entry.Type == "directory" {
				continue
			}
			if entry.Type != "file" || entry.Size < 0 || total > math.MaxInt64-entry.Size {
				return 0, errors.New("Hugging Face returned an invalid repository tree")
			}
			total += entry.Size
		}
		next, err = nextHuggingFacePage(response.Header.Get("Link"), next, l.huggingFaceURL)
		if err != nil {
			return 0, err
		}
	}
	return total, nil
}

func huggingFaceGated(value json.RawMessage) bool {
	if len(value) == 0 || bytes.Equal(value, []byte("null")) || bytes.Equal(value, []byte("false")) || bytes.Equal(value, []byte(`""`)) {
		return false
	}
	return true
}

func (l *Local) StartHuggingFaceImport(ctx context.Context, sourceRepo, sourceRevision, destinationRepo, message, token string) (state.Job, error) {
	sourceOwner, sourceName, err := splitHuggingFaceRepo(sourceRepo)
	if err != nil {
		return state.Job{}, err
	}
	owner, name, err := splitHuggingFaceRepo(destinationRepo)
	if err != nil {
		return state.Job{}, fmt.Errorf("destination %w", err)
	}
	if _, err := repoKey(owner, name); err != nil {
		return state.Job{}, err
	}
	sourceRepo = sourceOwner + "/" + sourceName
	destinationRepo = owner + "/" + name
	sourceRevision = strings.TrimSpace(sourceRevision)
	if sourceRevision == "" {
		sourceRevision = "main"
	}
	if len(sourceRevision) > 512 || strings.ContainsAny(sourceRevision, "\x00\r\n") {
		return state.Job{}, errors.New("Hugging Face revision is invalid")
	}
	if len(token) > 4096 || strings.ContainsAny(token, "\r\n") {
		return state.Job{}, errors.New("Hugging Face token is invalid")
	}
	if message == "" {
		message = "Import from Hugging Face"
	}
	job := state.NewJob(destinationRepo, "huggingface-import")
	job.SourceRepo = sourceRepo
	job.SourceRev = sourceRevision
	if err := l.state.PutJob(ctx, job); err != nil {
		return state.Job{}, err
	}
	jobContext, cleanupJob := l.newJobContext(job.ID)
	l.jobs.Add(1)
	go func(job state.Job, accessToken string) {
		defer l.jobs.Done()
		defer cleanupJob()
		select {
		case l.importSlots <- struct{}{}:
			defer func() { <-l.importSlots }()
		case <-jobContext.Done():
			l.finishJob(jobContext, &job, jobContext.Err())
			return
		}
		l.finishJob(jobContext, &job, l.runHuggingFaceImport(jobContext, &job, sourceRepo, sourceRevision, owner, name, message, accessToken))
	}(job, token)
	return job, nil
}

func splitHuggingFaceRepo(repoID string) (string, string, error) {
	repoID = strings.TrimSpace(repoID)
	parts := strings.Split(repoID, "/")
	if len(parts) != 2 || parts[0] == "" || parts[1] == "" || len(repoID) > 256 || strings.ContainsAny(repoID, "\x00\r\n") {
		return "", "", errors.New("repository ID must be owner/name")
	}
	if _, err := repoKey(parts[0], parts[1]); err != nil {
		return "", "", errors.New("repository ID must be a valid owner/name")
	}
	return parts[0], parts[1], nil
}

func (l *Local) runHuggingFaceImport(ctx context.Context, job *state.Job, sourceRepo, requestedRevision, owner, name, message, token string) error {
	if err := l.state.SetJobPhase(ctx, job, "Resolving repository"); err != nil {
		return err
	}
	commit, err := l.resolveHuggingFaceRevision(ctx, sourceRepo, requestedRevision, token)
	if err != nil {
		return err
	}
	if err := l.state.SetJobSource(ctx, job, sourceRepo, commit); err != nil {
		return err
	}
	if err := l.state.SetJobPhase(ctx, job, "Checking files"); err != nil {
		return err
	}
	files, total, err := l.huggingFaceTree(ctx, sourceRepo, commit, token)
	if err != nil {
		return err
	}
	if len(files) == 0 {
		return errors.New("Hugging Face repository contains no files")
	}
	if err := l.state.UpdateJob(ctx, job, "running", 0, 0, total, ""); err != nil {
		return err
	}
	if err := l.state.SetJobPhase(ctx, job, "Transferring"); err != nil {
		return err
	}
	repo, _ := repoKey(owner, name)
	if err := l.ensureImportRepository(ctx, repo); err != nil {
		return err
	}
	reused, err := l.cloneHuggingFaceXetFiles(ctx, repo, files)
	if err != nil {
		return err
	}
	var transferBytes, largestXetFile int64
	for _, file := range files {
		if _, ok := reused[file.Path]; ok {
			continue
		}
		transferBytes += file.Size
		if file.Size >= l.xetThreshold && file.Size > largestXetFile {
			largestXetFile = file.Size
		}
	}
	if transferBytes > 0 {
		available, err := availableStorageBytes(l.dataDir)
		if err != nil {
			return fmt.Errorf("check import storage capacity: %w", err)
		}
		if err := requireImportCapacity(transferBytes, available); err != nil {
			return err
		}
	}
	if availableMemory, known := availableMemoryBytes(); known {
		if err := requireXetImportMemory(largestXetFile, availableMemory); err != nil {
			return err
		}
	}
	var xetClient *xet.Client
	if largestXetFile > 0 {
		xetClient, err = l.newXetWriter(ctx, repo, "hf-import-"+job.ID)
		if err != nil {
			return err
		}
	}

	entries := make([]model.FileEntry, 0, len(files))
	metadataFiles := make(map[string][]byte)
	var completed int64
	for _, sourceFile := range files {
		var entry model.FileEntry
		var metadata []byte
		nextCompleted := completed + sourceFile.Size
		if ref, ok := reused[sourceFile.Path]; ok {
			if err := ctx.Err(); err != nil {
				return err
			}
			path, _ := model.ParseFilePath(sourceFile.Path)
			entry = model.FileEntry{Path: path, Ref: ref}
		} else {
			entry, metadata, nextCompleted, err = l.ingestHuggingFaceFile(ctx, job, xetClient, repo, sourceRepo, commit, token, sourceFile, completed, total)
			if err != nil {
				return fmt.Errorf("import %s: %w", sourceFile.Path, err)
			}
		}
		completed = nextCompleted
		entries = append(entries, entry)
		if metadata != nil {
			metadataFiles[sourceFile.Path] = metadata
		}
		progress := float64(completed) / float64(total)
		if total == 0 {
			progress = float64(len(entries)) / float64(len(files))
		}
		if err := l.state.UpdateJob(ctx, job, "running", progress, completed, total, ""); err != nil {
			return err
		}
	}
	metadata := classifyModel(metadataFiles, entries)
	metadata.SourceRepository = sourceRepo
	metadata.SourceRevision = commit
	if message == "Import from Hugging Face" {
		message = fmt.Sprintf("Import %s@%s from Hugging Face", sourceRepo, commit[:12])
	}
	return l.publishImport(ctx, job, repo, owner, name, message, entries, metadata, total)
}

func (l *Local) cloneHuggingFaceXetFiles(ctx context.Context, destination model.RepoKey, files []huggingFaceTreeFile) (map[string]model.FileRef, error) {
	sources, err := l.localXetSources(ctx)
	if err != nil {
		return nil, fmt.Errorf("find local Xet files: %w", err)
	}
	reused := make(map[string]model.FileRef)
	cloned := make(map[xetFileIdentity]model.FileRef)
	cloneSupported := true
	for _, file := range files {
		identity, ok := huggingFaceXetIdentity(file, l.xetThreshold)
		if !ok {
			continue
		}
		if ref, ok := cloned[identity]; ok {
			reused[file.Path] = ref
			continue
		}
		if !cloneSupported {
			continue
		}
		for _, source := range sources[identity] {
			err := l.service.CloneXetFile(ctx, source, destination, identity.hash, identity.size, &identity.sha256)
			switch {
			case err == nil:
				ref, err := model.NewXetFileRef(identity.hash, int64(identity.size), &identity.sha256)
				if err != nil {
					return nil, err
				}
				cloned[identity] = ref
				reused[file.Path] = ref
			case errors.Is(err, bucket.ErrContentNotUploaded):
				continue
			case errors.Is(err, bucket.ErrUnsupported):
				cloneSupported = false
			default:
				return nil, fmt.Errorf("clone local Xet file for %s: %w", file.Path, err)
			}
			break
		}
	}
	return reused, nil
}

func (l *Local) localXetSources(ctx context.Context) (map[xetFileIdentity][]model.RepoKey, error) {
	sources := make(map[xetFileIdentity][]model.RepoKey)
	repositoryCursor := ""
	for {
		repositories, err := l.service.ListRepositories(ctx, catalog.RepositoryQuery{
			Type: model.RepoTypeModel, Cursor: repositoryCursor, Limit: catalog.MaxPageSize,
		})
		if err != nil {
			return nil, err
		}
		for _, repository := range repositories.Items {
			snapshotCursor := ""
			for {
				snapshots, err := l.service.ListSnapshots(ctx, repository.Key, catalog.SnapshotQuery{
					Cursor: snapshotCursor, Limit: catalog.MaxPageSize,
				})
				if err != nil {
					return nil, err
				}
				for _, snapshotInfo := range snapshots.Items {
					snapshot, err := l.service.GetSnapshot(ctx, repository.Key, snapshotInfo.OID)
					if err != nil {
						return nil, err
					}
					for _, entry := range snapshot.Files {
						identity, ok := fileRefXetIdentity(entry.Ref)
						if !ok || containsRepoKey(sources[identity], repository.Key) {
							continue
						}
						sources[identity] = append(sources[identity], repository.Key)
					}
				}
				if snapshots.NextCursor == "" {
					break
				}
				snapshotCursor = snapshots.NextCursor
			}
		}
		if repositories.NextCursor == "" {
			return sources, nil
		}
		repositoryCursor = repositories.NextCursor
	}
}

func huggingFaceXetIdentity(file huggingFaceTreeFile, threshold int64) (xetFileIdentity, bool) {
	if file.Size < threshold || shouldIndexMetadata(file.Path, file.Size) {
		return xetFileIdentity{}, false
	}
	hash, err := xethash.Parse(file.XetHash)
	if err != nil {
		return xetFileIdentity{}, false
	}
	sum, err := huggingFaceExpectedSHA(file)
	if err != nil || sum == nil {
		return xetFileIdentity{}, false
	}
	return xetFileIdentity{hash: hash, size: uint64(file.Size), sha256: *sum}, true
}

func fileRefXetIdentity(ref model.FileRef) (xetFileIdentity, bool) {
	hash, ok := ref.XetHash()
	if !ok || ref.FileSize() < 0 {
		return xetFileIdentity{}, false
	}
	sum, ok := ref.SHA256()
	if !ok {
		return xetFileIdentity{}, false
	}
	return xetFileIdentity{hash: hash, size: uint64(ref.FileSize()), sha256: sum}, true
}

func containsRepoKey(repositories []model.RepoKey, target model.RepoKey) bool {
	for _, repository := range repositories {
		if repository == target {
			return true
		}
	}
	return false
}

func requireImportCapacity(total int64, available uint64) error {
	if total < 0 || total > math.MaxInt64-importFreeSpaceReserve {
		return errors.New("Hugging Face repository is too large to import")
	}
	required := uint64(total + importFreeSpaceReserve)
	if available >= required {
		return nil
	}
	return fmt.Errorf("not enough free storage: snapshot is %.1f GiB and Miniface requires a 5 GiB safety reserve, but only %.1f GiB is available", float64(total)/(1<<30), float64(available)/(1<<30))
}

func requireXetImportMemory(largestFile int64, available uint64) error {
	if largestFile <= 0 {
		return nil
	}
	if available >= importXetMemoryReserve {
		return nil
	}
	return fmt.Errorf("not enough available memory for bounded Xet import: Miniface requires %.1f GiB to cover Xorb encoding, the local CAS, and process overhead, but only %.1f GiB is available", float64(importXetMemoryReserve)/(1<<30), float64(available)/(1<<30))
}

func (l *Local) resolveHuggingFaceRevision(ctx context.Context, repoID, revision, token string) (string, error) {
	owner, name, _ := splitHuggingFaceRepo(repoID)
	values := url.Values{}
	values.Add("expand[]", "sha")
	target := l.huggingFacePath("api", "models", owner, name, "revision", revision) + "?" + values.Encode()
	var response struct {
		SHA string `json:"sha"`
	}
	if err := l.huggingFaceJSON(ctx, target, token, &response); err != nil {
		return "", err
	}
	decoded, err := hex.DecodeString(response.SHA)
	if err != nil || len(decoded) != 20 {
		return "", errors.New("Hugging Face returned an invalid repository commit")
	}
	return strings.ToLower(response.SHA), nil
}

func (l *Local) huggingFaceTree(ctx context.Context, repoID, commit, token string) ([]huggingFaceTreeFile, int64, error) {
	owner, name, _ := splitHuggingFaceRepo(repoID)
	values := url.Values{}
	values.Set("recursive", "true")
	values.Set("expand", "false")
	values.Set("limit", "1000")
	next := l.huggingFacePath("api", "models", owner, name, "tree", commit) + "?" + values.Encode()
	files := make([]huggingFaceTreeFile, 0)
	seen := make(map[string]struct{})
	var total int64
	for next != "" {
		var page []huggingFaceTreeFile
		response, err := l.huggingFaceRequest(ctx, http.MethodGet, next, token)
		if err != nil {
			return nil, 0, err
		}
		if err := decodeHuggingFaceJSON(response, &page); err != nil {
			return nil, 0, err
		}
		for _, entry := range page {
			if entry.Type == "directory" {
				continue
			}
			if entry.Type != "file" || entry.Size < 0 || entry.Size == math.MaxInt64 {
				return nil, 0, errors.New("Hugging Face returned an invalid repository tree")
			}
			if _, err := model.ParseFilePath(entry.Path); err != nil {
				return nil, 0, fmt.Errorf("Hugging Face returned invalid file path %q", entry.Path)
			}
			if _, duplicate := seen[entry.Path]; duplicate {
				return nil, 0, fmt.Errorf("Hugging Face returned duplicate file path %q", entry.Path)
			}
			if entry.LFS != nil && entry.LFS.Size != entry.Size {
				return nil, 0, fmt.Errorf("Hugging Face returned inconsistent size for %q", entry.Path)
			}
			if _, err := huggingFaceExpectedSHA(entry); errors.Is(err, errHuggingFaceMetadataRedacted) {
				return nil, 0, errors.New("Hugging Face withheld file metadata; for a gated repository, accept or request access on huggingface.co and retry with a Hugging Face token that has read permission")
			} else if err != nil {
				return nil, 0, fmt.Errorf("Hugging Face returned invalid metadata for %q", entry.Path)
			}
			if total > math.MaxInt64-entry.Size {
				return nil, 0, errors.New("Hugging Face repository size exceeds supported limits")
			}
			seen[entry.Path] = struct{}{}
			total += entry.Size
			files = append(files, entry)
		}
		next, err = nextHuggingFacePage(response.Header.Get("Link"), next, l.huggingFaceURL)
		if err != nil {
			return nil, 0, err
		}
	}
	return files, total, nil
}

func (l *Local) ingestHuggingFaceFile(ctx context.Context, job *state.Job, xetClient *xet.Client, repo model.RepoKey, sourceRepo, commit, token string, sourceFile huggingFaceTreeFile, completed, total int64) (model.FileEntry, []byte, int64, error) {
	target := l.huggingFacePath(strings.Split(sourceRepo, "/")[0], strings.Split(sourceRepo, "/")[1], "resolve", commit)
	for _, segment := range strings.Split(sourceFile.Path, "/") {
		target += "/" + url.PathEscape(segment)
	}
	response, err := l.huggingFaceRequest(ctx, http.MethodGet, target, token)
	if err != nil {
		return model.FileEntry{}, nil, completed, err
	}
	if response.ContentLength >= 0 && response.ContentLength != sourceFile.Size {
		_ = response.Body.Close()
		return model.FileEntry{}, nil, completed, errors.New("download length does not match repository metadata")
	}
	progress := &huggingFaceProgress{ctx: ctx, storage: l, job: job, completed: completed, total: total, lastUpdate: time.Now(), lastBytes: completed}
	reader := io.TeeReader(io.LimitReader(response.Body, sourceFile.Size+1), progress)
	expectedSHA, err := huggingFaceExpectedSHA(sourceFile)
	if err != nil {
		_ = response.Body.Close()
		return model.FileEntry{}, nil, completed, err
	}

	var ref model.FileRef
	var metadata []byte
	if sourceFile.Size >= l.xetThreshold {
		var metadataBuffer bytes.Buffer
		xetReader := io.Reader(reader)
		if shouldIndexMetadata(sourceFile.Path, sourceFile.Size) {
			xetReader = io.TeeReader(reader, &metadataBuffer)
		}
		result, uploadErr := xetClient.UploadSources(ctx, []xet.UploadSource{{Reader: xetReader, Size: sourceFile.Size, SHA256: expectedSHA}})
		closeErr := response.Body.Close()
		if uploadErr != nil {
			return model.FileEntry{}, nil, completed, uploadErr
		}
		if closeErr != nil {
			return model.FileEntry{}, nil, completed, closeErr
		}
		value := result.Files[0]
		ref, err = model.NewXetFileRef(value.Hash, int64(value.Size), value.SHA256)
		if metadataBuffer.Len() > 0 {
			metadata = metadataBuffer.Bytes()
		}
	} else {
		body, readErr := io.ReadAll(reader)
		closeErr := response.Body.Close()
		if readErr != nil {
			return model.FileEntry{}, nil, completed, readErr
		}
		if closeErr != nil {
			return model.FileEntry{}, nil, completed, closeErr
		}
		if int64(len(body)) != sourceFile.Size {
			return model.FileEntry{}, nil, completed, errors.New("download length does not match repository metadata")
		}
		sum := sha256.Sum256(body)
		if expectedSHA != nil && sum != *expectedSHA {
			return model.FileEntry{}, nil, completed, errors.New("download SHA-256 does not match repository metadata")
		}
		if _, err = l.service.PutBlob(ctx, content.Blob{SHA256: sum, Size: sourceFile.Size}, bytes.NewReader(body)); err == nil {
			ref, err = model.NewBlobFileRef(sum, sourceFile.Size)
		}
		if shouldIndexMetadata(sourceFile.Path, sourceFile.Size) {
			metadata = body
		}
	}
	if err != nil {
		return model.FileEntry{}, nil, completed, err
	}
	path, _ := model.ParseFilePath(sourceFile.Path)
	return model.FileEntry{Path: path, Ref: ref}, metadata, progress.completed, nil
}

func huggingFaceExpectedSHA(file huggingFaceTreeFile) (*[32]byte, error) {
	if file.LFS == nil {
		return nil, nil
	}
	if len(file.LFS.OID) > 0 && strings.Trim(file.LFS.OID, "*") == "" {
		return nil, errHuggingFaceMetadataRedacted
	}
	raw, err := hex.DecodeString(file.LFS.OID)
	if err != nil || len(raw) != sha256.Size {
		return nil, errors.New("Hugging Face returned an invalid LFS SHA-256")
	}
	var sum [sha256.Size]byte
	copy(sum[:], raw)
	return &sum, nil
}

type huggingFaceProgress struct {
	ctx        context.Context
	storage    *Local
	job        *state.Job
	completed  int64
	total      int64
	lastUpdate time.Time
	lastBytes  int64
}

func (p *huggingFaceProgress) Write(body []byte) (int, error) {
	p.completed += int64(len(body))
	now := time.Now()
	if p.completed-p.lastBytes < 16<<20 && now.Sub(p.lastUpdate) < time.Second {
		return len(body), nil
	}
	progress := float64(p.completed) / float64(p.total)
	if p.total == 0 {
		progress = 0
	}
	if progress > 1 {
		progress = 1
	}
	if err := p.storage.state.UpdateJob(p.ctx, p.job, "running", progress, p.completed, p.total, ""); err != nil {
		return 0, err
	}
	p.lastUpdate, p.lastBytes = now, p.completed
	return len(body), nil
}

func (l *Local) huggingFacePath(segments ...string) string {
	escaped := make([]string, len(segments))
	for index, segment := range segments {
		escaped[index] = url.PathEscape(segment)
	}
	return strings.TrimRight(l.huggingFaceURL, "/") + "/" + strings.Join(escaped, "/")
}

func (l *Local) huggingFaceJSON(ctx context.Context, target, token string, destination any) error {
	response, err := l.huggingFaceRequest(ctx, http.MethodGet, target, token)
	if err != nil {
		return err
	}
	return decodeHuggingFaceJSON(response, destination)
}

func (l *Local) huggingFaceRequest(ctx context.Context, method, target, token string) (*http.Response, error) {
	request, err := http.NewRequestWithContext(ctx, method, target, nil)
	if err != nil {
		return nil, errors.New("build Hugging Face request")
	}
	request.Header.Set("Accept", "*/*")
	request.Header.Set("Accept-Encoding", "identity")
	request.Header.Set("User-Agent", huggingFaceUserAgent)
	if token != "" {
		request.Header.Set("Authorization", "Bearer "+token)
	}
	response, err := l.huggingFaceClient.Do(request)
	if err != nil {
		return nil, errors.New("unable to contact Hugging Face")
	}
	if response.StatusCode < 200 || response.StatusCode >= 300 {
		defer response.Body.Close()
		return nil, huggingFaceStatusError(response)
	}
	return response, nil
}

func decodeHuggingFaceJSON(response *http.Response, destination any) error {
	defer response.Body.Close()
	body, err := io.ReadAll(io.LimitReader(response.Body, huggingFaceJSONLimit+1))
	if err != nil {
		return errors.New("read Hugging Face response")
	}
	if len(body) > huggingFaceJSONLimit {
		return errors.New("Hugging Face response is too large")
	}
	if err := json.Unmarshal(body, destination); err != nil {
		return errors.New("Hugging Face returned an invalid response")
	}
	return nil
}

func huggingFaceStatusError(response *http.Response) error {
	_, _ = io.Copy(io.Discard, io.LimitReader(response.Body, 64<<10))
	switch response.StatusCode {
	case http.StatusUnauthorized:
		return errors.New("Hugging Face authentication failed; check the access token")
	case http.StatusForbidden:
		return errors.New("Hugging Face denied access; for gated models accept or request access on huggingface.co, then retry with a token that has read permission")
	case http.StatusNotFound:
		return errors.New("Hugging Face repository or revision was not found, or the token cannot access it")
	case http.StatusTooManyRequests:
		return errors.New("Hugging Face rate limit exceeded; wait and retry")
	}
	return fmt.Errorf("Hugging Face request failed with status %d", response.StatusCode)
}

func nextHuggingFacePage(linkHeader, current, allowedBase string) (string, error) {
	if linkHeader == "" {
		return "", nil
	}
	for _, value := range strings.Split(linkHeader, ",") {
		parts := strings.Split(value, ";")
		if len(parts) < 2 || !strings.Contains(strings.Join(parts[1:], ";"), `rel="next"`) {
			continue
		}
		target := strings.TrimSpace(parts[0])
		if len(target) < 3 || target[0] != '<' || target[len(target)-1] != '>' {
			return "", errors.New("Hugging Face returned an invalid pagination link")
		}
		parsed, err := url.Parse(target[1 : len(target)-1])
		if err != nil {
			return "", errors.New("Hugging Face returned an invalid pagination link")
		}
		currentURL, _ := url.Parse(current)
		parsed = currentURL.ResolveReference(parsed)
		base, _ := url.Parse(allowedBase)
		if !sameOrigin(parsed, base) {
			return "", errors.New("Hugging Face pagination changed origin")
		}
		return parsed.String(), nil
	}
	return "", nil
}
