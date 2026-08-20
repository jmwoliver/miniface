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
	"net"
	"net/http"
	"net/http/httptest"
	"net/url"
	"path/filepath"
	"strings"
	"sync/atomic"
	"testing"
	"time"

	"github.com/jmwoliver/miniface/internal/config"
	"github.com/jmwoliver/miniface/internal/state"
	"github.com/jmwoliver/xet-go/bucket"
	"github.com/jmwoliver/xet-go/model"
	"github.com/jmwoliver/xet-go/xethash"
)

func TestHuggingFaceImportStreamsPinnedSnapshotIntoXetAndClonesExactDuplicate(t *testing.T) {
	ctx := context.Background()
	registry := openHuggingFaceImportRegistry(t)
	accessToken := "hf_ephemeral_test_token"
	commit := "0123456789abcdef0123456789abcdef01234567"
	configBody := []byte(`{"architectures":["RemoteModel"],"model_type":"remote"}`)
	weights := bytes.Repeat([]byte("hugging-face-xet-stream"), 55_000)
	weightsSHA := sha256.Sum256(weights)

	var cdnReceivedAuthorization atomic.Bool
	var treeReceivedAuthorization atomic.Bool
	var weightRequests atomic.Int64
	var announcedXetHash atomic.Value
	announcedXetHash.Store(strings.Repeat("a", 64))
	cdn := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("Authorization") != "" {
			cdnReceivedAuthorization.Store(true)
		}
		w.Header().Set("Content-Length", fmt.Sprint(len(weights)))
		_, _ = w.Write(weights)
	}))
	defer cdn.Close()

	var hub *httptest.Server
	hub = httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch {
		case r.URL.Path == "/api/models":
			if r.Header.Get("Authorization") != "" {
				t.Error("public model search received an access token")
			}
			if len(r.URL.Query()["expand[]"]) != 5 {
				t.Errorf("search does not request the required fields: %s", r.URL.RawQuery)
			}
			writeHuggingFaceTestJSON(t, w, []map[string]any{{
				"id": "source/model", "downloads": 42, "likes": 3, "gated": "auto", "pipeline_tag": "text-generation", "sha": commit,
			}})
		case strings.HasPrefix(r.URL.Path, "/api/models/source/model/revision/"):
			requireHuggingFaceTestToken(t, r, accessToken)
			if !strings.Contains(r.RequestURI, "refs%2Fpr%2F1") {
				t.Errorf("revision was not escaped as one path component: %s", r.RequestURI)
			}
			if r.URL.Query().Get("expand[]") != "sha" {
				t.Errorf("revision request does not select sha: %s", r.URL.RawQuery)
			}
			writeHuggingFaceTestJSON(t, w, map[string]string{"id": "source/model", "sha": commit})
		case r.URL.Path == "/api/models/source/model/tree/"+commit && r.URL.Query().Get("cursor") == "next":
			if r.Header.Get("Authorization") != "" {
				requireHuggingFaceTestToken(t, r, accessToken)
				treeReceivedAuthorization.Store(true)
			}
			writeHuggingFaceTestJSON(t, w, []map[string]any{{
				"type": "file", "path": "model.safetensors", "size": len(weights), "xetHash": announcedXetHash.Load().(string),
				"lfs": map[string]any{"oid": hex.EncodeToString(weightsSHA[:]), "size": len(weights), "pointerSize": 134},
			}})
		case r.URL.Path == "/api/models/source/model/tree/"+commit:
			if r.Header.Get("Authorization") != "" {
				requireHuggingFaceTestToken(t, r, accessToken)
				treeReceivedAuthorization.Store(true)
			}
			if r.URL.Query().Get("recursive") != "true" || r.URL.Query().Get("limit") != "1000" {
				t.Errorf("unexpected tree query: %s", r.URL.RawQuery)
			}
			next := hub.URL + r.URL.Path + "?cursor=next"
			w.Header().Set("Link", "<"+next+">; rel=\"next\"")
			writeHuggingFaceTestJSON(t, w, []map[string]any{
				{"type": "directory", "path": "unused", "size": 0},
				{"type": "file", "path": "config.json", "size": len(configBody)},
			})
		case r.URL.Path == "/source/model/resolve/"+commit+"/config.json":
			requireHuggingFaceTestToken(t, r, accessToken)
			w.Header().Set("Content-Length", fmt.Sprint(len(configBody)))
			_, _ = w.Write(configBody)
		case r.URL.Path == "/source/model/resolve/"+commit+"/model.safetensors":
			weightRequests.Add(1)
			requireHuggingFaceTestToken(t, r, accessToken)
			http.Redirect(w, r, cdn.URL+"/signed-download?signature=secret", http.StatusFound)
		case strings.HasPrefix(r.URL.Path, "/api/models/source/denied/revision/"):
			requireHuggingFaceTestToken(t, r, accessToken)
			w.WriteHeader(http.StatusForbidden)
			_, _ = io.WriteString(w, `{"error":"gated"}`)
		default:
			http.NotFound(w, r)
		}
	}))
	defer hub.Close()
	registry.huggingFaceURL = hub.URL

	models, err := registry.SearchHuggingFaceModels(ctx, "remote")
	if err != nil || len(models) != 1 || models[0].ID != "source/model" || !models[0].Gated || models[0].SizeBytes == nil || *models[0].SizeBytes != int64(len(configBody)+len(weights)) {
		t.Fatalf("search results = %#v, %v", models, err)
	}
	job, err := registry.StartHuggingFaceImport(ctx, "source/model", "refs/pr/1", "mirror/model", "", accessToken)
	if err != nil {
		t.Fatal(err)
	}
	completed := waitForStorageJob(t, registry.State(), job.ID)
	if completed.State != "completed" || completed.Phase != "Completed" || completed.Progress != 1 || completed.CurrentBytes != int64(len(configBody)+len(weights)) || completed.SourceRepo != "source/model" || completed.SourceRev != commit {
		t.Fatalf("completed job = %#v", completed)
	}
	if cdnReceivedAuthorization.Load() {
		t.Fatal("Hugging Face bearer token was forwarded to the signed cross-origin download")
	}
	if !treeReceivedAuthorization.Load() {
		t.Fatal("Hugging Face token was not sent while listing the import tree")
	}

	detail, err := registry.Model(ctx, "mirror", "model")
	if err != nil {
		t.Fatal(err)
	}
	if detail.Model.Architecture != "RemoteModel" || detail.Model.SourceRepository != "source/model" || detail.Model.SourceRevision != commit {
		t.Fatalf("imported model metadata = %#v", detail.Model)
	}
	if len(detail.Files) != 2 || detail.Files[1].Path != "model.safetensors" || detail.Files[1].XetHash == "" {
		t.Fatalf("imported files = %#v", detail.Files)
	}
	if weightRequests.Load() != 1 {
		t.Fatalf("initial weight requests = %d, want 1", weightRequests.Load())
	}
	if len(detail.Revisions) != 1 || !strings.Contains(detail.Revisions[0].Message, "source/model@0123456789ab") {
		t.Fatalf("imported revisions = %#v", detail.Revisions)
	}
	repo, _ := repoKey("mirror", "model")
	opened, err := registry.service.OpenFile(ctx, repo, mainRevision(), "model.safetensors", bucket.OpenOptions{})
	if err != nil {
		t.Fatal(err)
	}
	downloaded, err := io.ReadAll(opened.Body)
	closeErr := opened.Body.Close()
	if err != nil || closeErr != nil || !bytes.Equal(downloaded, weights) {
		t.Fatalf("imported weight bytes = %d, %v, %v", len(downloaded), err, closeErr)
	}
	statsBeforeClone, err := registry.Stats(ctx)
	if err != nil {
		t.Fatal(err)
	}

	announcedXetHash.Store(detail.Files[1].XetHash)
	cloneJob, err := registry.StartHuggingFaceImport(ctx, "source/model", "refs/pr/1", "mirror/clone", "", accessToken)
	if err != nil {
		t.Fatal(err)
	}
	cloned := waitForStorageJob(t, registry.State(), cloneJob.ID)
	if cloned.State != "completed" || cloned.Progress != 1 || cloned.CurrentBytes != int64(len(configBody)+len(weights)) {
		t.Fatalf("cloned job = %#v", cloned)
	}
	if weightRequests.Load() != 1 {
		t.Fatalf("exact duplicate fetched the Hugging Face weight; requests = %d", weightRequests.Load())
	}
	cloneDetail, err := registry.Model(ctx, "mirror", "clone")
	if err != nil {
		t.Fatal(err)
	}
	if len(cloneDetail.Files) != 2 || cloneDetail.Files[1].XetHash != detail.Files[1].XetHash || cloneDetail.Files[1].SHA256 != detail.Files[1].SHA256 || cloneDetail.Files[1].Size != detail.Files[1].Size {
		t.Fatalf("cloned files = %#v, source = %#v", cloneDetail.Files, detail.Files)
	}
	cloneRepo, _ := repoKey("mirror", "clone")
	cloneOpened, err := registry.service.OpenFile(ctx, cloneRepo, mainRevision(), "model.safetensors", bucket.OpenOptions{})
	if err != nil {
		t.Fatal(err)
	}
	cloneBytes, err := io.ReadAll(cloneOpened.Body)
	cloneCloseErr := cloneOpened.Body.Close()
	if err != nil || cloneCloseErr != nil || !bytes.Equal(cloneBytes, weights) {
		t.Fatalf("cloned weight bytes = %d, %v, %v", len(cloneBytes), err, cloneCloseErr)
	}
	statsAfterClone, err := registry.Stats(ctx)
	if err != nil {
		t.Fatal(err)
	}
	if statsAfterClone.XetObjects != statsBeforeClone.XetObjects || statsAfterClone.PhysicalBytes != statsBeforeClone.PhysicalBytes || statsAfterClone.Repositories != statsBeforeClone.Repositories+1 || statsAfterClone.LogicalBytes != statsBeforeClone.LogicalBytes+int64(len(configBody)+len(weights)) {
		t.Fatalf("storage after clone = %#v, before = %#v", statsAfterClone, statsBeforeClone)
	}

	failedJob, err := registry.StartHuggingFaceImport(ctx, "source/denied", "main", "mirror/denied", "", accessToken)
	if err != nil {
		t.Fatal(err)
	}
	failed := waitForStorageJob(t, registry.State(), failedJob.ID)
	if failed.State != "failed" || !strings.Contains(failed.Error, "accept or request access") || strings.Contains(failed.Error, accessToken) {
		t.Fatalf("gated import job = %#v", failed)
	}
	if _, err := registry.CancelJob(ctx, completed.ID); !errors.Is(err, ErrJobNotCancelable) {
		t.Fatalf("cancel completed job = %v", err)
	}
}

func TestHuggingFaceXetIdentityRequiresHashSizeAndSHA(t *testing.T) {
	body := bytes.Repeat([]byte("exact-xet-file"), 100_000)
	sum := sha256.Sum256(body)
	hash := xethash.Chunk(body)
	file := huggingFaceTreeFile{Path: "model.safetensors", Size: int64(len(body)), XetHash: hash.String()}
	file.LFS = &struct {
		OID  string `json:"oid"`
		Size int64  `json:"size"`
	}{OID: hex.EncodeToString(sum[:]), Size: int64(len(body))}

	remote, ok := huggingFaceXetIdentity(file, 1<<20)
	if !ok {
		t.Fatal("exact Hugging Face Xet identity was not recognized")
	}
	ref, err := model.NewXetFileRef(hash, int64(len(body)), &sum)
	if err != nil {
		t.Fatal(err)
	}
	local, ok := fileRefXetIdentity(ref)
	if !ok || local != remote {
		t.Fatalf("local identity = %#v, %t; remote = %#v", local, ok, remote)
	}

	wrongSize := file
	wrongSize.Size++
	if identity, ok := huggingFaceXetIdentity(wrongSize, 1<<20); !ok || identity == local {
		t.Fatalf("wrong-size identity = %#v, %t", identity, ok)
	}
	wrongSHA := file
	wrongSHA.LFS = &struct {
		OID  string `json:"oid"`
		Size int64  `json:"size"`
	}{OID: strings.Repeat("0", 64), Size: int64(len(body))}
	if identity, ok := huggingFaceXetIdentity(wrongSHA, 1<<20); !ok || identity == local {
		t.Fatalf("wrong-SHA identity = %#v, %t", identity, ok)
	}
	wrongHash := file
	wrongHash.XetHash = xethash.Chunk([]byte("different")).String()
	if identity, ok := huggingFaceXetIdentity(wrongHash, 1<<20); !ok || identity == local {
		t.Fatalf("wrong-hash identity = %#v, %t", identity, ok)
	}
}

func TestHuggingFaceSearchKeepsModelsWithUnavailableSizes(t *testing.T) {
	registry := openHuggingFaceImportRegistry(t)
	hub := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case "/api/models":
			writeHuggingFaceTestJSON(t, w, []map[string]any{{"id": "source/model", "downloads": 4, "likes": 2, "gated": false, "sha": strings.Repeat("1", 40)}})
		case "/api/models/source/model/tree/" + strings.Repeat("1", 40):
			http.Error(w, "metadata unavailable", http.StatusServiceUnavailable)
		default:
			http.NotFound(w, r)
		}
	}))
	defer hub.Close()
	registry.huggingFaceURL = hub.URL

	models, err := registry.SearchHuggingFaceModels(context.Background(), "source")
	if err != nil || len(models) != 1 || models[0].ID != "source/model" || models[0].SizeBytes != nil {
		t.Fatalf("search results = %#v, %v", models, err)
	}
}

func TestHuggingFaceTreeExplainsRedactedGatedMetadata(t *testing.T) {
	registry := openHuggingFaceImportRegistry(t)
	commit := "0123456789abcdef0123456789abcdef01234567"
	hub := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		writeHuggingFaceTestJSON(t, w, []map[string]any{{
			"type": "file", "path": "model.safetensors", "size": 1024, "xetHash": strings.Repeat("*", 64),
			"lfs": map[string]any{"oid": strings.Repeat("*", 64), "size": 1024, "pointerSize": 130},
		}})
	}))
	defer hub.Close()
	registry.huggingFaceURL = hub.URL

	_, _, err := registry.huggingFaceTree(context.Background(), "source/model", commit, "")
	if err == nil || !strings.Contains(err.Error(), "gated repository") || !strings.Contains(err.Error(), "token that has read permission") || strings.Contains(err.Error(), "invalid metadata") {
		t.Fatalf("redacted metadata error = %v", err)
	}
}

func TestHuggingFaceImportCancellation(t *testing.T) {
	ctx := context.Background()
	registry := openHuggingFaceImportRegistry(t)
	commit := "0123456789abcdef0123456789abcdef01234567"
	started := make(chan struct{})
	var hub *httptest.Server
	hub = httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch {
		case strings.HasPrefix(r.URL.Path, "/api/models/source/model/revision/"):
			writeHuggingFaceTestJSON(t, w, map[string]string{"sha": commit})
		case r.URL.Path == "/api/models/source/model/tree/"+commit:
			writeHuggingFaceTestJSON(t, w, []map[string]any{{"type": "file", "path": "model.safetensors", "size": 2 << 20}})
		case r.URL.Path == "/source/model/resolve/"+commit+"/model.safetensors":
			w.Header().Set("Content-Length", fmt.Sprint(2<<20))
			w.WriteHeader(http.StatusOK)
			_, _ = w.Write(make([]byte, 64<<10))
			if flusher, ok := w.(http.Flusher); ok {
				flusher.Flush()
			}
			select {
			case <-started:
			default:
				close(started)
			}
			<-r.Context().Done()
		default:
			http.NotFound(w, r)
		}
	}))
	defer hub.Close()
	registry.huggingFaceURL = hub.URL

	running, err := registry.StartHuggingFaceImport(ctx, "source/model", "main", "mirror/running", "", "")
	if err != nil {
		t.Fatal(err)
	}
	select {
	case <-started:
	case <-time.After(5 * time.Second):
		t.Fatal("running import did not begin downloading")
	}
	queued, err := registry.StartHuggingFaceImport(ctx, "source/model", "main", "mirror/queued", "", "")
	if err != nil {
		t.Fatal(err)
	}
	canceledQueued, err := registry.CancelJob(ctx, queued.ID)
	if err != nil || canceledQueued.State != "canceled" {
		t.Fatalf("cancel queued job = %#v, %v", canceledQueued, err)
	}
	if repeated, err := registry.CancelJob(ctx, queued.ID); err != nil || repeated.State != "canceled" {
		t.Fatalf("repeat cancellation = %#v, %v", repeated, err)
	}
	if canceled := waitForStorageJob(t, registry.State(), queued.ID); canceled.State != "canceled" {
		t.Fatalf("queued job = %#v", canceled)
	}
	canceledRunning, err := registry.CancelJob(ctx, running.ID)
	if err != nil || canceledRunning.State != "canceled" {
		t.Fatalf("cancel running job = %#v, %v", canceledRunning, err)
	}
	if canceled := waitForStorageJob(t, registry.State(), running.ID); canceled.State != "canceled" {
		t.Fatalf("running job = %#v", canceled)
	}
	if _, err := registry.CancelJob(ctx, strings.Repeat("f", 32)); !errors.Is(err, ErrJobNotFound) {
		t.Fatalf("cancel unknown job = %v", err)
	}
	repo, _ := repoKey("mirror", "running")
	if _, err := registry.service.ResolveRevision(ctx, repo, mainRevision()); !errors.Is(err, bucket.ErrNotFound) {
		t.Fatalf("canceled import published a snapshot: %v", err)
	}
}

func TestHuggingFaceImportCapacity(t *testing.T) {
	if err := requireImportCapacity(10<<30, 15<<30); err != nil {
		t.Fatalf("exact capacity rejected: %v", err)
	}
	err := requireImportCapacity(10<<30, (15<<30)-1)
	if err == nil || !strings.Contains(err.Error(), "snapshot is 10.0 GiB") || !strings.Contains(err.Error(), "5 GiB safety reserve") {
		t.Fatalf("capacity error = %v", err)
	}
	if err := requireImportCapacity(-1, math.MaxUint64); err == nil {
		t.Fatal("negative import size accepted")
	}
	if err := requireXetImportMemory(2<<30, 4<<30); err != nil {
		t.Fatalf("exact memory capacity rejected: %v", err)
	}
	err = requireXetImportMemory(2<<30, (4<<30)-1)
	if err == nil || !strings.Contains(err.Error(), "requires 4.0 GiB") || !strings.Contains(err.Error(), "only 4.0 GiB is available") {
		t.Fatalf("memory capacity error = %v", err)
	}
	if err := requireXetImportMemory(5_111_976_608, 15<<30); err != nil {
		t.Fatalf("Muse-Glimmer-sized file rejected with 15 GiB available: %v", err)
	}
}

func openHuggingFaceImportRegistry(t *testing.T) *Local {
	t.Helper()
	listener, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatal(err)
	}
	base, _ := url.Parse("http://" + listener.Addr().String())
	root := t.TempDir()
	opened, err := Open(context.Background(), config.Config{
		Listen: listener.Addr().String(), BaseURL: base, DataDir: filepath.Join(root, "data"),
		ImportRoots: []string{root}, XetThreshold: config.DefaultXetThreshold,
	})
	if err != nil {
		_ = listener.Close()
		t.Fatal(err)
	}
	mux := http.NewServeMux()
	mux.Handle("/cas/", http.StripPrefix("/cas", opened.Storage.CASHandler()))
	mux.Handle("/objects/", http.StripPrefix("/objects", opened.Storage.ObjectHandler()))
	server := &http.Server{Handler: mux}
	done := make(chan error, 1)
	go func() { done <- server.Serve(listener) }()
	t.Cleanup(func() {
		_ = opened.Storage.Close()
		shutdown, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		_ = server.Shutdown(shutdown)
		<-done
	})
	return opened.Storage
}

func waitForStorageJob(t *testing.T, store *state.Store, id string) state.Job {
	t.Helper()
	deadline := time.Now().Add(20 * time.Second)
	for {
		jobs, err := store.ListJobs(context.Background())
		if err != nil {
			t.Fatal(err)
		}
		for _, job := range jobs {
			if job.ID == id && (job.State == "completed" || job.State == "failed" || job.State == "canceled") {
				return job
			}
		}
		if time.Now().After(deadline) {
			t.Fatalf("timed out waiting for job %s", id)
		}
		time.Sleep(20 * time.Millisecond)
	}
}

func requireHuggingFaceTestToken(t *testing.T, request *http.Request, token string) {
	t.Helper()
	if request.Header.Get("Authorization") != "Bearer "+token {
		t.Errorf("Hugging Face request authorization = %q", request.Header.Get("Authorization"))
	}
}

func writeHuggingFaceTestJSON(t *testing.T, writer http.ResponseWriter, value any) {
	t.Helper()
	writer.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(writer).Encode(value); err != nil {
		t.Error(err)
	}
}
