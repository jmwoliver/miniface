package state

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"crypto/subtle"
	"database/sql"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"fmt"
	"net/url"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"golang.org/x/crypto/argon2"
	_ "modernc.org/sqlite"
)

const schemaVersion = 6

const (
	administratorID = "local:administrator"
	passwordMemory  = 64 * 1024
	passwordTime    = 3
	passwordThreads = 1
	passwordKeyLen  = 32
)

type Store struct{ db *sql.DB }

type Job struct {
	ID           string  `json:"id"`
	Type         string  `json:"type"`
	State        string  `json:"state"`
	Phase        string  `json:"phase"`
	RepoID       string  `json:"repo_id,omitempty"`
	SourceRepo   string  `json:"source_repository,omitempty"`
	SourceRev    string  `json:"source_revision,omitempty"`
	Progress     float64 `json:"progress"`
	CurrentBytes int64   `json:"current_bytes,omitempty"`
	TotalBytes   int64   `json:"total_bytes,omitempty"`
	Error        string  `json:"error,omitempty"`
	CreatedAt    string  `json:"created_at"`
	UpdatedAt    string  `json:"updated_at"`
}

type Session struct {
	ID        string
	CSRF      string
	ExpiresAt time.Time
}

type PersonalAccessToken struct {
	ID         string     `json:"id"`
	Name       string     `json:"name"`
	Prefix     string     `json:"prefix"`
	Scopes     []string   `json:"scopes"`
	CreatedAt  time.Time  `json:"created_at"`
	LastUsedAt *time.Time `json:"last_used_at,omitempty"`
	ExpiresAt  *time.Time `json:"expires_at,omitempty"`
	RevokedAt  *time.Time `json:"revoked_at,omitempty"`
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
			"CREATE TABLE jobs(id TEXT PRIMARY KEY, type TEXT NOT NULL, state TEXT NOT NULL, phase TEXT NOT NULL, repo_id TEXT NOT NULL, source_repository TEXT NOT NULL, source_revision TEXT NOT NULL, progress REAL NOT NULL, current_bytes INTEGER NOT NULL, total_bytes INTEGER NOT NULL, error TEXT NOT NULL, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL) WITHOUT ROWID",
			"CREATE INDEX jobs_updated ON jobs(updated_at DESC, id DESC)",
			"CREATE TABLE model_metadata(namespace TEXT NOT NULL, name TEXT NOT NULL, oid TEXT NOT NULL, kind TEXT NOT NULL, architecture TEXT NOT NULL, quantization TEXT NOT NULL, base_model TEXT NOT NULL, base_revision TEXT NOT NULL, source_repository TEXT NOT NULL, source_revision TEXT NOT NULL, validation_status TEXT NOT NULL, PRIMARY KEY(namespace,name,oid)) WITHOUT ROWID",
			"CREATE TABLE lfs_uploads(namespace TEXT NOT NULL,name TEXT NOT NULL,oid TEXT NOT NULL,size INTEGER NOT NULL,xet_hash TEXT NOT NULL,state TEXT NOT NULL,expires_at INTEGER NOT NULL,updated_at INTEGER NOT NULL,PRIMARY KEY(namespace,name,oid,size)) WITHOUT ROWID",
			"CREATE INDEX lfs_uploads_expiry ON lfs_uploads(expires_at,state)",
			"CREATE TABLE administrators(id TEXT PRIMARY KEY,password_hash TEXT NOT NULL,created_at INTEGER NOT NULL,updated_at INTEGER NOT NULL) WITHOUT ROWID",
			"INSERT INTO administrators(id,password_hash,created_at,updated_at) VALUES('local:administrator','',0,0)",
			"CREATE TABLE browser_sessions(verifier BLOB PRIMARY KEY,csrf TEXT NOT NULL,created_at INTEGER NOT NULL,expires_at INTEGER NOT NULL) WITHOUT ROWID",
			"CREATE INDEX browser_sessions_expiry ON browser_sessions(expires_at)",
			"CREATE TABLE personal_access_tokens(id TEXT PRIMARY KEY,name TEXT NOT NULL,prefix TEXT NOT NULL UNIQUE,verifier BLOB NOT NULL,scopes TEXT NOT NULL,created_at INTEGER NOT NULL,last_used_at INTEGER,expires_at INTEGER,revoked_at INTEGER) WITHOUT ROWID",
			"CREATE INDEX personal_access_tokens_created ON personal_access_tokens(created_at DESC)",
		}, 6); err != nil {
			return err
		}
		version = 6
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
		version = 3
	}
	if version == 3 {
		if err := s.applyMigration(ctx, []string{
			"CREATE TABLE administrators(id TEXT PRIMARY KEY,password_hash TEXT NOT NULL,created_at INTEGER NOT NULL,updated_at INTEGER NOT NULL) WITHOUT ROWID",
			"INSERT INTO administrators(id,password_hash,created_at,updated_at) VALUES('local:administrator','',0,0)",
			"CREATE TABLE browser_sessions(verifier BLOB PRIMARY KEY,csrf TEXT NOT NULL,created_at INTEGER NOT NULL,expires_at INTEGER NOT NULL) WITHOUT ROWID",
			"CREATE INDEX browser_sessions_expiry ON browser_sessions(expires_at)",
			"CREATE TABLE personal_access_tokens(id TEXT PRIMARY KEY,name TEXT NOT NULL,prefix TEXT NOT NULL UNIQUE,verifier BLOB NOT NULL,scopes TEXT NOT NULL,created_at INTEGER NOT NULL,last_used_at INTEGER,expires_at INTEGER,revoked_at INTEGER) WITHOUT ROWID",
			"CREATE INDEX personal_access_tokens_created ON personal_access_tokens(created_at DESC)",
		}, 4); err != nil {
			return err
		}
		version = 4
	}
	if version == 4 {
		if err := s.applyMigration(ctx, []string{
			"ALTER TABLE jobs ADD COLUMN phase TEXT NOT NULL DEFAULT 'Queued'",
			"UPDATE jobs SET phase=CASE state WHEN 'running' THEN 'Transferring' WHEN 'completed' THEN 'Completed' WHEN 'failed' THEN 'Failed' WHEN 'canceled' THEN 'Canceled' ELSE 'Queued' END",
		}, 5); err != nil {
			return err
		}
		version = 5
	}
	if version == 5 {
		if err := s.applyMigration(ctx, []string{
			"ALTER TABLE jobs ADD COLUMN source_repository TEXT NOT NULL DEFAULT ''",
			"ALTER TABLE jobs ADD COLUMN source_revision TEXT NOT NULL DEFAULT ''",
		}, 6); err != nil {
			return err
		}
	}
	_, err := s.db.ExecContext(ctx, "UPDATE jobs SET state='failed', phase='Failed', error='server restarted before the job completed', updated_at=? WHERE state IN ('queued','running')", time.Now().UTC().UnixNano())
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
	if err := s.db.QueryRowContext(ctx, "SELECT value FROM secrets WHERE name='admin-token-sha256'").Scan(&expected); errors.Is(err, sql.ErrNoRows) {
		return false, nil
	} else if err != nil {
		return false, err
	}
	actual := sha256.Sum256([]byte(token))
	return len(expected) == len(actual) && subtle.ConstantTimeCompare(expected, actual[:]) == 1, nil
}

func randomToken(prefix string, size int) (string, error) {
	raw := make([]byte, size)
	if _, err := rand.Read(raw); err != nil {
		return "", err
	}
	return prefix + hex.EncodeToString(raw), nil
}

func (s *Store) SetupRequired(ctx context.Context) (bool, error) {
	var hash string
	if err := s.db.QueryRowContext(ctx, "SELECT password_hash FROM administrators WHERE id=?", administratorID).Scan(&hash); err != nil {
		return false, err
	}
	return hash == "", nil
}

// EnsureBootstrapSecret returns a fresh setup secret once. Only its verifier is retained.
func (s *Store) EnsureBootstrapSecret(ctx context.Context) (string, bool, error) {
	required, err := s.SetupRequired(ctx)
	if err != nil || !required {
		return "", false, err
	}
	secret, err := randomToken("mf_setup_", 32)
	if err != nil {
		return "", false, err
	}
	verifier := sha256.Sum256([]byte(secret))
	result, err := s.db.ExecContext(ctx, "INSERT OR IGNORE INTO secrets(name,value,created_at) VALUES('bootstrap-secret-sha256',?,?)", verifier[:], time.Now().UTC().UnixNano())
	if err != nil {
		return "", false, err
	}
	rows, err := result.RowsAffected()
	if err != nil || rows == 0 {
		return "", false, err
	}
	return secret, true, nil
}

func hashPassword(password string) (string, error) {
	if len(password) < 12 {
		return "", errors.New("password must be at least 12 characters")
	}
	if len(password) > 1024 {
		return "", errors.New("password is too long")
	}
	salt := make([]byte, 16)
	if _, err := rand.Read(salt); err != nil {
		return "", err
	}
	key := argon2.IDKey([]byte(password), salt, passwordTime, passwordMemory, passwordThreads, passwordKeyLen)
	encoding := base64.RawStdEncoding
	return fmt.Sprintf("$argon2id$v=%d$m=%d,t=%d,p=%d$%s$%s", argon2.Version, passwordMemory, passwordTime, passwordThreads, encoding.EncodeToString(salt), encoding.EncodeToString(key)), nil
}

func verifyPasswordHash(encoded, password string) bool {
	parts := strings.Split(encoded, "$")
	if len(parts) != 6 || parts[1] != "argon2id" || parts[2] != "v=19" || !strings.HasPrefix(parts[3], "m=") {
		return false
	}
	parameters := strings.Split(parts[3], ",")
	if len(parameters) != 3 {
		return false
	}
	memory, memoryErr := strconv.ParseUint(strings.TrimPrefix(parameters[0], "m="), 10, 32)
	iterations, timeErr := strconv.ParseUint(strings.TrimPrefix(parameters[1], "t="), 10, 32)
	threads, threadsErr := strconv.ParseUint(strings.TrimPrefix(parameters[2], "p="), 10, 8)
	if memoryErr != nil || timeErr != nil || threadsErr != nil || memory < 8*1024 || memory > passwordMemory || iterations < 1 || iterations > passwordTime || threads < 1 || threads > 4 {
		return false
	}
	salt, saltErr := base64.RawStdEncoding.DecodeString(parts[4])
	expected, keyErr := base64.RawStdEncoding.DecodeString(parts[5])
	if saltErr != nil || keyErr != nil || len(salt) < 16 || len(salt) > 64 || len(expected) != passwordKeyLen {
		return false
	}
	actual := argon2.IDKey([]byte(password), salt, uint32(iterations), uint32(memory), uint8(threads), uint32(len(expected)))
	return subtle.ConstantTimeCompare(actual, expected) == 1
}

func (s *Store) CompleteSetup(ctx context.Context, credential, password string) error {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()
	var current string
	if err := tx.QueryRowContext(ctx, "SELECT password_hash FROM administrators WHERE id=?", administratorID).Scan(&current); err != nil {
		return err
	}
	if current != "" {
		return errors.New("administrator setup is already complete")
	}
	actual := sha256.Sum256([]byte(credential))
	valid := false
	for _, name := range []string{"bootstrap-secret-sha256", "admin-token-sha256"} {
		var expected []byte
		err := tx.QueryRowContext(ctx, "SELECT value FROM secrets WHERE name=?", name).Scan(&expected)
		if err == nil && len(expected) == len(actual) && subtle.ConstantTimeCompare(expected, actual[:]) == 1 {
			valid = true
		}
		if err != nil && !errors.Is(err, sql.ErrNoRows) {
			return err
		}
	}
	if !valid {
		return errors.New("invalid setup secret")
	}
	encoded, err := hashPassword(password)
	if err != nil {
		return err
	}
	now := time.Now().UTC().UnixNano()
	result, err := tx.ExecContext(ctx, "UPDATE administrators SET password_hash=?,updated_at=? WHERE id=? AND password_hash=''", encoded, now, administratorID)
	if err != nil {
		return err
	}
	updated, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if updated != 1 {
		return errors.New("administrator setup is already complete")
	}
	if _, err := tx.ExecContext(ctx, "DELETE FROM secrets WHERE name IN ('bootstrap-secret-sha256','admin-token-sha256')"); err != nil {
		return err
	}
	return tx.Commit()
}

func (s *Store) VerifyPassword(ctx context.Context, password string) (bool, error) {
	if password == "" || len(password) > 1024 {
		return false, nil
	}
	var encoded string
	if err := s.db.QueryRowContext(ctx, "SELECT password_hash FROM administrators WHERE id=?", administratorID).Scan(&encoded); err != nil {
		return false, err
	}
	return encoded != "" && verifyPasswordHash(encoded, password), nil
}

func (s *Store) ChangePassword(ctx context.Context, currentPassword, newPassword string) error {
	valid, err := s.VerifyPassword(ctx, currentPassword)
	if err != nil {
		return err
	}
	if !valid {
		return errors.New("current password is incorrect")
	}
	encoded, err := hashPassword(newPassword)
	if err != nil {
		return err
	}
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()
	if _, err := tx.ExecContext(ctx, "UPDATE administrators SET password_hash=?,updated_at=? WHERE id=?", encoded, time.Now().UTC().UnixNano(), administratorID); err != nil {
		return err
	}
	if _, err := tx.ExecContext(ctx, "DELETE FROM browser_sessions"); err != nil {
		return err
	}
	return tx.Commit()
}

func (s *Store) CreateSession(ctx context.Context, ttl time.Duration) (Session, error) {
	id, err := randomToken("", 32)
	if err != nil {
		return Session{}, err
	}
	csrf, err := randomToken("", 32)
	if err != nil {
		return Session{}, err
	}
	now := time.Now().UTC()
	expires := now.Add(ttl)
	verifier := sha256.Sum256([]byte(id))
	if _, err := s.db.ExecContext(ctx, "DELETE FROM browser_sessions WHERE expires_at<=?", now.UnixNano()); err != nil {
		return Session{}, err
	}
	if _, err := s.db.ExecContext(ctx, "INSERT INTO browser_sessions(verifier,csrf,created_at,expires_at) VALUES(?,?,?,?)", verifier[:], csrf, now.UnixNano(), expires.UnixNano()); err != nil {
		return Session{}, err
	}
	return Session{ID: id, CSRF: csrf, ExpiresAt: expires}, nil
}

func (s *Store) Session(ctx context.Context, id string) (Session, bool, error) {
	if len(id) != 64 {
		return Session{}, false, nil
	}
	verifier := sha256.Sum256([]byte(id))
	var csrf string
	var expires int64
	err := s.db.QueryRowContext(ctx, "SELECT csrf,expires_at FROM browser_sessions WHERE verifier=?", verifier[:]).Scan(&csrf, &expires)
	if errors.Is(err, sql.ErrNoRows) {
		return Session{}, false, nil
	}
	if err != nil {
		return Session{}, false, err
	}
	expiresAt := time.Unix(0, expires).UTC()
	if !expiresAt.After(time.Now()) {
		_, _ = s.db.ExecContext(ctx, "DELETE FROM browser_sessions WHERE verifier=?", verifier[:])
		return Session{}, false, nil
	}
	return Session{ID: id, CSRF: csrf, ExpiresAt: expiresAt}, true, nil
}

func (s *Store) DeleteSession(ctx context.Context, id string) error {
	verifier := sha256.Sum256([]byte(id))
	_, err := s.db.ExecContext(ctx, "DELETE FROM browser_sessions WHERE verifier=?", verifier[:])
	return err
}

func validScopes(scopes []string) (string, error) {
	seen := make(map[string]bool)
	for _, scope := range scopes {
		if scope != "read" && scope != "write" {
			return "", errors.New("token scopes must be read or write")
		}
		seen[scope] = true
	}
	if len(seen) == 0 {
		return "", errors.New("at least one token scope is required")
	}
	if seen["write"] {
		seen["read"] = true
	}
	values := make([]string, 0, 2)
	for _, scope := range []string{"read", "write"} {
		if seen[scope] {
			values = append(values, scope)
		}
	}
	return strings.Join(values, ","), nil
}

func (s *Store) CreatePersonalAccessToken(ctx context.Context, name string, scopes []string, expiresAt *time.Time) (PersonalAccessToken, string, error) {
	name = strings.TrimSpace(name)
	if name == "" || len(name) > 100 {
		return PersonalAccessToken{}, "", errors.New("token name must be between 1 and 100 characters")
	}
	scopeText, err := validScopes(scopes)
	if err != nil {
		return PersonalAccessToken{}, "", err
	}
	if expiresAt != nil && !expiresAt.After(time.Now()) {
		return PersonalAccessToken{}, "", errors.New("token expiration must be in the future")
	}
	id, err := randomToken("", 16)
	if err != nil {
		return PersonalAccessToken{}, "", err
	}
	prefix, err := randomToken("", 4)
	if err != nil {
		return PersonalAccessToken{}, "", err
	}
	secret, err := randomToken("", 32)
	if err != nil {
		return PersonalAccessToken{}, "", err
	}
	plain := "mf_pat_" + prefix + "_" + secret
	verifier := sha256.Sum256([]byte(plain))
	now := time.Now().UTC()
	var expiry any
	if expiresAt != nil {
		value := expiresAt.UTC()
		expiresAt = &value
		expiry = value.UnixNano()
	}
	_, err = s.db.ExecContext(ctx, "INSERT INTO personal_access_tokens(id,name,prefix,verifier,scopes,created_at,expires_at) VALUES(?,?,?,?,?,?,?)", id, name, prefix, verifier[:], scopeText, now.UnixNano(), expiry)
	if err != nil {
		return PersonalAccessToken{}, "", err
	}
	return PersonalAccessToken{ID: id, Name: name, Prefix: "mf_pat_" + prefix, Scopes: strings.Split(scopeText, ","), CreatedAt: now, ExpiresAt: expiresAt}, plain, nil
}

func nullableTime(value sql.NullInt64) *time.Time {
	if !value.Valid {
		return nil
	}
	parsed := time.Unix(0, value.Int64).UTC()
	return &parsed
}

func scanPersonalAccessToken(scanner interface{ Scan(...any) error }) (PersonalAccessToken, []byte, error) {
	var token PersonalAccessToken
	var scopes string
	var verifier []byte
	var created int64
	var lastUsed, expires, revoked sql.NullInt64
	err := scanner.Scan(&token.ID, &token.Name, &token.Prefix, &verifier, &scopes, &created, &lastUsed, &expires, &revoked)
	if err != nil {
		return PersonalAccessToken{}, nil, err
	}
	token.Prefix = "mf_pat_" + token.Prefix
	token.Scopes = strings.Split(scopes, ",")
	token.CreatedAt = time.Unix(0, created).UTC()
	token.LastUsedAt, token.ExpiresAt, token.RevokedAt = nullableTime(lastUsed), nullableTime(expires), nullableTime(revoked)
	return token, verifier, nil
}

const personalAccessTokenColumns = "id,name,prefix,verifier,scopes,created_at,last_used_at,expires_at,revoked_at"

func (s *Store) ListPersonalAccessTokens(ctx context.Context) ([]PersonalAccessToken, error) {
	rows, err := s.db.QueryContext(ctx, "SELECT "+personalAccessTokenColumns+" FROM personal_access_tokens ORDER BY created_at DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	tokens := make([]PersonalAccessToken, 0)
	for rows.Next() {
		token, _, err := scanPersonalAccessToken(rows)
		if err != nil {
			return nil, err
		}
		tokens = append(tokens, token)
	}
	return tokens, rows.Err()
}

func (s *Store) AuthenticatePersonalAccessToken(ctx context.Context, plain string) (PersonalAccessToken, bool, error) {
	parts := strings.Split(plain, "_")
	if len(parts) != 4 || parts[0] != "mf" || parts[1] != "pat" || len(parts[2]) != 8 || len(parts[3]) != 64 {
		return PersonalAccessToken{}, false, nil
	}
	token, expected, err := scanPersonalAccessToken(s.db.QueryRowContext(ctx, "SELECT "+personalAccessTokenColumns+" FROM personal_access_tokens WHERE prefix=?", parts[2]))
	if errors.Is(err, sql.ErrNoRows) {
		return PersonalAccessToken{}, false, nil
	}
	if err != nil {
		return PersonalAccessToken{}, false, err
	}
	actual := sha256.Sum256([]byte(plain))
	now := time.Now().UTC()
	if len(expected) != len(actual) || subtle.ConstantTimeCompare(expected, actual[:]) != 1 || token.RevokedAt != nil || (token.ExpiresAt != nil && !token.ExpiresAt.After(now)) {
		return PersonalAccessToken{}, false, nil
	}
	_, _ = s.db.ExecContext(ctx, "UPDATE personal_access_tokens SET last_used_at=? WHERE id=? AND (last_used_at IS NULL OR last_used_at<?)", now.UnixNano(), token.ID, now.Add(-5*time.Minute).UnixNano())
	return token, true, nil
}

func (s *Store) PersonalAccessTokenAllows(ctx context.Context, id string, write bool) (bool, error) {
	var scopes string
	var expires, revoked sql.NullInt64
	err := s.db.QueryRowContext(ctx, "SELECT scopes,expires_at,revoked_at FROM personal_access_tokens WHERE id=?", id).Scan(&scopes, &expires, &revoked)
	if errors.Is(err, sql.ErrNoRows) {
		return false, nil
	}
	if err != nil {
		return false, err
	}
	now := time.Now().UTC()
	if revoked.Valid || (expires.Valid && !time.Unix(0, expires.Int64).After(now)) {
		return false, nil
	}
	wanted := "read"
	if write {
		wanted = "write"
	}
	return slicesContains(strings.Split(scopes, ","), wanted), nil
}

func slicesContains(values []string, wanted string) bool {
	for _, value := range values {
		if value == wanted {
			return true
		}
	}
	return false
}

func (s *Store) RevokePersonalAccessToken(ctx context.Context, id string) (bool, error) {
	result, err := s.db.ExecContext(ctx, "UPDATE personal_access_tokens SET revoked_at=? WHERE id=? AND revoked_at IS NULL", time.Now().UTC().UnixNano(), id)
	if err != nil {
		return false, err
	}
	rows, err := result.RowsAffected()
	return rows == 1, err
}

// RecoverAdministrator invalidates every credential and starts a new one-time setup flow.
func (s *Store) RecoverAdministrator(ctx context.Context) (string, error) {
	secret, err := randomToken("mf_setup_", 32)
	if err != nil {
		return "", err
	}
	verifier := sha256.Sum256([]byte(secret))
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return "", err
	}
	defer tx.Rollback()
	now := time.Now().UTC().UnixNano()
	if _, err := tx.ExecContext(ctx, "UPDATE administrators SET password_hash='',updated_at=? WHERE id=?", now, administratorID); err != nil {
		return "", err
	}
	if _, err := tx.ExecContext(ctx, "DELETE FROM browser_sessions"); err != nil {
		return "", err
	}
	if _, err := tx.ExecContext(ctx, "UPDATE personal_access_tokens SET revoked_at=COALESCE(revoked_at,?)", now); err != nil {
		return "", err
	}
	if _, err := tx.ExecContext(ctx, "DELETE FROM secrets WHERE name IN ('bootstrap-secret-sha256','admin-token-sha256')"); err != nil {
		return "", err
	}
	if _, err := tx.ExecContext(ctx, "INSERT INTO secrets(name,value,created_at) VALUES('bootstrap-secret-sha256',?,?)", verifier[:], now); err != nil {
		return "", err
	}
	if err := tx.Commit(); err != nil {
		return "", err
	}
	return secret, nil
}

func NewJob(repoID, jobType string) Job {
	now := time.Now().UTC().Format(time.RFC3339Nano)
	bytes := make([]byte, 16)
	_, _ = rand.Read(bytes)
	return Job{ID: hex.EncodeToString(bytes), Type: jobType, State: "queued", Phase: "Queued", RepoID: repoID, CreatedAt: now, UpdatedAt: now}
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
	_, err = s.db.ExecContext(ctx, `INSERT INTO jobs(id,type,state,phase,repo_id,source_repository,source_revision,progress,current_bytes,total_bytes,error,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)
ON CONFLICT(id) DO UPDATE SET state=excluded.state,phase=excluded.phase,source_repository=excluded.source_repository,source_revision=excluded.source_revision,progress=excluded.progress,current_bytes=excluded.current_bytes,total_bytes=excluded.total_bytes,error=excluded.error,updated_at=excluded.updated_at`,
		job.ID, job.Type, job.State, job.Phase, job.RepoID, job.SourceRepo, job.SourceRev, job.Progress, job.CurrentBytes, job.TotalBytes, job.Error, created.UnixNano(), updated.UnixNano())
	return err
}

func (s *Store) UpdateJob(ctx context.Context, job *Job, stateValue string, progress float64, current, total int64, message string) error {
	updated := time.Now().UTC()
	result, err := s.db.ExecContext(ctx, `UPDATE jobs SET state=?,phase=CASE ? WHEN 'completed' THEN 'Completed' WHEN 'failed' THEN 'Failed' WHEN 'canceled' THEN 'Canceled' ELSE phase END,progress=?,current_bytes=?,total_bytes=?,error=?,updated_at=? WHERE id=? AND state IN ('queued','running')`,
		stateValue, stateValue, progress, current, total, message, updated.UnixNano(), job.ID)
	if err != nil {
		return err
	}
	changed, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if changed == 1 {
		job.State, job.Progress, job.CurrentBytes, job.TotalBytes, job.Error = stateValue, progress, current, total, message
		if stateValue == "completed" || stateValue == "failed" || stateValue == "canceled" {
			job.Phase = strings.ToUpper(stateValue[:1]) + stateValue[1:]
		}
		job.UpdatedAt = updated.Format(time.RFC3339Nano)
	}
	return nil
}

func (s *Store) SetJobPhase(ctx context.Context, job *Job, phase string) error {
	if phase == "" || len(phase) > 80 {
		return errors.New("job phase is invalid")
	}
	updated := time.Now().UTC()
	result, err := s.db.ExecContext(ctx, "UPDATE jobs SET phase=?,updated_at=? WHERE id=? AND state IN ('queued','running')", phase, updated.UnixNano(), job.ID)
	if err != nil {
		return err
	}
	changed, err := result.RowsAffected()
	if err == nil && changed == 1 {
		job.Phase = phase
		job.UpdatedAt = updated.Format(time.RFC3339Nano)
	}
	return err
}

func (s *Store) SetJobSource(ctx context.Context, job *Job, repository, revision string) error {
	if len(repository) > 256 || len(revision) > 512 {
		return errors.New("job source is invalid")
	}
	updated := time.Now().UTC()
	result, err := s.db.ExecContext(ctx, "UPDATE jobs SET source_repository=?,source_revision=?,updated_at=? WHERE id=? AND state IN ('queued','running')", repository, revision, updated.UnixNano(), job.ID)
	if err != nil {
		return err
	}
	changed, err := result.RowsAffected()
	if err == nil && changed == 1 {
		job.SourceRepo = repository
		job.SourceRev = revision
		job.UpdatedAt = updated.Format(time.RFC3339Nano)
	}
	return err
}

func (s *Store) ListJobs(ctx context.Context) ([]Job, error) {
	rows, err := s.db.QueryContext(ctx, "SELECT id,type,state,phase,repo_id,source_repository,source_revision,progress,current_bytes,total_bytes,error,created_at,updated_at FROM jobs ORDER BY updated_at DESC,id DESC LIMIT 500")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	jobs := make([]Job, 0)
	for rows.Next() {
		var job Job
		var created, updated int64
		if err := rows.Scan(&job.ID, &job.Type, &job.State, &job.Phase, &job.RepoID, &job.SourceRepo, &job.SourceRev, &job.Progress, &job.CurrentBytes, &job.TotalBytes, &job.Error, &created, &updated); err != nil {
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
	err := s.db.QueryRowContext(ctx, "SELECT id,type,state,phase,repo_id,source_repository,source_revision,progress,current_bytes,total_bytes,error,created_at,updated_at FROM jobs WHERE id=?", id).
		Scan(&job.ID, &job.Type, &job.State, &job.Phase, &job.RepoID, &job.SourceRepo, &job.SourceRev, &job.Progress, &job.CurrentBytes, &job.TotalBytes, &job.Error, &created, &updated)
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
	result, err := s.db.ExecContext(ctx, "UPDATE jobs SET state='canceled', phase='Canceled', error='', updated_at=? WHERE id=? AND state IN ('queued','running')", now.UnixNano(), id)
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
