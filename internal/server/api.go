package server

import (
	"errors"
	"net/http"
	"strings"
	"time"

	"github.com/jmwoliver/miniface/internal/storage"
	"github.com/jmwoliver/xet-go/bucket"
)

type sessionResponse struct {
	Authenticated bool   `json:"authenticated"`
	CSRFToken     string `json:"csrf_token,omitempty"`
	Username      string `json:"username,omitempty"`
}

func (s *Server) serveAPI(w http.ResponseWriter, r *http.Request) {
	endpoint := strings.TrimPrefix(r.URL.Path, "/api/miniface/v1")
	if endpoint == "/session" {
		s.serveSession(w, r)
		return
	}
	_, current, ok := s.currentSession(r)
	if !ok {
		writeError(w, http.StatusUnauthorized, "authentication required")
		return
	}
	if r.Method == http.MethodPost || r.Method == http.MethodPut || r.Method == http.MethodPatch || r.Method == http.MethodDelete {
		if !constantEqual(r.Header.Get("X-CSRF-Token"), current.csrf) {
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

func jobCancelID(endpoint string) string {
	parts := strings.Split(strings.Trim(endpoint, "/"), "/")
	if len(parts) != 3 || parts[0] != "jobs" || parts[2] != "cancel" || len(parts[1]) != 32 {
		return ""
	}
	for _, char := range parts[1] {
		if !strings.ContainsRune("0123456789abcdef", char) {
			return ""
		}
	}
	return parts[1]
}

func (s *Server) serveModelAPI(w http.ResponseWriter, r *http.Request, suffix string) {
	parts := strings.Split(suffix, "/")
	if len(parts) == 2 && r.Method == http.MethodGet {
		detail, err := s.storage.Model(r.Context(), parts[0], parts[1])
		if err != nil {
			s.storageError(w, err)
			return
		}
		writeJSON(w, http.StatusOK, detail)
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

func (s *Server) serveSession(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		_, current, ok := s.currentSession(r)
		if !ok {
			writeJSON(w, http.StatusOK, sessionResponse{Authenticated: false})
			return
		}
		writeJSON(w, http.StatusOK, sessionResponse{Authenticated: true, CSRFToken: current.csrf, Username: "Administrator"})
	case http.MethodPost:
		var request struct {
			Token string `json:"token"`
		}
		if decodeJSON(w, r, &request, 4<<10) != nil {
			return
		}
		valid, err := s.storage.State().VerifyAdminToken(r.Context(), request.Token)
		if err != nil {
			s.internalError(w, err)
			return
		}
		if !valid {
			writeError(w, http.StatusUnauthorized, "invalid administrator token")
			return
		}
		id := randomValue(32)
		current := session{csrf: randomValue(32), expiresAt: time.Now().Add(24 * time.Hour)}
		s.mu.Lock()
		s.pruneSessionsLocked()
		s.sessions[id] = current
		s.mu.Unlock()
		http.SetCookie(w, &http.Cookie{
			Name: sessionCookie, Value: id, Path: "/", MaxAge: 24 * 60 * 60,
			HttpOnly: true, Secure: s.secure, SameSite: http.SameSiteStrictMode,
		})
		writeJSON(w, http.StatusOK, sessionResponse{Authenticated: true, CSRFToken: current.csrf, Username: "Administrator"})
	case http.MethodDelete:
		id, current, ok := s.currentSession(r)
		if !ok {
			writeJSON(w, http.StatusOK, sessionResponse{Authenticated: false})
			return
		}
		if !constantEqual(r.Header.Get("X-CSRF-Token"), current.csrf) {
			writeError(w, http.StatusForbidden, "invalid CSRF token")
			return
		}
		s.mu.Lock()
		delete(s.sessions, id)
		s.mu.Unlock()
		http.SetCookie(w, &http.Cookie{Name: sessionCookie, Value: "", Path: "/", MaxAge: -1, HttpOnly: true, Secure: s.secure, SameSite: http.SameSiteStrictMode})
		writeJSON(w, http.StatusOK, sessionResponse{Authenticated: false})
	default:
		w.Header().Set("Allow", "GET, POST, DELETE")
		writeError(w, http.StatusMethodNotAllowed, "method not allowed")
	}
}

func (s *Server) currentSession(r *http.Request) (string, session, bool) {
	cookie, err := r.Cookie(sessionCookie)
	if err != nil || len(cookie.Value) != 64 {
		return "", session{}, false
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	current, ok := s.sessions[cookie.Value]
	if !ok || !current.expiresAt.After(time.Now()) {
		delete(s.sessions, cookie.Value)
		return "", session{}, false
	}
	return cookie.Value, current, true
}

func (s *Server) pruneSessionsLocked() {
	now := time.Now()
	for id, current := range s.sessions {
		if !current.expiresAt.After(now) {
			delete(s.sessions, id)
		}
	}
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
