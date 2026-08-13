package storage

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"strings"
	"time"

	"github.com/jmwoliver/xet-go/bucket"
	"github.com/jmwoliver/xet-go/catalog"
	"github.com/jmwoliver/xet-go/content"
	"github.com/jmwoliver/xet-go/model"
	casserver "github.com/jmwoliver/xet-go/xetcas/server"
)

type ModelSummary struct {
	ID               string `json:"id"`
	Owner            string `json:"owner"`
	Name             string `json:"name"`
	SHA              string `json:"sha"`
	UpdatedAt        string `json:"updated_at"`
	FileCount        int    `json:"file_count"`
	LogicalBytes     int64  `json:"logical_bytes"`
	Kind             string `json:"kind"`
	Architecture     string `json:"architecture"`
	Quantization     string `json:"quantization"`
	BaseModel        string `json:"base_model,omitempty"`
	BaseRevision     string `json:"base_revision,omitempty"`
	SourceRepository string `json:"source_repository,omitempty"`
	SourceRevision   string `json:"source_revision,omitempty"`
	ValidationStatus string `json:"validation_status"`
}

type FileEntry struct {
	Path    string `json:"path"`
	Size    int64  `json:"size"`
	Kind    string `json:"kind"`
	SHA256  string `json:"sha256,omitempty"`
	XetHash string `json:"xet_hash,omitempty"`
}

type Revision struct {
	OID       string `json:"oid"`
	Parent    string `json:"parent,omitempty"`
	CreatedAt string `json:"created_at"`
	Author    string `json:"author"`
	Message   string `json:"message"`
	FileCount int    `json:"file_count"`
}

type ModelDetail struct {
	Model     ModelSummary `json:"model"`
	Files     []FileEntry  `json:"files"`
	Revisions []Revision   `json:"revisions"`
	Card      string       `json:"card"`
}

type StorageStats struct {
	Profile         string  `json:"profile"`
	LogicalBytes    int64   `json:"logical_bytes"`
	PhysicalBytes   int64   `json:"physical_bytes"`
	Repositories    int     `json:"repositories"`
	OrdinaryObjects int     `json:"ordinary_objects"`
	XetObjects      int     `json:"xet_objects"`
	DedupRatio      float64 `json:"dedup_ratio"`
}

func repoKey(owner, name string) (model.RepoKey, error) {
	return model.NewRepoKey(owner, name, model.RepoTypeModel)
}

func mainRevision() model.Revision {
	revision, _ := model.ParseRevision("main")
	return revision
}

func (l *Local) Models(ctx context.Context) ([]ModelSummary, error) {
	models := make([]ModelSummary, 0)
	cursor := ""
	for {
		page, err := l.service.ListRepositories(ctx, catalog.RepositoryQuery{Type: model.RepoTypeModel, Cursor: cursor, Limit: 1000})
		if err != nil {
			return nil, err
		}
		for _, repository := range page.Items {
			snapshot, err := l.service.ResolveRevision(ctx, repository.Key, mainRevision())
			if errors.Is(err, bucket.ErrNotFound) {
				continue
			}
			if err != nil {
				return nil, err
			}
			summary, err := l.summary(ctx, snapshot)
			if err != nil {
				return nil, err
			}
			models = append(models, summary)
		}
		if page.NextCursor == "" {
			return models, nil
		}
		cursor = page.NextCursor
	}
}

func (l *Local) summary(ctx context.Context, snapshot model.Snapshot) (ModelSummary, error) {
	metadata, err := l.state.ModelMetadata(ctx, string(snapshot.Repo.Namespace), string(snapshot.Repo.Name), snapshot.OID.String())
	if err != nil {
		return ModelSummary{}, err
	}
	var size int64
	for _, file := range snapshot.Files {
		size += file.Ref.FileSize()
	}
	return ModelSummary{
		ID: fmt.Sprintf("%s/%s", snapshot.Repo.Namespace, snapshot.Repo.Name), Owner: string(snapshot.Repo.Namespace), Name: string(snapshot.Repo.Name),
		SHA: snapshot.OID.String(), UpdatedAt: snapshot.CreatedAt.Format(time.RFC3339Nano), FileCount: len(snapshot.Files), LogicalBytes: size,
		Kind: metadata.Kind, Architecture: metadata.Architecture, Quantization: metadata.Quantization,
		BaseModel: metadata.BaseModel, BaseRevision: metadata.BaseRevision, SourceRepository: metadata.SourceRepository,
		SourceRevision: metadata.SourceRevision, ValidationStatus: metadata.ValidationStatus,
	}, nil
}

func (l *Local) Model(ctx context.Context, owner, name string) (ModelDetail, error) {
	repo, err := repoKey(owner, name)
	if err != nil {
		return ModelDetail{}, err
	}
	snapshot, err := l.service.ResolveRevision(ctx, repo, mainRevision())
	if err != nil {
		return ModelDetail{}, err
	}
	summary, err := l.summary(ctx, snapshot)
	if err != nil {
		return ModelDetail{}, err
	}
	files := make([]FileEntry, 0, len(snapshot.Files))
	for _, entry := range snapshot.Files {
		file := FileEntry{Path: string(entry.Path), Size: entry.Ref.FileSize(), Kind: string(entry.Ref.Kind())}
		if sum, ok := entry.Ref.SHA256(); ok {
			file.SHA256 = hex.EncodeToString(sum[:])
		}
		if hash, ok := entry.Ref.XetHash(); ok {
			file.XetHash = hash.String()
		}
		files = append(files, file)
	}
	revisions := make([]Revision, 0)
	cursor := ""
	for {
		page, err := l.service.ListSnapshots(ctx, repo, catalog.SnapshotQuery{Cursor: cursor, Limit: 1000})
		if err != nil {
			return ModelDetail{}, err
		}
		for _, info := range page.Items {
			revision := Revision{OID: info.OID.String(), CreatedAt: info.CreatedAt.Format(time.RFC3339Nano), Author: info.Author.Name, Message: info.Message, FileCount: info.FileCount}
			if info.Parent != nil {
				revision.Parent = info.Parent.String()
			}
			revisions = append(revisions, revision)
		}
		if page.NextCursor == "" {
			break
		}
		cursor = page.NextCursor
	}
	card, err := l.readCard(ctx, repo, snapshot.OID)
	if err != nil && !errors.Is(err, bucket.ErrNotFound) {
		return ModelDetail{}, err
	}
	return ModelDetail{Model: summary, Files: files, Revisions: revisions, Card: card}, nil
}

func (l *Local) readCard(ctx context.Context, repo model.RepoKey, oid model.OID) (string, error) {
	revision, err := model.RevisionFromOID(oid)
	if err != nil {
		return "", err
	}
	opened, err := l.service.OpenFile(ctx, repo, revision, "README.md", bucket.OpenOptions{})
	if err != nil {
		return "", err
	}
	defer opened.Body.Close()
	if opened.FileSize > 2<<20 {
		return "", errors.New("model card is too large")
	}
	body, err := io.ReadAll(io.LimitReader(opened.Body, 2<<20+1))
	if err != nil {
		return "", err
	}
	return string(body), nil
}

func randomOID() (model.OID, error) {
	for {
		var raw [20]byte
		if _, err := rand.Read(raw[:]); err != nil {
			return model.OID{}, err
		}
		oid, err := model.ParseOID(hex.EncodeToString(raw[:]))
		if err == nil {
			return oid, nil
		}
	}
}

func (l *Local) SaveCard(ctx context.Context, owner, name, card, message string) (ModelDetail, error) {
	if len(card) > 2<<20 {
		return ModelDetail{}, errors.New("model card exceeds 2 MiB")
	}
	repo, err := repoKey(owner, name)
	if err != nil {
		return ModelDetail{}, err
	}
	current, err := l.service.ResolveRevision(ctx, repo, mainRevision())
	if err != nil {
		return ModelDetail{}, err
	}
	sum := sha256.Sum256([]byte(card))
	if _, err := l.service.PutBlob(ctx, content.Blob{SHA256: sum, Size: int64(len(card))}, strings.NewReader(card)); err != nil {
		return ModelDetail{}, err
	}
	ref, err := model.NewBlobFileRef(sum, int64(len(card)))
	if err != nil {
		return ModelDetail{}, err
	}
	files := make([]model.FileEntry, 0, len(current.Files)+1)
	replaced := false
	for _, file := range current.Files {
		if file.Path == "README.md" {
			files = append(files, model.FileEntry{Path: "README.md", Ref: ref})
			replaced = true
		} else {
			files = append(files, file)
		}
	}
	if !replaced {
		files = append(files, model.FileEntry{Path: "README.md", Ref: ref})
	}
	oid, err := randomOID()
	if err != nil {
		return ModelDetail{}, err
	}
	if message == "" {
		message = "Update model card"
	}
	snapshot := model.Snapshot{Repo: repo, OID: oid, Parent: &current.OID, CreatedAt: time.Now().UTC(), Author: model.Identity{Name: "Administrator"}, Message: message, Files: files}
	if err := l.service.PublishSnapshot(ctx, snapshot, catalog.ExpectRef("main", &current.OID)); err != nil {
		return ModelDetail{}, err
	}
	metadata, err := l.state.ModelMetadata(ctx, owner, name, current.OID.String())
	if err == nil {
		err = l.state.PutModelMetadata(ctx, owner, name, oid.String(), metadata)
	}
	if err != nil {
		return ModelDetail{}, err
	}
	return l.Model(ctx, owner, name)
}

func (l *Local) Stats(ctx context.Context) (StorageStats, error) {
	models, err := l.Models(ctx)
	if err != nil {
		return StorageStats{}, err
	}
	stats := StorageStats{Profile: "local · SQLite + filesystem", Repositories: len(models), DedupRatio: 1}
	for _, item := range models {
		stats.LogicalBytes += item.LogicalBytes
	}
	cursor := ""
	for {
		page, err := l.ordinary.ListBlobs(ctx, content.PageRequest{Cursor: cursor, Limit: 1000})
		if err != nil {
			return StorageStats{}, err
		}
		for _, blob := range page.Items {
			stats.OrdinaryObjects++
			stats.PhysicalBytes += blob.Size
		}
		if page.NextCursor == "" {
			break
		}
		cursor = page.NextCursor
	}
	for _, kind := range []casserver.BlobKind{casserver.BlobXorb, casserver.BlobShard} {
		cursor = ""
		for {
			page, err := l.blobs.ListBlobs(ctx, kind, casserver.PageRequest{Cursor: cursor, Limit: 1000})
			if err != nil {
				return StorageStats{}, err
			}
			for _, blob := range page.Items {
				stats.XetObjects++
				stats.PhysicalBytes += blob.Info.Size
			}
			if page.NextCursor == "" {
				break
			}
			cursor = page.NextCursor
		}
	}
	if stats.PhysicalBytes > 0 && stats.LogicalBytes > 0 {
		stats.DedupRatio = float64(stats.LogicalBytes) / float64(stats.PhysicalBytes)
		if stats.DedupRatio < 1 {
			stats.DedupRatio = 1
		}
	}
	return stats, nil
}
