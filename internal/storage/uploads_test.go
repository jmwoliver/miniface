package storage

import (
	"bytes"
	"context"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"net"
	"net/http"
	"net/url"
	"path/filepath"
	"sync"
	"testing"

	"github.com/jmwoliver/miniface/internal/config"
	"github.com/jmwoliver/xet-go/bucket"
)

func TestLFSUploadSurvivesRestartAndCommitIsAtomic(t *testing.T) {
	ctx := context.Background()
	listener, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatal(err)
	}
	baseURL, err := url.Parse("http://" + listener.Addr().String())
	if err != nil {
		t.Fatal(err)
	}
	cfg := config.Config{
		BaseURL:      baseURL,
		DataDir:      filepath.Join(t.TempDir(), "data"),
		ImportRoots:  []string{t.TempDir()},
		XetThreshold: config.DefaultXetThreshold,
	}
	opened, err := Open(ctx, cfg)
	if err != nil {
		t.Fatal(err)
	}
	registry := opened.Storage
	var registryMu sync.RWMutex
	activeRegistry := registry
	httpServer := &http.Server{Handler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		registryMu.RLock()
		defer registryMu.RUnlock()
		active := activeRegistry
		if active == nil || r.URL.Path == "/cas" || len(r.URL.Path) < len("/cas/") || r.URL.Path[:len("/cas/")] != "/cas/" {
			http.NotFound(w, r)
			return
		}
		http.StripPrefix("/cas", active.CASHandler()).ServeHTTP(w, r)
	})}
	serverDone := make(chan error, 1)
	go func() { serverDone <- httpServer.Serve(listener) }()
	t.Cleanup(func() {
		_ = httpServer.Close()
		<-serverDone
		registryMu.Lock()
		defer registryMu.Unlock()
		if activeRegistry != nil {
			_ = activeRegistry.Close()
		}
	})
	if err := registry.CreateRepository(ctx, "local", "adapter"); err != nil {
		t.Fatal(err)
	}

	trailingFixture := bytes.Repeat([]byte("trailing-body"), 1024)
	trailingSum := sha256.Sum256(trailingFixture)
	trailingOID := hex.EncodeToString(trailingSum[:])
	if _, ready, err := registry.PrepareLFSUpload(ctx, "local", "adapter", trailingOID, int64(len(trailingFixture))); err != nil || ready {
		t.Fatalf("prepare trailing fixture = ready %v, error %v", ready, err)
	}
	trailingBody := append(append([]byte(nil), trailingFixture...), 'x')
	if err := registry.IngestLFS(ctx, "local", "adapter", trailingOID, int64(len(trailingFixture)), bytes.NewReader(trailingBody)); err == nil {
		t.Fatal("LFS upload with trailing content succeeded")
	}

	weights := bytes.Repeat([]byte("adapter-weights"), 4096)
	weightsSum := sha256.Sum256(weights)
	weightsOID := hex.EncodeToString(weightsSum[:])
	if _, ready, err := registry.PrepareLFSUpload(ctx, "local", "adapter", weightsOID, int64(len(weights))); err != nil || ready {
		t.Fatalf("prepare weights = ready %v, error %v", ready, err)
	}
	if err := registry.IngestLFS(ctx, "local", "adapter", weightsOID, int64(len(weights)), bytes.NewReader(weights)); err != nil {
		t.Fatalf("ingest weights: %v", err)
	}
	registryMu.Lock()
	if err := registry.Close(); err != nil {
		registryMu.Unlock()
		t.Fatal(err)
	}
	activeRegistry = nil
	registryMu.Unlock()

	reopened, err := Open(ctx, cfg)
	if err != nil {
		t.Fatal(err)
	}
	registry = reopened.Storage
	registryMu.Lock()
	activeRegistry = registry
	registryMu.Unlock()
	if reopened.TokenNew || reopened.AdminToken != "" {
		t.Fatalf("restart unexpectedly returned administrator token: new=%v token=%q", reopened.TokenNew, reopened.AdminToken)
	}

	initial := CommitRequest{
		Owner: "local", Name: "adapter", Revision: "main", Summary: "Initial adapter",
		Operations: []CommitOperation{
			{Kind: "file", Path: "adapter_config.json", Content: []byte(`{"base_model_name_or_path":"local/base","revision":"0123456789abcdef0123456789abcdef01234567"}`)},
			{Kind: "lfsFile", Path: "adapter_model.safetensors", OID: weightsOID, Size: int64(len(weights))},
		},
	}
	first, err := registry.Commit(ctx, initial)
	if err != nil {
		t.Fatalf("commit retained upload: %v", err)
	}
	retried, err := registry.Commit(ctx, initial)
	if err != nil || retried.OID != first.OID {
		t.Fatalf("idempotent commit = %#v, %v; want OID %s", retried, err, first.OID)
	}

	second, err := registry.Commit(ctx, CommitRequest{
		Owner: "local", Name: "adapter", Revision: "main", Parent: first.OID,
		Operations: []CommitOperation{{Kind: "file", Path: "notes.txt", Content: []byte("trained locally")}},
	})
	if err != nil {
		t.Fatalf("second commit: %v", err)
	}
	_, err = registry.Commit(ctx, CommitRequest{
		Owner: "local", Name: "adapter", Revision: "main", Parent: first.OID,
		Operations: []CommitOperation{{Kind: "file", Path: "stale.txt", Content: []byte("stale writer")}},
	})
	if !errors.Is(err, bucket.ErrConflict) {
		t.Fatalf("stale parent error = %v; want conflict", err)
	}

	deleted, err := registry.Commit(ctx, CommitRequest{
		Owner: "local", Name: "adapter", Revision: "main", Parent: second.OID,
		Operations: []CommitOperation{{Kind: "deletedFile", Path: "adapter_model.safetensors"}},
	})
	if err != nil {
		t.Fatalf("deletion commit: %v", err)
	}
	detail, err := registry.Model(ctx, "local", "adapter")
	if err != nil {
		t.Fatal(err)
	}
	if detail.Model.SHA != deleted.OID || detail.Model.FileCount != 2 || len(detail.Revisions) != 3 {
		t.Fatalf("detail after delete = %#v", detail)
	}
}
