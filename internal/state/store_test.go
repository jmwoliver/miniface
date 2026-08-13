package state

import (
	"context"
	"database/sql"
	"path/filepath"
	"testing"
	"time"
)

func TestAdminTokenAndLFSUploadPersistence(t *testing.T) {
	ctx := context.Background()
	path := filepath.Join(t.TempDir(), "state.sqlite")
	store, err := Open(path)
	if err != nil {
		t.Fatal(err)
	}
	token, created, err := store.EnsureAdminToken(ctx)
	if err != nil || !created || token == "" {
		t.Fatalf("first token = %q, %v, %v", token, created, err)
	}
	if valid, err := store.VerifyAdminToken(ctx, token); err != nil || !valid {
		t.Fatalf("verify token = %v, %v", valid, err)
	}
	if valid, err := store.VerifyAdminToken(ctx, token+"x"); err != nil || valid {
		t.Fatalf("verify wrong token = %v, %v", valid, err)
	}
	if next, nextCreated, err := store.EnsureAdminToken(ctx); err != nil || nextCreated || next != "" {
		t.Fatalf("second token = %q, %v, %v", next, nextCreated, err)
	}

	upload := LFSUpload{Namespace: "owner", Name: "model", OID: "abc", Size: 10, ExpiresAt: time.Now().Add(time.Hour)}
	if err := store.PrepareLFSUpload(ctx, upload); err != nil {
		t.Fatal(err)
	}
	upload.XetHash = "xet-hash"
	upload.ExpiresAt = time.Now().Add(24 * time.Hour)
	if err := store.CompleteLFSUpload(ctx, upload); err != nil {
		t.Fatal(err)
	}
	if err := store.Close(); err != nil {
		t.Fatal(err)
	}
	store, err = Open(path)
	if err != nil {
		t.Fatal(err)
	}
	defer store.Close()
	retained, found, err := store.LFSUpload(ctx, "owner", "model", "abc", 10)
	if err != nil || !found || retained.State != "ready" || retained.XetHash != "xet-hash" {
		t.Fatalf("retained upload = %#v, %v, %v", retained, found, err)
	}
}

func TestCanceledJobCannotBeOverwrittenByWorker(t *testing.T) {
	ctx := context.Background()
	store, err := Open(filepath.Join(t.TempDir(), "state.sqlite"))
	if err != nil {
		t.Fatal(err)
	}
	defer store.Close()
	job := NewJob("local/model", "import")
	if err := store.PutJob(ctx, job); err != nil {
		t.Fatal(err)
	}
	canceled, changed, err := store.CancelJob(ctx, job.ID)
	if err != nil || !changed || canceled.State != "canceled" {
		t.Fatalf("cancel job = %#v, %v, %v", canceled, changed, err)
	}
	if err := store.UpdateJob(ctx, &job, "completed", 1, 10, 10, ""); err != nil {
		t.Fatal(err)
	}
	retained, found, err := store.Job(ctx, job.ID)
	if err != nil || !found || retained.State != "canceled" || retained.Progress != 0 {
		t.Fatalf("retained canceled job = %#v, %v, %v", retained, found, err)
	}
	again, changed, err := store.CancelJob(ctx, job.ID)
	if err != nil || changed || again.State != "canceled" {
		t.Fatalf("repeat cancel = %#v, %v, %v", again, changed, err)
	}
}

func TestVersionOneMigrationIsDurable(t *testing.T) {
	ctx := context.Background()
	path := filepath.Join(t.TempDir(), "state.sqlite")
	db, err := sql.Open("sqlite", path)
	if err != nil {
		t.Fatal(err)
	}
	_, err = db.Exec(`
CREATE TABLE secrets(name TEXT PRIMARY KEY, value BLOB NOT NULL, created_at INTEGER NOT NULL) WITHOUT ROWID;
CREATE TABLE jobs(id TEXT PRIMARY KEY, type TEXT NOT NULL, state TEXT NOT NULL, repo_id TEXT NOT NULL, progress REAL NOT NULL, current_bytes INTEGER NOT NULL, total_bytes INTEGER NOT NULL, error TEXT NOT NULL, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL) WITHOUT ROWID;
CREATE INDEX jobs_updated ON jobs(updated_at DESC, id DESC);
CREATE TABLE model_metadata(namespace TEXT NOT NULL, name TEXT NOT NULL, oid TEXT NOT NULL, kind TEXT NOT NULL, architecture TEXT NOT NULL, quantization TEXT NOT NULL, base_model TEXT NOT NULL, base_revision TEXT NOT NULL, validation_status TEXT NOT NULL, PRIMARY KEY(namespace,name,oid)) WITHOUT ROWID;
INSERT INTO jobs VALUES('interrupted','import','running','local/model',0.5,1,2,'',1,1);
PRAGMA user_version=1;`)
	if err != nil {
		t.Fatal(err)
	}
	if err := db.Close(); err != nil {
		t.Fatal(err)
	}

	store, err := Open(path)
	if err != nil {
		t.Fatal(err)
	}
	defer store.Close()
	var version int
	if err := store.db.QueryRowContext(ctx, "PRAGMA user_version").Scan(&version); err != nil || version != schemaVersion {
		t.Fatalf("schema version = %d, %v", version, err)
	}
	jobs, err := store.ListJobs(ctx)
	if err != nil || len(jobs) != 1 || jobs[0].State != "failed" {
		t.Fatalf("migrated jobs = %#v, %v", jobs, err)
	}
	if err := store.PrepareLFSUpload(ctx, LFSUpload{Namespace: "local", Name: "model", OID: "abc", Size: 1, ExpiresAt: time.Now().Add(time.Hour)}); err != nil {
		t.Fatalf("use migrated LFS table: %v", err)
	}
	metadata := ModelMetadata{Kind: "model", SourceRepository: "source/model", SourceRevision: "0123456789abcdef0123456789abcdef01234567", ValidationStatus: "valid"}
	if err := store.PutModelMetadata(ctx, "local", "model", "oid", metadata); err != nil {
		t.Fatalf("write migrated provenance columns: %v", err)
	}
	retained, err := store.ModelMetadata(ctx, "local", "model", "oid")
	if err != nil || retained.SourceRepository != metadata.SourceRepository || retained.SourceRevision != metadata.SourceRevision {
		t.Fatalf("migrated model metadata = %#v, %v", retained, err)
	}
}
