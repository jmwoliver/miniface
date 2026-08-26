package server

import (
	"errors"
	"fmt"
	"io"
	"mime"
	"net/http"
	"path/filepath"
	"runtime"
	"runtime/debug"
	"strconv"
	"strings"
	"time"

	"github.com/jmwoliver/miniface/internal/state"
	"github.com/jmwoliver/miniface/internal/storage"
	"github.com/jmwoliver/xet-go/bucket"
	"github.com/jmwoliver/xet-go/content"
)

// minifaceVersion is set by release builds and falls back to Go module build
// information for versioned installs.
var minifaceVersion = "development"

type sessionResponse struct {
	Authenticated bool   `json:"authenticated"`
	SetupRequired bool   `json:"setup_required"`
	CSRFToken     string `json:"csrf_token,omitempty"`
	Username      string `json:"username,omitempty"`
}

func (s *Server) serveAPI(w http.ResponseWriter, r *http.Request) {
	endpoint := strings.TrimPrefix(r.URL.Path, "/api/miniface/v1")
	if endpoint == "/session" {
		s.serveSession(w, r)
		return
	}
	if endpoint == "/setup" {
		s.serveSetup(w, r)
		return
	}
	_, current, ok, err := s.currentSession(r)
	if err != nil {
		s.internalError(w, err)
		return
	}
	if !ok {
		writeError(w, http.StatusUnauthorized, "authentication required")
		return
	}
	if r.Method == http.MethodPost || r.Method == http.MethodPut || r.Method == http.MethodPatch || r.Method == http.MethodDelete {
		if !constantEqual(r.Header.Get("X-CSRF-Token"), current.CSRF) {
			writeError(w, http.StatusForbidden, "invalid CSRF token")
			return
		}
	}
	switch {
	case endpoint == "/models" && r.Method == http.MethodGet:
		models, err := s.storage.Models(r.Context())
		if err != nil {
			s.internalError(w, err)
			return
		}
		writeJSON(w, http.StatusOK, map[string]any{"models": models})
	case endpoint == "/jobs" && r.Method == http.MethodGet:
		jobs, err := s.storage.State().ListJobs(r.Context())
		if err != nil {
			s.internalError(w, err)
			return
		}
		writeJSON(w, http.StatusOK, map[string]any{"jobs": jobs})
	case jobDetailID(endpoint) != "" && r.Method == http.MethodGet:
		job, found, err := s.storage.State().Job(r.Context(), jobDetailID(endpoint))
		if err != nil {
			s.internalError(w, err)
		} else if !found {
			writeError(w, http.StatusNotFound, "job not found")
		} else {
			writeJSON(w, http.StatusOK, map[string]any{"job": job})
		}
	case jobCancelID(endpoint) != "" && r.Method == http.MethodPost:
		job, err := s.storage.CancelJob(r.Context(), jobCancelID(endpoint))
		switch {
		case errors.Is(err, storage.ErrJobNotFound):
			writeError(w, http.StatusNotFound, "job not found")
		case errors.Is(err, storage.ErrJobNotCancelable):
			writeError(w, http.StatusConflict, err.Error())
		case err != nil:
			s.internalError(w, err)
		default:
			writeJSON(w, http.StatusOK, map[string]any{"job": job})
		}
	case endpoint == "/storage" && r.Method == http.MethodGet:
		stats, err := s.storage.Stats(r.Context())
		if err != nil {
			s.internalError(w, err)
			return
		}
		writeJSON(w, http.StatusOK, stats)
	case endpoint == "/server" && r.Method == http.MethodGet:
		availableBytes, err := s.storage.AvailableStorageBytes()
		if err != nil {
			s.internalError(w, err)
			return
		}
		version := minifaceVersion
		if version == "development" {
			if build, ok := debug.ReadBuildInfo(); ok && build.Main.Version != "" && build.Main.Version != "(devel)" {
				version = build.Main.Version
			}
		}
		writeJSON(w, http.StatusOK, map[string]any{
			"endpoint": s.config.BaseURL.String(), "listen": s.config.Listen, "secure": s.secure,
			"remote_access": s.config.AllowRemote,
			"storage": map[string]any{
				"profile": "local", "metadata_database": "SQLite", "object_storage": "filesystem",
				"data_directory": s.config.DataDir, "xet_threshold_bytes": s.config.XetThreshold, "available_bytes": availableBytes,
			},
			"runtime": map[string]string{"miniface_version": version, "go_version": runtime.Version(), "os": runtime.GOOS, "arch": runtime.GOARCH},
		})
	case endpoint == "/settings/tokens" && r.Method == http.MethodGet:
		tokens, err := s.storage.State().ListPersonalAccessTokens(r.Context())
		if err != nil {
			s.internalError(w, err)
			return
		}
		writeJSON(w, http.StatusOK, map[string]any{"tokens": tokens})
	case endpoint == "/settings/tokens" && r.Method == http.MethodPost:
		s.serveCreateToken(w, r)
	case tokenRevokeID(endpoint) != "" && r.Method == http.MethodDelete:
		revoked, err := s.storage.State().RevokePersonalAccessToken(r.Context(), tokenRevokeID(endpoint))
		if err != nil {
			s.internalError(w, err)
		} else if !revoked {
			writeError(w, http.StatusNotFound, "active token not found")
		} else {
			writeJSON(w, http.StatusOK, map[string]bool{"revoked": true})
		}
	case endpoint == "/settings/password" && r.Method == http.MethodPut:
		s.serveChangePassword(w, r)
	case endpoint == "/huggingface/models" && r.Method == http.MethodGet:
		query := r.URL.Query().Get("search")
		if len(query) > 200 {
			writeError(w, http.StatusBadRequest, "Hugging Face search must be at most 200 characters")
			return
		}
		models, err := s.storage.SearchHuggingFaceModels(r.Context(), query)
		if err != nil {
			writeError(w, http.StatusBadGateway, err.Error())
			return
		}
		writeJSON(w, http.StatusOK, map[string]any{"models": models})
	case endpoint == "/imports/huggingface" && r.Method == http.MethodPost:
		var request struct {
			SourceRepoID      string `json:"source_repo_id"`
			SourceRevision    string `json:"source_revision"`
			DestinationRepoID string `json:"destination_repo_id"`
			Message           string `json:"message"`
			Token             string `json:"token"`
		}
		if decodeJSON(w, r, &request, 64<<10) != nil {
			return
		}
		job, err := s.storage.StartHuggingFaceImport(r.Context(), request.SourceRepoID, request.SourceRevision, request.DestinationRepoID, request.Message, request.Token)
		if err != nil {
			writeError(w, http.StatusBadRequest, err.Error())
			return
		}
		writeJSON(w, http.StatusAccepted, map[string]any{"job": job})
	case endpoint == "/imports" && r.Method == http.MethodPost:
		var request struct {
			Path    string `json:"path"`
			RepoID  string `json:"repo_id"`
			Message string `json:"message"`
		}
		if decodeJSON(w, r, &request, 64<<10) != nil {
			return
		}
		job, err := s.storage.StartImport(r.Context(), request.Path, request.RepoID, request.Message)
		if err != nil {
			writeError(w, http.StatusBadRequest, err.Error())
			return
		}
		writeJSON(w, http.StatusAccepted, map[string]any{"job": job})
	case strings.HasPrefix(endpoint, "/models/"):
		s.serveModelAPI(w, r, strings.TrimPrefix(endpoint, "/models/"))
	default:
		if r.Method != http.MethodGet && r.Method != http.MethodPost && r.Method != http.MethodPut && r.Method != http.MethodDelete {
			writeError(w, http.StatusMethodNotAllowed, "method not allowed")
		} else {
			http.NotFound(w, r)
		}
	}
}

func jobDetailID(endpoint string) string {
	parts := strings.Split(strings.Trim(endpoint, "/"), "/")
	if len(parts) != 2 || parts[0] != "jobs" || !validHexID(parts[1], 32) {
		return ""
	}
	return parts[1]
}

func validHexID(value string, length int) bool {
	if len(value) != length {
		return false
	}
	for _, char := range value {
		if !strings.ContainsRune("0123456789abcdef", char) {
			return false
		}
	}
	return true
}

func jobCancelID(endpoint string) string {
	parts := strings.Split(strings.Trim(endpoint, "/"), "/")
	if len(parts) != 3 || parts[0] != "jobs" || parts[2] != "cancel" || !validHexID(parts[1], 32) {
		return ""
	}
	return parts[1]
}

func tokenRevokeID(endpoint string) string {
	parts := strings.Split(strings.Trim(endpoint, "/"), "/")
	if len(parts) != 3 || parts[0] != "settings" || parts[1] != "tokens" || !validHexID(parts[2], 32) {
		return ""
	}
	return parts[2]
}

func (s *Server) serveModelAPI(w http.ResponseWriter, r *http.Request, suffix string) {
	parts := strings.Split(suffix, "/")
	if len(parts) == 2 && r.Method == http.MethodGet {
		detail, err := s.storage.ModelRevision(r.Context(), parts[0], parts[1], r.URL.Query().Get("revision"))
		if err != nil {
			s.storageError(w, err)
			return
		}
		writeJSON(w, http.StatusOK, detail)
		return
	}
	if len(parts) == 3 && parts[2] == "file" && r.Method == http.MethodGet {
		preview, err := s.storage.PreviewModelFile(r.Context(), parts[0], parts[1], r.URL.Query().Get("revision"), r.URL.Query().Get("path"))
		if err != nil {
			s.storageError(w, err)
			return
		}
		w.Header().Set("Cache-Control", "private, no-store")
		writeJSON(w, http.StatusOK, preview)
		return
	}
	if len(parts) == 3 && parts[2] == "download" && r.Method == http.MethodGet {
		s.serveModelDownload(w, r, parts[0], parts[1])
		return
	}
	if len(parts) == 3 && parts[2] == "card" && r.Method == http.MethodPut {
		var request struct {
			Content string `json:"content"`
			Message string `json:"message"`
		}
		if decodeJSON(w, r, &request, 3<<20) != nil {
			return
		}
		detail, err := s.storage.SaveCard(r.Context(), parts[0], parts[1], request.Content, request.Message)
		if err != nil {
			s.storageError(w, err)
			return
		}
		writeJSON(w, http.StatusOK, detail)
		return
	}
	http.NotFound(w, r)
}

func parseByteRange(value string, size int64) (*content.Range, error) {
	if value == "" {
		return nil, nil
	}
	if !strings.HasPrefix(value, "bytes=") || strings.Contains(value, ",") || size <= 0 {
		return nil, content.ErrRangeNotSatisfiable
	}
	parts := strings.Split(strings.TrimPrefix(value, "bytes="), "-")
	if len(parts) != 2 {
		return nil, content.ErrRangeNotSatisfiable
	}
	var start, end int64
	if parts[0] == "" {
		suffix, err := strconv.ParseInt(parts[1], 10, 64)
		if err != nil || suffix <= 0 {
			return nil, content.ErrRangeNotSatisfiable
		}
		if suffix > size {
			suffix = size
		}
		start, end = size-suffix, size
	} else {
		parsedStart, err := strconv.ParseInt(parts[0], 10, 64)
		if err != nil || parsedStart < 0 || parsedStart >= size {
			return nil, content.ErrRangeNotSatisfiable
		}
		start = parsedStart
		if parts[1] == "" {
			end = size
		} else {
			inclusiveEnd, err := strconv.ParseInt(parts[1], 10, 64)
			if err != nil || inclusiveEnd < start {
				return nil, content.ErrRangeNotSatisfiable
			}
			if inclusiveEnd >= size {
				inclusiveEnd = size - 1
			}
			end = inclusiveEnd + 1
		}
	}
	return &content.Range{Start: start, End: end}, nil
}

func (s *Server) serveModelDownload(w http.ResponseWriter, r *http.Request, owner, name string) {
	revision, filePath := r.URL.Query().Get("revision"), r.URL.Query().Get("path")
	metadata, err := s.storage.OpenModelFile(r.Context(), owner, name, revision, filePath, nil)
	if err != nil {
		s.storageError(w, err)
		return
	}
	size := metadata.FileSize
	_ = metadata.Body.Close()
	selected, err := parseByteRange(r.Header.Get("Range"), size)
	if err != nil {
		w.Header().Set("Content-Range", fmt.Sprintf("bytes */%d", size))
		writeError(w, http.StatusRequestedRangeNotSatisfiable, "requested range is not satisfiable")
		return
	}
	opened, err := s.storage.OpenModelFile(r.Context(), owner, name, revision, filePath, selected)
	if err != nil {
		s.storageError(w, err)
		return
	}
	defer opened.Body.Close()
	contentType := opened.ContentType
	if contentType == "" {
		contentType = mime.TypeByExtension(filepath.Ext(filePath))
	}
	if contentType == "" {
		contentType = "application/octet-stream"
	}
	w.Header().Set("Content-Type", contentType)
	w.Header().Set("Content-Disposition", mime.FormatMediaType("attachment", map[string]string{"filename": filepath.Base(filePath)}))
	w.Header().Set("Content-Length", strconv.FormatInt(opened.Size, 10))
	w.Header().Set("Accept-Ranges", "bytes")
	w.Header().Set("ETag", `"`+opened.ETag+`"`)
	w.Header().Set("Cache-Control", "private, no-store")
	status := http.StatusOK
	if selected != nil {
		status = http.StatusPartialContent
		w.Header().Set("Content-Range", fmt.Sprintf("bytes %d-%d/%d", opened.Range.Start, opened.Range.End-1, opened.FileSize))
	}
	w.WriteHeader(status)
	_, _ = io.Copy(w, opened.Body)
}

func (s *Server) serveSession(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		setupRequired, err := s.storage.State().SetupRequired(r.Context())
		if err != nil {
			s.internalError(w, err)
			return
		}
		_, current, ok, err := s.currentSession(r)
		if err != nil {
			s.internalError(w, err)
			return
		}
		if !ok {
			writeJSON(w, http.StatusOK, sessionResponse{Authenticated: false, SetupRequired: setupRequired})
			return
		}
		writeJSON(w, http.StatusOK, sessionResponse{Authenticated: true, CSRFToken: current.CSRF, Username: "Administrator"})
	case http.MethodPost:
		var request struct {
			Password string `json:"password"`
		}
		if decodeJSON(w, r, &request, 4<<10) != nil {
			return
		}
		valid, err := s.storage.State().VerifyPassword(r.Context(), request.Password)
		if err != nil {
			s.internalError(w, err)
			return
		}
		if !valid {
			writeError(w, http.StatusUnauthorized, "invalid password")
			return
		}
		s.createBrowserSession(w, r)
	case http.MethodDelete:
		id, current, ok, err := s.currentSession(r)
		if err != nil {
			s.internalError(w, err)
			return
		}
		if !ok {
			writeJSON(w, http.StatusOK, sessionResponse{Authenticated: false})
			return
		}
		if !constantEqual(r.Header.Get("X-CSRF-Token"), current.CSRF) {
			writeError(w, http.StatusForbidden, "invalid CSRF token")
			return
		}
		if err := s.storage.State().DeleteSession(r.Context(), id); err != nil {
			s.internalError(w, err)
			return
		}
		http.SetCookie(w, &http.Cookie{Name: sessionCookie, Value: "", Path: "/", MaxAge: -1, HttpOnly: true, Secure: s.secure, SameSite: http.SameSiteStrictMode})
		writeJSON(w, http.StatusOK, sessionResponse{Authenticated: false})
	default:
		w.Header().Set("Allow", "GET, POST, DELETE")
		writeError(w, http.StatusMethodNotAllowed, "method not allowed")
	}
}

func (s *Server) serveSetup(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.Header().Set("Allow", "POST")
		writeError(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}
	var request struct {
		SetupSecret string `json:"setup_secret"`
		Password    string `json:"password"`
	}
	if decodeJSON(w, r, &request, 8<<10) != nil {
		return
	}
	if err := s.storage.State().CompleteSetup(r.Context(), request.SetupSecret, request.Password); err != nil {
		writeError(w, http.StatusBadRequest, err.Error())
		return
	}
	s.createBrowserSession(w, r)
}

func (s *Server) createBrowserSession(w http.ResponseWriter, r *http.Request) {
	current, err := s.storage.State().CreateSession(r.Context(), 24*time.Hour)
	if err != nil {
		s.internalError(w, err)
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name: sessionCookie, Value: current.ID, Path: "/", MaxAge: 24 * 60 * 60,
		HttpOnly: true, Secure: s.secure, SameSite: http.SameSiteStrictMode,
	})
	writeJSON(w, http.StatusOK, sessionResponse{Authenticated: true, CSRFToken: current.CSRF, Username: "Administrator"})
}

func (s *Server) currentSession(r *http.Request) (string, state.Session, bool, error) {
	cookie, err := r.Cookie(sessionCookie)
	if err != nil || len(cookie.Value) != 64 {
		return "", state.Session{}, false, nil
	}
	current, ok, err := s.storage.State().Session(r.Context(), cookie.Value)
	return cookie.Value, current, ok, err
}

func (s *Server) serveCreateToken(w http.ResponseWriter, r *http.Request) {
	var request struct {
		Name          string   `json:"name"`
		Scopes        []string `json:"scopes"`
		ExpiresInDays int      `json:"expires_in_days"`
	}
	if decodeJSON(w, r, &request, 8<<10) != nil {
		return
	}
	if request.ExpiresInDays < 0 || request.ExpiresInDays > 3650 {
		writeError(w, http.StatusBadRequest, "expiration must be between 1 and 3650 days")
		return
	}
	var expiresAt *time.Time
	if request.ExpiresInDays > 0 {
		value := time.Now().UTC().Add(time.Duration(request.ExpiresInDays) * 24 * time.Hour)
		expiresAt = &value
	}
	token, plain, err := s.storage.State().CreatePersonalAccessToken(r.Context(), request.Name, request.Scopes, expiresAt)
	if err != nil {
		writeError(w, http.StatusBadRequest, err.Error())
		return
	}
	writeJSON(w, http.StatusCreated, map[string]any{"token_details": token, "token": plain})
}

func (s *Server) serveChangePassword(w http.ResponseWriter, r *http.Request) {
	var request struct {
		CurrentPassword string `json:"current_password"`
		NewPassword     string `json:"new_password"`
	}
	if decodeJSON(w, r, &request, 8<<10) != nil {
		return
	}
	if err := s.storage.State().ChangePassword(r.Context(), request.CurrentPassword, request.NewPassword); err != nil {
		writeError(w, http.StatusBadRequest, err.Error())
		return
	}
	s.createBrowserSession(w, r)
}

func (s *Server) storageError(w http.ResponseWriter, err error) {
	switch {
	case errors.Is(err, bucket.ErrNotFound):
		writeError(w, http.StatusNotFound, "model not found")
	case errors.Is(err, bucket.ErrConflict):
		writeError(w, http.StatusConflict, "repository changed; refresh and retry")
	case errors.Is(err, bucket.ErrInvalid):
		writeError(w, http.StatusBadRequest, "invalid repository request")
	default:
		s.internalError(w, err)
	}
}

func (s *Server) internalError(w http.ResponseWriter, err error) {
	s.logger.Error("request failed", "error", err)
	writeError(w, http.StatusInternalServerError, "internal server error")
}
