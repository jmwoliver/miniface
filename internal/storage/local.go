package storage

import (
	"context"
	"errors"
	"fmt"
	"io/fs"
	"net/http"
	"os"
	"path/filepath"
	"runtime"
	"strconv"
	"strings"
	"sync"
	"syscall"
	"time"

	"github.com/jmwoliver/miniface/internal/capability"
	"github.com/jmwoliver/miniface/internal/config"
	"github.com/jmwoliver/miniface/internal/state"
	"github.com/jmwoliver/xet-go/auth"
	"github.com/jmwoliver/xet-go/bucket/hosted"
	"github.com/jmwoliver/xet-go/catalog"
	catalogsqlite "github.com/jmwoliver/xet-go/catalog/sqlite"
	contentfs "github.com/jmwoliver/xet-go/content/filesystem"
	"github.com/jmwoliver/xet-go/model"
	casserver "github.com/jmwoliver/xet-go/xetcas/server"
)

type Local struct {
	service           *hosted.Service
	catalog           *catalogsqlite.Store
	ordinary          *contentfs.Store
	blobs             *casserver.FilesystemBlobStore
	index             *casserver.SQLiteIndexStore
	state             *state.Store
	tokens            *auth.CASTokenManager
	capabilities      *capability.Service
	casBaseURL        string
	dataDir           string
	importRoots       []string
	xetThreshold      int64
	importSlots       chan struct{}
	huggingFaceURL    string
	huggingFaceClient *http.Client
	jobContext        context.Context
	cancelJobs        context.CancelFunc
	jobMu             sync.Mutex
	jobCancels        map[string]context.CancelCauseFunc
	jobs              sync.WaitGroup
}

type OpenResult struct {
	Storage        *Local
	SetupSecret    string
	SetupSecretNew bool
}

func Open(ctx context.Context, cfg config.Config) (OpenResult, error) {
	if cfg.XetThreshold == 0 {
		cfg.XetThreshold = config.DefaultXetThreshold
	}
	if err := ensurePrivateDirectory(cfg.DataDir); err != nil {
		return OpenResult{}, err
	}
	app, err := state.Open(filepath.Join(cfg.DataDir, "miniface.sqlite"))
	if err != nil {
		return OpenResult{}, fmt.Errorf("open application database: %w", err)
	}
	closeApp := true
	defer func() {
		if closeApp {
			_ = app.Close()
		}
	}()
	setupSecret, setupSecretNew, err := app.EnsureBootstrapSecret(ctx)
	if err != nil {
		return OpenResult{}, fmt.Errorf("initialize administrator setup: %w", err)
	}
	capabilityKey, _, err := app.GetOrCreateSecret(ctx, "range-capability-hmac", 32)
	if err != nil {
		return OpenResult{}, fmt.Errorf("initialize range signing key: %w", err)
	}
	casTokenKey, _, err := app.GetOrCreateSecret(ctx, "cas-token-hmac", 32)
	if err != nil {
		return OpenResult{}, fmt.Errorf("initialize CAS signing key: %w", err)
	}
	lfsKey, _, err := app.GetOrCreateSecret(ctx, "lfs-capability-hmac", 32)
	if err != nil {
		return OpenResult{}, fmt.Errorf("initialize LFS signing key: %w", err)
	}

	catalogStore, err := catalogsqlite.Open(filepath.Join(cfg.DataDir, "catalog.sqlite"))
	if err != nil {
		return OpenResult{}, fmt.Errorf("open repository catalog: %w", err)
	}
	ordinary, err := contentfs.Open(filepath.Join(cfg.DataDir, "ordinary"))
	if err != nil {
		_ = catalogStore.Close()
		return OpenResult{}, fmt.Errorf("open ordinary content store: %w", err)
	}
	blobs, err := casserver.NewFilesystemBlobStore(filepath.Join(cfg.DataDir, "xet-objects"))
	if err != nil {
		_ = ordinary.Close()
		_ = catalogStore.Close()
		return OpenResult{}, fmt.Errorf("open Xet object store: %w", err)
	}
	index, err := casserver.OpenSQLiteIndexStore(filepath.Join(cfg.DataDir, "xet-index.sqlite"))
	if err != nil {
		_ = blobs.Close()
		_ = ordinary.Close()
		_ = catalogStore.Close()
		return OpenResult{}, fmt.Errorf("open Xet index: %w", err)
	}
	cleanup := true
	defer func() {
		if cleanup {
			_ = index.Close()
			_ = blobs.Close()
			_ = ordinary.Close()
			_ = catalogStore.Close()
		}
	}()

	baseURL := strings.TrimSuffix(cfg.BaseURL.String(), "/")
	casBaseURL := baseURL + "/cas"
	capabilities, err := capability.New(blobs, baseURL+"/objects", capabilityKey)
	if err != nil {
		return OpenResult{}, err
	}
	tokens, err := auth.NewCASTokenManager(auth.CASTokenManagerOptions{
		Issuer: "miniface", Audience: casBaseURL,
		SigningKey: auth.HMACKey{ID: "local-v1", Secret: casTokenKey},
		DefaultTTL: 15 * time.Minute, MaximumTTL: time.Hour,
	})
	if err != nil {
		return OpenResult{}, fmt.Errorf("initialize CAS tokens: %w", err)
	}
	authenticator := auth.HubAuthenticatorFunc(func(ctx context.Context, credential string) (auth.Principal, error) {
		token, valid, err := app.AuthenticatePersonalAccessToken(ctx, credential)
		if err != nil {
			return auth.Principal{}, auth.ErrUnavailable
		}
		if valid {
			return auth.Principal{Subject: "local:administrator:pat:" + token.ID}, nil
		}
		setupRequired, err := app.SetupRequired(ctx)
		if err != nil {
			return auth.Principal{}, auth.ErrUnavailable
		}
		if setupRequired {
			legacyValid, err := app.VerifyAdminToken(ctx, credential)
			if err != nil {
				return auth.Principal{}, auth.ErrUnavailable
			}
			if legacyValid {
				return auth.Principal{Subject: "local:administrator:legacy"}, nil
			}
		}
		return auth.Principal{}, auth.ErrUnauthenticated
	})
	authorizer := auth.RepositoryAuthorizerFunc(func(ctx context.Context, access auth.RepositoryAccess) error {
		if access.Principal.Subject == "local:administrator:legacy" {
			return nil
		}
		const prefix = "local:administrator:pat:"
		if !strings.HasPrefix(access.Principal.Subject, prefix) {
			return auth.ErrPermissionDenied
		}
		allowed, err := app.PersonalAccessTokenAllows(ctx, strings.TrimPrefix(access.Principal.Subject, prefix), access.Permission == auth.RepositoryWrite)
		if err != nil {
			return auth.ErrUnavailable
		}
		if !allowed {
			return auth.ErrPermissionDenied
		}
		if access.Permission == auth.RepositoryWrite {
			return nil
		}
		_, err = catalogStore.GetRepository(ctx, access.Repository)
		if errors.Is(err, catalog.ErrNotFound) {
			return auth.ErrPermissionDenied
		}
		if err != nil {
			return auth.ErrUnavailable
		}
		return nil
	})
	service, err := hosted.New(hosted.Options{
		Catalog: catalogStore, Content: ordinary,
		CAS:              casserver.Options{Blobs: blobs, Index: index, Signer: capabilities},
		HubAuthenticator: authenticator, RepositoryAuthorizer: authorizer, CASTokens: tokens,
		LFSIngester: newLFSIngester(tokens, casBaseURL),
		HubBaseURL:  baseURL, CASBaseURL: casBaseURL,
		LargeFileThreshold: cfg.XetThreshold, LFSUploadCapabilityKey: lfsKey,
	})
	if err != nil {
		return OpenResult{}, fmt.Errorf("compose local Xet service: %w", err)
	}

	jobContext, cancelJobs := context.WithCancel(context.Background())
	cleanup, closeApp = false, false
	return OpenResult{Storage: &Local{
		service: service, catalog: catalogStore, ordinary: ordinary, blobs: blobs, index: index,
		state: app, tokens: tokens, capabilities: capabilities, casBaseURL: casBaseURL, dataDir: cfg.DataDir,
		importRoots: append([]string(nil), cfg.ImportRoots...), xetThreshold: cfg.XetThreshold,
		importSlots: make(chan struct{}, 1), huggingFaceURL: "https://huggingface.co",
		huggingFaceClient: newHuggingFaceHTTPClient(), jobContext: jobContext, cancelJobs: cancelJobs,
		jobCancels: make(map[string]context.CancelCauseFunc),
	}, SetupSecret: setupSecret, SetupSecretNew: setupSecretNew}, nil
}

func ensurePrivateDirectory(path string) error {
	info, err := os.Lstat(path)
	if errors.Is(err, os.ErrNotExist) {
		if err := os.MkdirAll(path, 0o700); err != nil {
			return fmt.Errorf("create data directory: %w", err)
		}
		info, err = os.Lstat(path)
	}
	if err != nil {
		return fmt.Errorf("inspect data directory: %w", err)
	}
	if !info.IsDir() || info.Mode()&os.ModeSymlink != 0 {
		return errors.New("data directory must be a real directory")
	}
	if err := os.Chmod(path, 0o700); err != nil {
		return fmt.Errorf("protect data directory: %w", err)
	}
	return nil
}

func (l *Local) Close() error {
	l.StopJobs()
	l.jobs.Wait()
	return errors.Join(l.index.Close(), l.blobs.Close(), l.ordinary.Close(), l.catalog.Close(), l.state.Close())
}

func (l *Local) StopJobs() { l.cancelJobs() }

var (
	errJobCanceled      = errors.New("job canceled by user")
	ErrJobNotFound      = errors.New("job not found")
	ErrJobNotCancelable = errors.New("job cannot be canceled")
)

func (l *Local) newJobContext(jobID string) (context.Context, func()) {
	timed, stopTimeout := context.WithTimeout(l.jobContext, 24*time.Hour)
	ctx, cancel := context.WithCancelCause(timed)
	l.jobMu.Lock()
	l.jobCancels[jobID] = cancel
	l.jobMu.Unlock()
	return ctx, func() {
		cancel(nil)
		stopTimeout()
		l.jobMu.Lock()
		delete(l.jobCancels, jobID)
		l.jobMu.Unlock()
	}
}

func (l *Local) CancelJob(ctx context.Context, jobID string) (state.Job, error) {
	l.jobMu.Lock()
	cancel, active := l.jobCancels[jobID]
	if active {
		cancel(errJobCanceled)
	}
	l.jobMu.Unlock()
	job, changed, err := l.state.CancelJob(ctx, jobID)
	if err != nil {
		return state.Job{}, err
	}
	if job.ID == "" {
		return state.Job{}, ErrJobNotFound
	}
	if !changed && job.State != "canceled" {
		return state.Job{}, fmt.Errorf("%w: job is already %s", ErrJobNotCancelable, job.State)
	}
	return job, nil
}

func (l *Local) finishJob(ctx context.Context, job *state.Job, err error) {
	if err == nil {
		return
	}
	if errors.Is(context.Cause(ctx), errJobCanceled) {
		_ = l.state.UpdateJob(context.Background(), job, "canceled", job.Progress, job.CurrentBytes, job.TotalBytes, "")
		return
	}
	_ = l.state.UpdateJob(context.Background(), job, "failed", job.Progress, job.CurrentBytes, job.TotalBytes, err.Error())
}

func availableStorageBytes(path string) (uint64, error) {
	var stats syscall.Statfs_t
	if err := syscall.Statfs(path, &stats); err != nil {
		return 0, err
	}
	return stats.Bavail * uint64(stats.Bsize), nil
}

func (l *Local) AvailableStorageBytes() (uint64, error) {
	return availableStorageBytes(l.dataDir)
}

func availableMemoryBytes() (uint64, bool) {
	if runtime.GOOS != "linux" {
		return 0, false
	}
	body, err := os.ReadFile("/proc/meminfo")
	if err != nil {
		return 0, false
	}
	for _, line := range strings.Split(string(body), "\n") {
		fields := strings.Fields(line)
		if len(fields) != 3 || fields[0] != "MemAvailable:" || fields[2] != "kB" {
			continue
		}
		kilobytes, err := strconv.ParseUint(fields[1], 10, 64)
		if err != nil || kilobytes > ^uint64(0)/1024 {
			return 0, false
		}
		return kilobytes * 1024, true
	}
	return 0, false
}

func (l *Local) HubHandler() http.Handler    { return l.service.HubHandler() }
func (l *Local) CASHandler() http.Handler    { return l.service.CASHandler() }
func (l *Local) ObjectHandler() http.Handler { return l.capabilities }
func (l *Local) State() *state.Store         { return l.state }
func (l *Local) Ready(ctx context.Context) error {
	_, err := l.service.ListRepositories(ctx, catalog.RepositoryQuery{Type: model.RepoTypeModel, Limit: 1})
	return err
}

func (l *Local) importRoot(source string) (string, error) {
	info, err := os.Lstat(source)
	if err != nil {
		return "", err
	}
	if info.Mode()&os.ModeSymlink != 0 || !info.IsDir() {
		return "", errors.New("import source must be a real directory, not a symlink")
	}
	canonical, err := filepath.EvalSymlinks(source)
	if err != nil {
		return "", err
	}
	canonical, err = filepath.Abs(canonical)
	if err != nil {
		return "", err
	}
	for _, allowed := range l.importRoots {
		allowedCanonical, err := filepath.EvalSymlinks(allowed)
		if err != nil {
			continue
		}
		relative, err := filepath.Rel(allowedCanonical, canonical)
		if err == nil && relative != ".." && !strings.HasPrefix(relative, ".."+string(filepath.Separator)) {
			return canonical, nil
		}
	}
	return "", fmt.Errorf("import source is outside configured roots: %s", strings.Join(l.importRoots, ", "))
}

func walkImport(root *os.Root) ([]sourceFile, int64, error) {
	files := make([]sourceFile, 0)
	var total int64
	err := fs.WalkDir(root.FS(), ".", func(path string, entry fs.DirEntry, walkErr error) error {
		if walkErr != nil {
			return walkErr
		}
		if path == "." {
			return nil
		}
		if entry.Type()&os.ModeSymlink != 0 {
			return fmt.Errorf("symlinks are not allowed: %s", path)
		}
		if entry.IsDir() {
			if entry.Name() == ".git" || entry.Name() == ".cache" {
				return fmt.Errorf("reserved directory is not importable: %s", path)
			}
			return nil
		}
		info, err := entry.Info()
		if err != nil {
			return err
		}
		if !info.Mode().IsRegular() {
			return fmt.Errorf("special files are not allowed: %s", path)
		}
		modelPath := filepath.ToSlash(path)
		if _, err := model.ParseFilePath(modelPath); err != nil {
			return err
		}
		if info.Size() < 0 || total > (1<<63-1)-info.Size() {
			return errors.New("import size overflow")
		}
		total += info.Size()
		files = append(files, sourceFile{path: modelPath, info: info})
		return nil
	})
	return files, total, err
}

type sourceFile struct {
	path string
	info fs.FileInfo
}
