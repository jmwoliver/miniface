package storage

import (
	"context"
	"crypto/sha256"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"slices"
	"strings"
	"time"

	"github.com/jmwoliver/miniface/internal/state"
	xet "github.com/jmwoliver/xet-go"
	"github.com/jmwoliver/xet-go/auth"
	"github.com/jmwoliver/xet-go/bucket"
	"github.com/jmwoliver/xet-go/catalog"
	"github.com/jmwoliver/xet-go/content"
	"github.com/jmwoliver/xet-go/hfcompat"
	"github.com/jmwoliver/xet-go/model"
	"github.com/jmwoliver/xet-go/xetcas"
	"github.com/jmwoliver/xet-go/xorb"
)

func (l *Local) StartImport(ctx context.Context, source, repoID, message string) (state.Job, error) {
	parts := strings.Split(repoID, "/")
	if len(parts) != 2 {
		return state.Job{}, errors.New("repository ID must be owner/name")
	}
	if _, err := repoKey(parts[0], parts[1]); err != nil {
		return state.Job{}, err
	}
	canonical, err := l.importRoot(source)
	if err != nil {
		return state.Job{}, err
	}
	root, err := os.OpenRoot(canonical)
	if err != nil {
		return state.Job{}, fmt.Errorf("open import root: %w", err)
	}
	_, _, err = walkImport(root)
	closeErr := root.Close()
	if err != nil {
		return state.Job{}, err
	}
	if closeErr != nil {
		return state.Job{}, closeErr
	}
	if message == "" {
		message = "Import local model"
	}
	job := state.NewJob(repoID, "import")
	if err := l.state.PutJob(ctx, job); err != nil {
		return state.Job{}, err
	}
	jobContext, cleanupJob := l.newJobContext(job.ID)
	l.jobs.Add(1)
	go func(job state.Job) {
		defer l.jobs.Done()
		defer cleanupJob()
		select {
		case l.importSlots <- struct{}{}:
			defer func() { <-l.importSlots }()
		case <-jobContext.Done():
			l.finishJob(jobContext, &job, jobContext.Err())
			return
		}
		l.finishJob(jobContext, &job, l.runImport(jobContext, &job, canonical, parts[0], parts[1], message))
	}(job)
	return job, nil
}

func (l *Local) runImport(ctx context.Context, job *state.Job, source, owner, name, message string) error {
	if err := l.state.SetJobPhase(ctx, job, "Checking files"); err != nil {
		return err
	}
	root, err := os.OpenRoot(source)
	if err != nil {
		return err
	}
	defer root.Close()
	files, total, err := walkImport(root)
	if err != nil {
		return err
	}
	if len(files) == 0 {
		return errors.New("import directory contains no files")
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

	xetClient, err := l.newXetWriter(ctx, repo, "import-"+job.ID)
	if err != nil {
		return err
	}
	entries := make([]model.FileEntry, 0, len(files))
	metadataFiles := make(map[string][]byte)
	var completed int64
	for fileIndex, sourceFile := range files {
		if err := ctx.Err(); err != nil {
			return err
		}
		file, err := root.Open(sourceFile.path)
		if err != nil {
			return fmt.Errorf("open %s: %w", sourceFile.path, err)
		}
		info, err := file.Stat()
		if err != nil || !os.SameFile(sourceFile.info, info) || !info.Mode().IsRegular() || info.Size() != sourceFile.info.Size() {
			_ = file.Close()
			return fmt.Errorf("source changed while importing: %s", sourceFile.path)
		}
		if shouldIndexMetadata(sourceFile.path, info.Size()) {
			body, readErr := io.ReadAll(io.NewSectionReader(file, 0, info.Size()))
			if readErr != nil {
				_ = file.Close()
				return fmt.Errorf("read metadata %s: %w", sourceFile.path, readErr)
			}
			metadataFiles[sourceFile.path] = body
		}
		var ref model.FileRef
		if info.Size() >= l.xetThreshold {
			result, uploadErr := xetClient.UploadSources(ctx, []xet.UploadSource{{ReaderAt: file, Size: info.Size()}})
			if uploadErr != nil {
				_ = file.Close()
				return fmt.Errorf("upload %s to Xet: %w", sourceFile.path, uploadErr)
			}
			value := result.Files[0]
			ref, err = model.NewXetFileRef(value.Hash, int64(value.Size), value.SHA256)
		} else {
			hasher := sha256.New()
			if _, err = io.Copy(hasher, io.NewSectionReader(file, 0, info.Size())); err == nil {
				var sum [32]byte
				copy(sum[:], hasher.Sum(nil))
				_, err = l.service.PutBlob(ctx, content.Blob{SHA256: sum, Size: info.Size()}, io.NewSectionReader(file, 0, info.Size()))
				if err == nil {
					ref, err = model.NewBlobFileRef(sum, info.Size())
				}
			}
		}
		if err != nil {
			_ = file.Close()
			return fmt.Errorf("ingest %s: %w", sourceFile.path, err)
		}
		finalInfo, statErr := file.Stat()
		pathInfo, pathErr := root.Lstat(sourceFile.path)
		closeErr := file.Close()
		if statErr != nil || pathErr != nil || closeErr != nil || !os.SameFile(sourceFile.info, finalInfo) || !os.SameFile(sourceFile.info, pathInfo) || pathInfo.Mode()&os.ModeSymlink != 0 || finalInfo.Size() != sourceFile.info.Size() || !finalInfo.ModTime().Equal(sourceFile.info.ModTime()) {
			return fmt.Errorf("source changed while importing: %s", sourceFile.path)
		}
		path, _ := model.ParseFilePath(sourceFile.path)
		entries = append(entries, model.FileEntry{Path: path, Ref: ref})
		completed += info.Size()
		progress := float64(fileIndex+1) / float64(len(files))
		if total > 0 {
			progress = float64(completed) / float64(total)
		}
		if err := l.state.UpdateJob(ctx, job, "running", progress, completed, total, ""); err != nil {
			return err
		}
	}

	metadata := classifyModel(metadataFiles, entries)
	return l.publishImport(ctx, job, repo, owner, name, message, entries, metadata, total)
}

func (l *Local) ensureImportRepository(ctx context.Context, repo model.RepoKey) error {
	if _, err := l.service.GetRepository(ctx, repo); errors.Is(err, bucket.ErrNotFound) {
		if err := l.service.CreateRepository(ctx, model.Repository{Key: repo, CreatedAt: time.Now().UTC()}); err != nil && !errors.Is(err, bucket.ErrConflict) {
			return err
		}
		return nil
	} else {
		return err
	}
}

func (l *Local) publishImport(ctx context.Context, job *state.Job, repo model.RepoKey, owner, name, message string, entries []model.FileEntry, metadata state.ModelMetadata, total int64) error {
	if err := ctx.Err(); err != nil {
		return err
	}
	if err := l.state.SetJobPhase(ctx, job, "Publishing"); err != nil {
		return err
	}
	slices.SortFunc(entries, func(left, right model.FileEntry) int {
		return strings.Compare(string(left.Path), string(right.Path))
	})
	var parent *model.OID
	if current, err := l.service.ResolveRevision(ctx, repo, mainRevision()); err == nil {
		parent = &current.OID
		if equalTrees(current.Files, entries) {
			if err := l.state.PutModelMetadata(ctx, owner, name, current.OID.String(), metadata); err != nil {
				return fmt.Errorf("record model metadata: %w", err)
			}
			return l.state.UpdateJob(context.WithoutCancel(ctx), job, "completed", 1, total, total, "")
		}
	} else if !errors.Is(err, bucket.ErrNotFound) {
		return err
	}
	oid, err := randomOID()
	if err != nil {
		return err
	}
	snapshot := model.Snapshot{Repo: repo, OID: oid, Parent: parent, CreatedAt: time.Now().UTC(), Author: model.Identity{Name: "Administrator"}, Message: message, Files: entries}
	if err := l.service.PublishSnapshot(ctx, snapshot, catalog.ExpectRef("main", parent)); err != nil {
		return err
	}
	if err := l.state.PutModelMetadata(ctx, owner, name, oid.String(), metadata); err != nil {
		return fmt.Errorf("record model metadata: %w", err)
	}
	return l.state.UpdateJob(context.WithoutCancel(ctx), job, "completed", 1, total, total, "")
}

func (l *Local) newXetWriter(ctx context.Context, repo model.RepoKey, operationID string) (*xet.Client, error) {
	return newXetWriter(ctx, l.tokens, l.casBaseURL, repo, operationID)
}

func newLFSIngester(tokens *auth.CASTokenManager, casBaseURL string) hfcompat.XetFileIngester {
	return hfcompat.XetFileIngestFunc(func(ctx context.Context, repo model.RepoKey, source io.Reader) (hfcompat.XetFileIngestResult, error) {
		operationID, err := randomOID()
		if err != nil {
			return hfcompat.XetFileIngestResult{}, err
		}
		client, err := newXetWriter(ctx, tokens, casBaseURL, repo, "lfs-"+operationID.String())
		if err != nil {
			return hfcompat.XetFileIngestResult{}, err
		}
		result, err := client.UploadSources(ctx, []xet.UploadSource{{Reader: source, Size: -1}})
		if err != nil {
			return hfcompat.XetFileIngestResult{}, err
		}
		file := result.Files[0]
		if file.SHA256 == nil {
			return hfcompat.XetFileIngestResult{}, errors.New("Xet upload did not return a SHA-256")
		}
		return hfcompat.XetFileIngestResult{Hash: file.Hash, Size: file.Size, SHA256: *file.SHA256}, nil
	})
}

func newXetWriter(ctx context.Context, tokens *auth.CASTokenManager, casBaseURL string, repo model.RepoKey, operationID string) (*xet.Client, error) {
	namespace, err := auth.RepositoryNamespace(repo)
	if err != nil {
		return nil, err
	}
	issued, err := tokens.IssueCASToken(ctx, auth.CASTokenRequest{
		Principal: auth.Principal{Subject: "local:importer"}, Namespace: namespace, Permissions: auth.CASWrite, TTL: time.Hour,
	})
	if err != nil {
		return nil, err
	}
	endpoint, err := url.Parse(casBaseURL)
	if err != nil {
		return nil, err
	}
	protocol, err := xetcas.New(xetcas.NewStaticAccess(endpoint, issued.Value), xetcas.Options{
		HTTPClient: &http.Client{Timeout: 10 * time.Minute}, SessionID: "miniface-" + operationID, UserAgent: "miniface/dev",
	})
	if err != nil {
		return nil, err
	}
	return xet.NewClient(protocol, xet.Options{
		Compression: xorb.Auto, CompressionSet: true, GlobalDedup: true,
		UploadConcurrency: 1,
	})
}

func shouldIndexMetadata(path string, size int64) bool {
	return size <= 2<<20 && (path == "config.json" || path == "adapter_config.json")
}

func classifyModel(files map[string][]byte, entries []model.FileEntry) state.ModelMetadata {
	metadata := state.ModelMetadata{Kind: "model", ValidationStatus: "warning"}
	var config map[string]any
	if adapter, ok := files["adapter_config.json"]; ok {
		metadata.Kind = "adapter"
		_ = json.Unmarshal(adapter, &config)
		metadata.BaseModel = stringValue(config, "base_model_name_or_path")
		metadata.BaseRevision = stringValue(config, "revision")
	} else if body, ok := files["config.json"]; ok {
		_ = json.Unmarshal(body, &config)
	}
	if config != nil {
		metadata.ValidationStatus = "valid"
		if architectures, ok := config["architectures"].([]any); ok && len(architectures) > 0 {
			metadata.Architecture, _ = architectures[0].(string)
		}
		if metadata.Architecture == "" {
			metadata.Architecture = stringValue(config, "model_type")
		}
		if quant, ok := config["quantization_config"].(map[string]any); ok {
			metadata.Quantization = stringValue(quant, "quant_method")
			if metadata.Quantization == "" {
				metadata.Quantization = stringValue(quant, "quant_type")
			}
		}
		if _, remoteCode := config["auto_map"]; remoteCode {
			metadata.ValidationStatus = "warning"
		}
	}
	if metadata.Kind == "adapter" && (metadata.BaseModel == "" || metadata.BaseRevision == "") {
		metadata.ValidationStatus = "warning"
	}
	if metadata.Quantization == "" {
		for _, entry := range entries {
			if strings.HasSuffix(strings.ToLower(string(entry.Path)), ".gguf") {
				metadata.Quantization = "GGUF"
				break
			}
		}
	}
	return metadata
}

func stringValue(values map[string]any, key string) string {
	if values == nil {
		return ""
	}
	value, _ := values[key].(string)
	return value
}
