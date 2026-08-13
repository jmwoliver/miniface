package storage

import (
	"bytes"
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"crypto/subtle"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"net/url"
	"slices"
	"strconv"
	"strings"
	"time"

	"github.com/jmwoliver/miniface/internal/state"
	xet "github.com/jmwoliver/xet-go"
	"github.com/jmwoliver/xet-go/bucket"
	"github.com/jmwoliver/xet-go/catalog"
	"github.com/jmwoliver/xet-go/content"
	"github.com/jmwoliver/xet-go/model"
	"github.com/jmwoliver/xet-go/xethash"
)

type CommitOperation struct {
	Kind    string
	Path    string
	Content []byte
	OID     string
	Size    int64
}

type CommitRequest struct {
	Owner      string
	Name       string
	Revision   string
	Summary    string
	Parent     string
	Operations []CommitOperation
}

type CommitResult struct {
	OID string
}

func (l *Local) Authenticate(ctx context.Context, token string) (bool, error) {
	return l.state.VerifyAdminToken(ctx, token)
}

func (l *Local) CreateRepository(ctx context.Context, owner, name string) error {
	repo, err := repoKey(owner, name)
	if err != nil {
		return err
	}
	if _, err := l.service.GetRepository(ctx, repo); err == nil {
		return nil
	} else if !errors.Is(err, bucket.ErrNotFound) {
		return err
	}
	return l.service.CreateRepository(ctx, model.Repository{Key: repo, CreatedAt: time.Now().UTC()})
}

func (l *Local) RepositoryExists(ctx context.Context, owner, name string) (bool, error) {
	repo, err := repoKey(owner, name)
	if err != nil {
		return false, err
	}
	_, err = l.service.GetRepository(ctx, repo)
	if errors.Is(err, bucket.ErrNotFound) {
		return false, nil
	}
	return err == nil, err
}

func (l *Local) PrepareLFSUpload(ctx context.Context, owner, name, oid string, size int64) (string, bool, error) {
	if _, err := repoKey(owner, name); err != nil {
		return "", false, err
	}
	if _, err := parseLFSOID(oid); err != nil || size < 0 {
		return "", false, errors.New("invalid LFS object identity")
	}
	existing, found, err := l.state.LFSUpload(ctx, owner, name, oid, size)
	if err != nil {
		return "", false, err
	}
	if found && existing.State == "ready" && existing.XetHash != "" {
		return "", true, nil
	}
	expires := time.Now().UTC().Add(time.Hour).Truncate(time.Second)
	upload := state.LFSUpload{Namespace: owner, Name: name, OID: oid, Size: size, ExpiresAt: expires}
	if err := l.state.PrepareLFSUpload(ctx, upload); err != nil {
		return "", false, err
	}
	values := url.Values{}
	values.Set("size", strconv.FormatInt(size, 10))
	values.Set("expires", strconv.FormatInt(expires.Unix(), 10))
	payload := lfsPayload(owner, name, oid, size, expires.Unix())
	values.Set("signature", hex.EncodeToString(l.signLFS(payload)))
	href := fmt.Sprintf("%s/lfs/uploads/v1/%s/%s/%s?%s", l.baseURL, url.PathEscape(owner), url.PathEscape(name), oid, values.Encode())
	return href, false, nil
}

func (l *Local) VerifyLFSCapability(owner, name, oid string, size, expires int64, signature []byte) bool {
	if expires < time.Now().Unix() || expires > time.Now().Add(2*time.Hour).Unix() {
		return false
	}
	expected := l.signLFS(lfsPayload(owner, name, oid, size, expires))
	return len(signature) == len(expected) && subtle.ConstantTimeCompare(signature, expected) == 1
}

func (l *Local) IngestLFS(ctx context.Context, owner, name, oid string, size int64, body io.Reader) error {
	repo, err := repoKey(owner, name)
	if err != nil {
		return err
	}
	expected, err := parseLFSOID(oid)
	if err != nil || size < 0 {
		return errors.New("invalid LFS object identity")
	}
	upload, found, err := l.state.LFSUpload(ctx, owner, name, oid, size)
	if err != nil {
		return err
	}
	if !found || upload.State == "ready" || !upload.ExpiresAt.After(time.Now()) {
		if found && upload.State == "ready" {
			return nil
		}
		return errors.New("LFS upload session is absent or expired")
	}
	client, err := l.newXetWriter(ctx, repo, "lfs-"+oid[:16])
	if err != nil {
		return err
	}
	result, err := client.UploadSources(ctx, []xet.UploadSource{{Reader: body, Size: size}})
	if err != nil {
		return err
	}
	n, readErr := io.CopyN(io.Discard, body, 1)
	if n != 0 || (readErr != nil && !errors.Is(readErr, io.EOF)) {
		return errors.New("uploaded LFS body exceeds its declared size")
	}
	file := result.Files[0]
	if file.Size != uint64(size) || file.SHA256 == nil || *file.SHA256 != expected {
		return errors.New("uploaded LFS body does not match its declared SHA-256 and size")
	}
	upload.XetHash = file.Hash.String()
	upload.State = "ready"
	upload.ExpiresAt = time.Now().UTC().Add(30 * 24 * time.Hour)
	return l.state.CompleteLFSUpload(ctx, upload)
}

func (l *Local) Commit(ctx context.Context, request CommitRequest) (CommitResult, error) {
	repo, err := repoKey(request.Owner, request.Name)
	if err != nil {
		return CommitResult{}, err
	}
	revision, err := model.ParseRevision(request.Revision)
	if err != nil {
		return CommitResult{}, err
	}
	refName, writable := revision.Ref()
	if !writable {
		return CommitResult{}, errors.New("commits require a branch or tag revision")
	}
	if len(request.Operations) == 0 {
		return CommitResult{}, errors.New("commit contains no operations")
	}

	var current *model.Snapshot
	if snapshot, err := l.service.ResolveRevision(ctx, repo, revision); err == nil {
		current = &snapshot
	} else if !errors.Is(err, bucket.ErrNotFound) {
		return CommitResult{}, err
	}
	if request.Parent != "" {
		parent, err := model.ParseOID(request.Parent)
		if err != nil {
			return CommitResult{}, errors.New("invalid parent commit")
		}
		if current == nil || current.OID != parent {
			return CommitResult{}, bucket.ErrConflict
		}
	}

	files := make(map[model.FilePath]model.FileEntry)
	if current != nil {
		for _, entry := range current.Files {
			files[entry.Path] = entry
		}
	}
	for _, operation := range request.Operations {
		switch operation.Kind {
		case "file":
			pathValue, err := model.ParseFilePath(operation.Path)
			if err != nil {
				return CommitResult{}, err
			}
			sum := sha256.Sum256(operation.Content)
			if _, err := l.service.PutBlob(ctx, content.Blob{SHA256: sum, Size: int64(len(operation.Content))}, bytes.NewReader(operation.Content)); err != nil {
				return CommitResult{}, err
			}
			ref, err := model.NewBlobFileRef(sum, int64(len(operation.Content)))
			if err != nil {
				return CommitResult{}, err
			}
			files[pathValue] = model.FileEntry{Path: pathValue, Ref: ref}
		case "lfsFile":
			pathValue, err := model.ParseFilePath(operation.Path)
			if err != nil {
				return CommitResult{}, err
			}
			upload, found, err := l.state.LFSUpload(ctx, request.Owner, request.Name, operation.OID, operation.Size)
			if err != nil {
				return CommitResult{}, err
			}
			if !found || upload.State != "ready" {
				return CommitResult{}, errors.New("commit references an LFS object that is not ready")
			}
			hash, err := xethash.Parse(upload.XetHash)
			if err != nil {
				return CommitResult{}, errors.New("retained LFS upload has invalid Xet metadata")
			}
			sum, err := parseLFSOID(operation.OID)
			if err != nil {
				return CommitResult{}, err
			}
			ref, err := model.NewXetFileRef(hash, operation.Size, &sum)
			if err != nil {
				return CommitResult{}, err
			}
			files[pathValue] = model.FileEntry{Path: pathValue, Ref: ref}
		case "deletedFile":
			pathValue, err := model.ParseFilePath(operation.Path)
			if err != nil {
				return CommitResult{}, err
			}
			delete(files, pathValue)
		case "deletedFolder":
			folder := strings.TrimSuffix(operation.Path, "/")
			if _, err := model.ParseFilePath(folder); err != nil {
				return CommitResult{}, err
			}
			prefix := folder + "/"
			for pathValue := range files {
				if strings.HasPrefix(string(pathValue), prefix) {
					delete(files, pathValue)
				}
			}
		default:
			return CommitResult{}, fmt.Errorf("unsupported commit operation %q", operation.Kind)
		}
	}
	entries := make([]model.FileEntry, 0, len(files))
	for _, entry := range files {
		entries = append(entries, entry)
	}
	slices.SortFunc(entries, func(left, right model.FileEntry) int { return strings.Compare(string(left.Path), string(right.Path)) })
	if current != nil && equalTrees(current.Files, entries) {
		metadata := l.metadataForSnapshot(ctx, repo, current.OID, entries)
		if err := l.state.PutModelMetadata(ctx, request.Owner, request.Name, current.OID.String(), metadata); err != nil {
			return CommitResult{}, fmt.Errorf("record model metadata: %w", err)
		}
		return CommitResult{OID: current.OID.String()}, nil
	}

	oid, err := randomOID()
	if err != nil {
		return CommitResult{}, err
	}
	var parent *model.OID
	if current != nil {
		parent = &current.OID
	}
	if request.Summary == "" {
		request.Summary = "Commit files"
	}
	snapshot := model.Snapshot{Repo: repo, OID: oid, Parent: parent, CreatedAt: time.Now().UTC(), Author: model.Identity{Name: "Administrator"}, Message: request.Summary, Files: entries}
	if err := l.service.PublishSnapshot(ctx, snapshot, catalog.ExpectRef(refName, parent)); err != nil {
		return CommitResult{}, err
	}
	metadata := l.metadataForSnapshot(ctx, repo, oid, entries)
	if err := l.state.PutModelMetadata(ctx, request.Owner, request.Name, oid.String(), metadata); err != nil {
		return CommitResult{}, fmt.Errorf("record model metadata: %w", err)
	}
	return CommitResult{OID: oid.String()}, nil
}

func (l *Local) metadataForSnapshot(ctx context.Context, repo model.RepoKey, oid model.OID, entries []model.FileEntry) state.ModelMetadata {
	files := make(map[string][]byte)
	revision, _ := model.RevisionFromOID(oid)
	for _, name := range []model.FilePath{"config.json", "adapter_config.json"} {
		opened, err := l.service.OpenFile(ctx, repo, revision, name, bucket.OpenOptions{})
		if err != nil || opened.FileSize > 2<<20 {
			continue
		}
		body, readErr := io.ReadAll(io.LimitReader(opened.Body, 2<<20+1))
		closeErr := opened.Body.Close()
		if readErr == nil && closeErr == nil {
			files[string(name)] = body
		}
	}
	return classifyModel(files, entries)
}

func equalTrees(left, right []model.FileEntry) bool {
	if len(left) != len(right) {
		return false
	}
	for index := range left {
		if left[index].Path != right[index].Path || left[index].Ref.Kind() != right[index].Ref.Kind() || left[index].Ref.FileSize() != right[index].Ref.FileSize() {
			return false
		}
		leftSHA, leftHasSHA := left[index].Ref.SHA256()
		rightSHA, rightHasSHA := right[index].Ref.SHA256()
		leftXet, leftHasXet := left[index].Ref.XetHash()
		rightXet, rightHasXet := right[index].Ref.XetHash()
		if leftHasSHA != rightHasSHA || leftSHA != rightSHA || leftHasXet != rightHasXet || leftXet != rightXet {
			return false
		}
	}
	return true
}

func parseLFSOID(value string) ([32]byte, error) {
	if len(value) != 64 || strings.ToLower(value) != value {
		return [32]byte{}, errors.New("LFS OID must be 64 lowercase hexadecimal characters")
	}
	var result [32]byte
	_, err := hex.Decode(result[:], []byte(value))
	return result, err
}

func lfsPayload(owner, name, oid string, size, expires int64) string {
	return fmt.Sprintf("miniface-lfs-v1\n%s\n%s\n%s\n%d\n%d", owner, name, oid, size, expires)
}

func (l *Local) signLFS(payload string) []byte {
	mac := hmac.New(sha256.New, l.lfsKey)
	_, _ = mac.Write([]byte(payload))
	return mac.Sum(nil)
}
