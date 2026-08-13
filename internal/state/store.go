package state

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"crypto/subtle"
	"database/sql"
	"encoding/hex"
	"errors"
	"fmt"
	"net/url"
	"os"
	"path/filepath"
	"time"

	_ "modernc.org/sqlite"
)

const schemaVersion = 3

type Store struct{ db *sql.DB }

type Job struct {
	ID           string  `json:"id"`
	Type         string  `json:"type"`
	State        string  `json:"state"`
	RepoID       string  `json:"repo_id,omitempty"`
	Progress     float64 `json:"progress"`
	CurrentBytes int64   `json:"current_bytes,omitempty"`
	TotalBytes   int64   `json:"total_bytes,omitempty"`
	Error        string  `json:"error,omitempty"`
	CreatedAt    string  `json:"created_at"`
	UpdatedAt    string  `json:"updated_at"`
}

type ModelMetadata struct {
	Kind             string
	Architecture     string
	Quantization     string
	BaseModel        string
	BaseRevision     string
	SourceRepository string
	SourceRevision   string
	ValidationStatus string
}

type LFSUpload struct {
	Namespace string
	Name      string
	OID       string
	Size      int64
	XetHash   string
	State     string
	ExpiresAt time.Time
}

func Open(path string) (*Store, error) {
	if path == "" {
		return nil, errors.New("state database path is empty")
	}
	abs, err := filepath.Abs(path)
	if err != nil {
		return nil, err
	}
	if err := os.MkdirAll(filepath.Dir(abs), 0o700); err != nil {
		return nil, fmt.Errorf("create state directory: %w", err)
	}
	if err := ensurePrivateFile(abs); err != nil {
		return nil, err
	}
	query := url.Values{}
	query.Set("_txlock", "immediate")
	query.Add("_pragma", "busy_timeout(5000)")
	query.Add("_pragma", "foreign_keys(ON)")
	query.Add("_pragma", "synchronous(FULL)")
	dsn := (&url.URL{Scheme: "file", Path: filepath.ToSlash(abs), RawQuery: query.Encode()}).String()
	db, err := sql.Open("sqlite", dsn)
	if err != nil {
		return nil, err
	}
	db.SetMaxOpenConns(4)
	store := &Store{db: db}
	if err := store.migrate(context.Background()); err != nil {
		_ = db.Close()
		return nil, err
	}
	return store, nil
}

func ensurePrivateFile(path string) error {
	info, err := os.Lstat(path)
	if err == nil {
		if !info.Mode().IsRegular() || info.Mode()&os.ModeSymlink != 0 {
			return errors.New("state database is not a regular file")
		}
		return os.Chmod(path, 0o600)
	}
	if !errors.Is(err, os.ErrNotExist) {
		return err
	}
	file, err := os.OpenFile(path, os.O_CREATE|os.O_EXCL|os.O_RDWR, 0o600)
	if err != nil {
		return err
	}
	if err := file.Sync(); err != nil {
		_ = file.Close()
		return err
	}
	return file.Close()
}

func (s *Store) migrate(ctx context.Context) error {
	var mode string
	if err := s.db.QueryRowContext(ctx, "PRAGMA journal_mode=WAL").Scan(&mode); err != nil {
		return err
	}
	var version int
	if err := s.db.QueryRowContext(ctx, "PRAGMA user_version").Scan(&version); err != nil {
		return err
	}
	if version > schemaVersion {
		return fmt.Errorf("state database schema %d is newer than supported schema %d", version, schemaVersion)
	}
	if version == 0 {
		if err := s.applyMigration(ctx, []string{
			"CREATE TABLE secrets(name TEXT PRIMARY KEY, value BLOB NOT NULL, created_at INTEGER NOT NULL) WITHOUT ROWID",
			"CREATE TABLE jobs(id TEXT PRIMARY KEY, type TEXT NOT NULL, state TEXT NOT NULL, repo_id TEXT NOT NULL, progress REAL NOT NULL, current_bytes INTEGER NOT NULL, total_bytes INTEGER NOT NULL, error TEXT NOT NULL, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL) WITHOUT ROWID",
			"CREATE INDEX jobs_updated ON jobs(updated_at DESC, id DESC)",
			"CREATE TABLE model_metadata(namespace TEXT NOT NULL, name TEXT NOT NULL, oid TEXT NOT NULL, kind TEXT NOT NULL, architecture TEXT NOT NULL, quantization TEXT NOT NULL, base_model TEXT NOT NULL, base_revision TEXT NOT NULL, source_repository TEXT NOT NULL, source_revision TEXT NOT NULL, validation_status TEXT NOT NULL, PRIMARY KEY(namespace,name,oid)) WITHOUT ROWID",
			"CREATE TABLE lfs_uploads(namespace TEXT NOT NULL,name TEXT NOT NULL,oid TEXT NOT NULL,size INTEGER NOT NULL,xet_hash TEXT NOT NULL,state TEXT NOT NULL,expires_at INTEGER NOT NULL,updated_at INTEGER NOT NULL,PRIMARY KEY(namespace,name,oid,size)) WITHOUT ROWID",
			"CREATE INDEX lfs_uploads_expiry ON lfs_uploads(expires_at,state)",
		}, 3); err != nil {
			return err
		}
		version = 3
	}
	if version == 1 {
		if err := s.applyMigration(ctx, []string{
			"CREATE TABLE IF NOT EXISTS lfs_uploads(namespace TEXT NOT NULL,name TEXT NOT NULL,oid TEXT NOT NULL,size INTEGER NOT NULL,xet_hash TEXT NOT NULL,state TEXT NOT NULL,expires_at INTEGER NOT NULL,updated_at INTEGER NOT NULL,PRIMARY KEY(namespace,name,oid,size)) WITHOUT ROWID",
			"CREATE INDEX IF NOT EXISTS lfs_uploads_expiry ON lfs_uploads(expires_at,state)",
		}, 2); err != nil {
			return err
		}
		version = 2
	}
	if version == 2 {
		if err := s.applyMigration(ctx, []string{
			"ALTER TABLE model_metadata ADD COLUMN source_repository TEXT NOT NULL DEFAULT ''",
			"ALTER TABLE model_metadata ADD COLUMN source_revision TEXT NOT NULL DEFAULT ''",
		}, 3); err != nil {
			return err
		}
	}
	_, err := s.db.ExecContext(ctx, "UPDATE jobs SET state='failed', error='server restarted before the job completed', updated_at=? WHERE state IN ('queued','running')", time.Now().UTC().UnixNano())
	return err
}

func (s *Store) applyMigration(ctx context.Context, statements []string, version int) error {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()
	for _, statement := range statements {
		if _, err := tx.ExecContext(ctx, statement); err != nil {
			return err
		}
	}
	if _, err := tx.ExecContext(ctx, fmt.Sprintf("PRAGMA user_version=%d", version)); err != nil {
		return err
	}
	return tx.Commit()
}

func (s *Store) Close() error { return s.db.Close() }

func (s *Store) GetOrCreateSecret(ctx context.Context, name string, size int) ([]byte, bool, error) {
	var value []byte
	if err := s.db.QueryRowContext(ctx, "SELECT value FROM secrets WHERE name=?", name).Scan(&value); err == nil {
		return append([]byte(nil), value...), false, nil
	} else if !errors.Is(err, sql.ErrNoRows) {
		return nil, false, err
	}
	value = make([]byte, size)
	if _, err := rand.Read(value); err != nil {
		return nil, false, err
	}
	_, err := s.db.ExecContext(ctx, "INSERT OR IGNORE INTO secrets(name,value,created_at) VALUES(?,?,?)", name, value, time.Now().UTC().UnixNano())
	if err != nil {
		return nil, false, err
	}
	var retained []byte
	if err := s.db.QueryRowContext(ctx, "SELECT value FROM secrets WHERE name=?", name).Scan(&retained); err != nil {
		return nil, false, err
	}
	created := subtle.ConstantTimeCompare(value, retained) == 1
	return append([]byte(nil), retained...), created, nil
}

func (s *Store) EnsureAdminToken(ctx context.Context) (string, bool, error) {
	raw := make([]byte, 32)
	if _, err := rand.Read(raw); err != nil {
		return "", false, err
	}
	token := "mf_" + hex.EncodeToString(raw)
	verifier := sha256.Sum256([]byte(token))
	result, err := s.db.ExecContext(ctx, "INSERT OR IGNORE INTO secrets(name,value,created_at) VALUES('admin-token-sha256',?,?)", verifier[:], time.Now().UTC().UnixNano())
	if err != nil {
		return "", false, err
	}
	rows, err := result.RowsAffected()
	if err != nil {
		return "", false, err
	}
	if rows == 0 {
		return "", false, nil
	}
	return token, true, nil
}

func (s *Store) VerifyAdminToken(ctx context.Context, token string) (bool, error) {
	if token == "" || len(token) > 256 {
		return false, nil
	}
	var expected []byte
	if err := s.db.QueryRowContext(ctx, "SELECT value FROM secrets WHERE name='admin-token-sha256'").Scan(&expected); err != nil {
		return false, err
	}
	actual := sha256.Sum256([]byte(token))
	return len(expected) == len(actual) && subtle.ConstantTimeCompare(expected, actual[:]) == 1, nil
}

func NewJob(repoID, jobType string) Job {
	now := time.Now().UTC().Format(time.RFC3339Nano)
	bytes := make([]byte, 16)
	_, _ = rand.Read(bytes)
	return Job{ID: hex.EncodeToString(bytes), Type: jobType, State: "queued", RepoID: repoID, CreatedAt: now, UpdatedAt: now}
}

func (s *Store) PutJob(ctx context.Context, job Job) error {
	created, err := time.Parse(time.RFC3339Nano, job.CreatedAt)
	if err != nil {
		return err
	}
	updated, err := time.Parse(time.RFC3339Nano, job.UpdatedAt)
	if err != nil {
		return err
	}
	_, err = s.db.ExecContext(ctx, `INSERT INTO jobs(id,type,state,repo_id,progress,current_bytes,total_bytes,error,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?)
ON CONFLICT(id) DO UPDATE SET state=excluded.state,progress=excluded.progress,current_bytes=excluded.current_bytes,total_bytes=excluded.total_bytes,error=excluded.error,updated_at=excluded.updated_at`,
		job.ID, job.Type, job.State, job.RepoID, job.Progress, job.CurrentBytes, job.TotalBytes, job.Error, created.UnixNano(), updated.UnixNano())
	return err
}

func (s *Store) UpdateJob(ctx context.Context, job *Job, stateValue string, progress float64, current, total int64, message string) error {
	updated := time.Now().UTC()
	result, err := s.db.ExecContext(ctx, `UPDATE jobs SET state=?,progress=?,current_bytes=?,total_bytes=?,error=?,updated_at=? WHERE id=? AND state IN ('queued','running')`,
		stateValue, progress, current, total, message, updated.UnixNano(), job.ID)
	if err != nil {
		return err
	}
	changed, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if changed == 1 {
		job.State, job.Progress, job.CurrentBytes, job.TotalBytes, job.Error = stateValue, progress, current, total, message
		job.UpdatedAt = updated.Format(time.RFC3339Nano)
	}
	return nil
}

func (s *Store) ListJobs(ctx context.Context) ([]Job, error) {
	rows, err := s.db.QueryContext(ctx, "SELECT id,type,state,repo_id,progress,current_bytes,total_bytes,error,created_at,updated_at FROM jobs ORDER BY updated_at DESC,id DESC LIMIT 500")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	jobs := make([]Job, 0)
	for rows.Next() {
		var job Job
		var created, updated int64
		if err := rows.Scan(&job.ID, &job.Type, &job.State, &job.RepoID, &job.Progress, &job.CurrentBytes, &job.TotalBytes, &job.Error, &created, &updated); err != nil {
			return nil, err
		}
		job.CreatedAt = time.Unix(0, created).UTC().Format(time.RFC3339Nano)
		job.UpdatedAt = time.Unix(0, updated).UTC().Format(time.RFC3339Nano)
		jobs = append(jobs, job)
	}
	return jobs, rows.Err()
}

func (s *Store) Job(ctx context.Context, id string) (Job, bool, error) {
	var job Job
	var created, updated int64
	err := s.db.QueryRowContext(ctx, "SELECT id,type,state,repo_id,progress,current_bytes,total_bytes,error,created_at,updated_at FROM jobs WHERE id=?", id).
		Scan(&job.ID, &job.Type, &job.State, &job.RepoID, &job.Progress, &job.CurrentBytes, &job.TotalBytes, &job.Error, &created, &updated)
	if errors.Is(err, sql.ErrNoRows) {
		return Job{}, false, nil
	}
	if err != nil {
		return Job{}, false, err
	}
	job.CreatedAt = time.Unix(0, created).UTC().Format(time.RFC3339Nano)
	job.UpdatedAt = time.Unix(0, updated).UTC().Format(time.RFC3339Nano)
	return job, true, nil
}

func (s *Store) CancelJob(ctx context.Context, id string) (Job, bool, error) {
	now := time.Now().UTC()
	result, err := s.db.ExecContext(ctx, "UPDATE jobs SET state='canceled', error='', updated_at=? WHERE id=? AND state IN ('queued','running')", now.UnixNano(), id)
	if err != nil {
		return Job{}, false, err
	}
	changed, err := result.RowsAffected()
	if err != nil {
		return Job{}, false, err
	}
	job, found, err := s.Job(ctx, id)
	return job, found && changed == 1, err
}

func (s *Store) PutModelMetadata(ctx context.Context, namespace, name, oid string, metadata ModelMetadata) error {
	_, err := s.db.ExecContext(ctx, `INSERT INTO model_metadata(namespace,name,oid,kind,architecture,quantization,base_model,base_revision,source_repository,source_revision,validation_status) VALUES(?,?,?,?,?,?,?,?,?,?,?)
ON CONFLICT(namespace,name,oid) DO UPDATE SET kind=excluded.kind,architecture=excluded.architecture,quantization=excluded.quantization,base_model=excluded.base_model,base_revision=excluded.base_revision,source_repository=excluded.source_repository,source_revision=excluded.source_revision,validation_status=excluded.validation_status`,
		namespace, name, oid, metadata.Kind, metadata.Architecture, metadata.Quantization, metadata.BaseModel, metadata.BaseRevision, metadata.SourceRepository, metadata.SourceRevision, metadata.ValidationStatus)
	return err
}

func (s *Store) ModelMetadata(ctx context.Context, namespace, name, oid string) (ModelMetadata, error) {
	var metadata ModelMetadata
	err := s.db.QueryRowContext(ctx, "SELECT kind,architecture,quantization,base_model,base_revision,source_repository,source_revision,validation_status FROM model_metadata WHERE namespace=? AND name=? AND oid=?", namespace, name, oid).
		Scan(&metadata.Kind, &metadata.Architecture, &metadata.Quantization, &metadata.BaseModel, &metadata.BaseRevision, &metadata.SourceRepository, &metadata.SourceRevision, &metadata.ValidationStatus)
	if errors.Is(err, sql.ErrNoRows) {
		return ModelMetadata{Kind: "model", ValidationStatus: "pending"}, nil
	}
	return metadata, err
}

func (s *Store) PrepareLFSUpload(ctx context.Context, upload LFSUpload) error {
	_, err := s.db.ExecContext(ctx, `INSERT INTO lfs_uploads(namespace,name,oid,size,xet_hash,state,expires_at,updated_at) VALUES(?,?,?,?,?,'pending',?,?)
ON CONFLICT(namespace,name,oid,size) DO UPDATE SET expires_at=excluded.expires_at,updated_at=excluded.updated_at WHERE lfs_uploads.state!='ready'`,
		upload.Namespace, upload.Name, upload.OID, upload.Size, "", upload.ExpiresAt.UnixNano(), time.Now().UTC().UnixNano())
	return err
}

func (s *Store) CompleteLFSUpload(ctx context.Context, upload LFSUpload) error {
	result, err := s.db.ExecContext(ctx, `UPDATE lfs_uploads SET xet_hash=?,state='ready',expires_at=?,updated_at=? WHERE namespace=? AND name=? AND oid=? AND size=?`,
		upload.XetHash, upload.ExpiresAt.UnixNano(), time.Now().UTC().UnixNano(), upload.Namespace, upload.Name, upload.OID, upload.Size)
	if err != nil {
		return err
	}
	rows, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rows != 1 {
		return errors.New("LFS upload session not found")
	}
	return nil
}

func (s *Store) LFSUpload(ctx context.Context, namespace, name, oid string, size int64) (LFSUpload, bool, error) {
	var upload LFSUpload
	var expires int64
	err := s.db.QueryRowContext(ctx, "SELECT namespace,name,oid,size,xet_hash,state,expires_at FROM lfs_uploads WHERE namespace=? AND name=? AND oid=? AND size=?", namespace, name, oid, size).
		Scan(&upload.Namespace, &upload.Name, &upload.OID, &upload.Size, &upload.XetHash, &upload.State, &expires)
	if errors.Is(err, sql.ErrNoRows) {
		return LFSUpload{}, false, nil
	}
	if err != nil {
		return LFSUpload{}, false, err
	}
	upload.ExpiresAt = time.Unix(0, expires).UTC()
	return upload, true, nil
}
