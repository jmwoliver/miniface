package state

import (
	"context"
	"crypto/sha256"
	"database/sql"
	"path/filepath"
	"testing"
	"time"
)

func TestAdministratorSetupSessionsAndRecovery(t *testing.T) {
	ctx := context.Background()
	store, err := Open(filepath.Join(t.TempDir(), "state.sqlite"))
	if err != nil {
		t.Fatal(err)
	}
	defer store.Close()

	secret, created, err := store.EnsureBootstrapSecret(ctx)
	if err != nil || !created || len(secret) != len("mf_setup_")+64 {
		t.Fatalf("bootstrap secret = %q, %v, %v", secret, created, err)
	}
	if next, nextCreated, err := store.EnsureBootstrapSecret(ctx); err != nil || nextCreated || next != "" {
		t.Fatalf("second bootstrap secret = %q, %v, %v", next, nextCreated, err)
	}
	if err := store.CompleteSetup(ctx, "wrong", "short"); err == nil || err.Error() != "invalid setup secret" {
		t.Fatalf("invalid setup = %v", err)
	}
	if required, err := store.SetupRequired(ctx); err != nil || !required {
		t.Fatalf("setup required after invalid attempt = %v, %v", required, err)
	}

	const firstPassword = "administrator-password-one"
	if err := store.CompleteSetup(ctx, secret, firstPassword); err != nil {
		t.Fatal(err)
	}
	if err := store.CompleteSetup(ctx, secret, "administrator-password-two"); err == nil {
		t.Fatal("consumed setup secret completed setup twice")
	}
	if required, err := store.SetupRequired(ctx); err != nil || required {
		t.Fatalf("setup required after completion = %v, %v", required, err)
	}
	if valid, err := store.VerifyPassword(ctx, firstPassword); err != nil || !valid {
		t.Fatalf("verify password = %v, %v", valid, err)
	}

	session, err := store.CreateSession(ctx, time.Hour)
	if err != nil {
		t.Fatal(err)
	}
	retained, found, err := store.Session(ctx, session.ID)
	if err != nil || !found || retained.CSRF != session.CSRF || !retained.ExpiresAt.Equal(session.ExpiresAt) {
		t.Fatalf("retained session = %#v, %v, %v", retained, found, err)
	}
	expired, err := store.CreateSession(ctx, -time.Second)
	if err != nil {
		t.Fatal(err)
	}
	if _, found, err := store.Session(ctx, expired.ID); err != nil || found {
		t.Fatalf("expired session = %v, %v", found, err)
	}

	const changedPassword = "administrator-password-changed"
	if err := store.ChangePassword(ctx, "wrong", changedPassword); err == nil {
		t.Fatal("changed password with the wrong current password")
	}
	if err := store.ChangePassword(ctx, firstPassword, changedPassword); err != nil {
		t.Fatal(err)
	}
	if _, found, err := store.Session(ctx, session.ID); err != nil || found {
		t.Fatalf("session survived password change = %v, %v", found, err)
	}
	if valid, _ := store.VerifyPassword(ctx, firstPassword); valid {
		t.Fatal("old password remained valid")
	}
	if valid, err := store.VerifyPassword(ctx, changedPassword); err != nil || !valid {
		t.Fatalf("verify changed password = %v, %v", valid, err)
	}

	activeSession, err := store.CreateSession(ctx, time.Hour)
	if err != nil {
		t.Fatal(err)
	}
	_, activeToken, err := store.CreatePersonalAccessToken(ctx, "Recovery test", []string{"write"}, nil)
	if err != nil {
		t.Fatal(err)
	}
	recoverySecret, err := store.RecoverAdministrator(ctx)
	if err != nil {
		t.Fatal(err)
	}
	if _, found, err := store.Session(ctx, activeSession.ID); err != nil || found {
		t.Fatalf("session survived recovery = %v, %v", found, err)
	}
	if _, valid, err := store.AuthenticatePersonalAccessToken(ctx, activeToken); err != nil || valid {
		t.Fatalf("PAT survived recovery = %v, %v", valid, err)
	}
	if valid, _ := store.VerifyPassword(ctx, changedPassword); valid {
		t.Fatal("password survived recovery")
	}
	if err := store.CompleteSetup(ctx, recoverySecret, "administrator-password-recovered"); err != nil {
		t.Fatal(err)
	}
}

func TestPersonalAccessTokenLifecycle(t *testing.T) {
	ctx := context.Background()
	store, err := Open(filepath.Join(t.TempDir(), "state.sqlite"))
	if err != nil {
		t.Fatal(err)
	}
	defer store.Close()

	expires := time.Now().UTC().Add(time.Hour)
	readToken, readPlain, err := store.CreatePersonalAccessToken(ctx, "Read client", []string{"read"}, &expires)
	if err != nil || readPlain == "" || readToken.Prefix == "" {
		t.Fatalf("create read token = %#v, %q, %v", readToken, readPlain, err)
	}
	authenticated, valid, err := store.AuthenticatePersonalAccessToken(ctx, readPlain)
	if err != nil || !valid || authenticated.ID != readToken.ID {
		t.Fatalf("authenticate read token = %#v, %v, %v", authenticated, valid, err)
	}
	if allowed, err := store.PersonalAccessTokenAllows(ctx, readToken.ID, false); err != nil || !allowed {
		t.Fatalf("read scope = %v, %v", allowed, err)
	}
	if allowed, err := store.PersonalAccessTokenAllows(ctx, readToken.ID, true); err != nil || allowed {
		t.Fatalf("read token write scope = %v, %v", allowed, err)
	}
	var lastUsed sql.NullInt64
	if err := store.db.QueryRowContext(ctx, "SELECT last_used_at FROM personal_access_tokens WHERE id=?", readToken.ID).Scan(&lastUsed); err != nil || !lastUsed.Valid {
		t.Fatalf("last used = %#v, %v", lastUsed, err)
	}

	writeToken, writePlain, err := store.CreatePersonalAccessToken(ctx, "Write client", []string{"write"}, nil)
	if err != nil {
		t.Fatal(err)
	}
	if len(writeToken.Scopes) != 2 || writeToken.Scopes[0] != "read" || writeToken.Scopes[1] != "write" {
		t.Fatalf("normalized write scopes = %#v", writeToken.Scopes)
	}
	if revoked, err := store.RevokePersonalAccessToken(ctx, writeToken.ID); err != nil || !revoked {
		t.Fatalf("revoke token = %v, %v", revoked, err)
	}
	if _, valid, err := store.AuthenticatePersonalAccessToken(ctx, writePlain); err != nil || valid {
		t.Fatalf("revoked authentication = %v, %v", valid, err)
	}
	if revoked, err := store.RevokePersonalAccessToken(ctx, writeToken.ID); err != nil || revoked {
		t.Fatalf("repeat revoke = %v, %v", revoked, err)
	}

	if _, err := store.db.ExecContext(ctx, "UPDATE personal_access_tokens SET expires_at=? WHERE id=?", time.Now().Add(-time.Second).UnixNano(), readToken.ID); err != nil {
		t.Fatal(err)
	}
	if _, valid, err := store.AuthenticatePersonalAccessToken(ctx, readPlain); err != nil || valid {
		t.Fatalf("expired authentication = %v, %v", valid, err)
	}
	listed, err := store.ListPersonalAccessTokens(ctx)
	if err != nil || len(listed) != 2 || listed[0].RevokedAt == nil {
		t.Fatalf("listed tokens = %#v, %v", listed, err)
	}
}

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

func TestVersionThreeLegacyTokenMigration(t *testing.T) {
	ctx := context.Background()
	path := filepath.Join(t.TempDir(), "state.sqlite")
	db, err := sql.Open("sqlite", path)
	if err != nil {
		t.Fatal(err)
	}
	const legacyToken = "mf_0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
	verifier := sha256.Sum256([]byte(legacyToken))
	_, err = db.Exec(`
CREATE TABLE secrets(name TEXT PRIMARY KEY, value BLOB NOT NULL, created_at INTEGER NOT NULL) WITHOUT ROWID;
CREATE TABLE jobs(id TEXT PRIMARY KEY, type TEXT NOT NULL, state TEXT NOT NULL, repo_id TEXT NOT NULL, progress REAL NOT NULL, current_bytes INTEGER NOT NULL, total_bytes INTEGER NOT NULL, error TEXT NOT NULL, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL) WITHOUT ROWID;
CREATE INDEX jobs_updated ON jobs(updated_at DESC, id DESC);
CREATE TABLE model_metadata(namespace TEXT NOT NULL, name TEXT NOT NULL, oid TEXT NOT NULL, kind TEXT NOT NULL, architecture TEXT NOT NULL, quantization TEXT NOT NULL, base_model TEXT NOT NULL, base_revision TEXT NOT NULL, source_repository TEXT NOT NULL, source_revision TEXT NOT NULL, validation_status TEXT NOT NULL, PRIMARY KEY(namespace,name,oid)) WITHOUT ROWID;
CREATE TABLE lfs_uploads(namespace TEXT NOT NULL,name TEXT NOT NULL,oid TEXT NOT NULL,size INTEGER NOT NULL,xet_hash TEXT NOT NULL,state TEXT NOT NULL,expires_at INTEGER NOT NULL,updated_at INTEGER NOT NULL,PRIMARY KEY(namespace,name,oid,size)) WITHOUT ROWID;
CREATE INDEX lfs_uploads_expiry ON lfs_uploads(expires_at,state);
INSERT INTO jobs VALUES('interrupted','huggingface-import','running','local/model',0.5,1,2,'',1,1);
PRAGMA user_version=3;`)
	if err != nil {
		t.Fatal(err)
	}
	if _, err := db.Exec("INSERT INTO secrets(name,value,created_at) VALUES('admin-token-sha256',?,1)", verifier[:]); err != nil {
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
	if valid, err := store.VerifyAdminToken(ctx, legacyToken); err != nil || !valid {
		t.Fatalf("legacy token after migration = %v, %v", valid, err)
	}
	if err := store.CompleteSetup(ctx, legacyToken, "migrated-administrator-password"); err != nil {
		t.Fatal(err)
	}
	if valid, err := store.VerifyAdminToken(ctx, legacyToken); err != nil || valid {
		t.Fatalf("legacy token after setup = %v, %v", valid, err)
	}
	job, found, err := store.Job(ctx, "interrupted")
	if err != nil || !found || job.State != "failed" || job.Phase != "Failed" {
		t.Fatalf("migrated job = %#v, %v, %v", job, found, err)
	}
	var version int
	if err := store.db.QueryRowContext(ctx, "PRAGMA user_version").Scan(&version); err != nil || version != schemaVersion {
		t.Fatalf("schema version = %d, %v", version, err)
	}
}
