package server

import (
	"bytes"
	"crypto/rand"
	"crypto/sha256"
	"crypto/subtle"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/fs"
	"log/slog"
	"mime"
	"net/http"
	"path"
	"strings"
	"sync"
	"time"

	"github.com/jmwoliver/miniface/internal/config"
	"github.com/jmwoliver/miniface/internal/storage"
	webui "github.com/jmwoliver/miniface/web"
)

const sessionCookie = "miniface_session"

type session struct {
	csrf      string
	expiresAt time.Time
}

type Server struct {
	storage     *storage.Local
	logger      *slog.Logger
	secure      bool
	static      http.Handler
	staticFiles fs.FS
	csp         string

	mu       sync.Mutex
	sessions map[string]session
}

func New(cfg config.Config, registry *storage.Local, logger *slog.Logger) (*Server, error) {
	if registry == nil {
		return nil, errors.New("storage is required")
	}
	if logger == nil {
		logger = slog.Default()
	}
	assets, err := fs.Sub(webui.Build, "build")
	if err != nil {
		return nil, fmt.Errorf("open embedded frontend: %w", err)
	}
	index, err := fs.ReadFile(assets, "index.html")
	if err != nil {
		return nil, fmt.Errorf("read embedded frontend: %w", err)
	}
	if info, err := fs.Stat(assets, "_app"); err != nil || !info.IsDir() {
		return nil, errors.New("embedded frontend is missing its _app assets; rebuild it before compiling Miniface")
	}
	return &Server{
		storage: registry, logger: logger, secure: cfg.BaseURL.Scheme == "https",
		static: http.FileServer(http.FS(assets)), staticFiles: assets,
		csp: contentSecurityPolicy(index), sessions: make(map[string]session),
	}, nil
}

func (s *Server) Handler() http.Handler {
	return s.securityHeaders(s.requestLog(http.HandlerFunc(s.serveHTTP)))
}

func (s *Server) serveHTTP(w http.ResponseWriter, r *http.Request) {
	switch {
	case r.URL.Path == "/healthz":
		writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
	case r.URL.Path == "/readyz":
		if err := s.storage.Ready(r.Context()); err != nil {
			writeError(w, http.StatusServiceUnavailable, "storage is not ready")
			return
		}
		writeJSON(w, http.StatusOK, map[string]string{"status": "ready"})
	case strings.HasPrefix(r.URL.Path, "/api/miniface/v1/"):
		s.serveAPI(w, r)
	case r.URL.Path == "/api/whoami-v2":
		s.serveWhoAmI(w, r)
	case r.URL.Path == "/api/repos/create" || isPreuploadPath(r.URL.Path) || isCommitPath(r.URL.Path) || isLFSBatchPath(r.URL.Path) || strings.HasPrefix(r.URL.Path, "/lfs/uploads/"):
		s.serveHubWrite(w, r)
	case strings.HasPrefix(r.URL.Path, "/cas/"):
		http.StripPrefix("/cas", s.storage.CASHandler()).ServeHTTP(w, r)
	case strings.HasPrefix(r.URL.Path, "/objects/"):
		http.StripPrefix("/objects", s.storage.ObjectHandler()).ServeHTTP(w, r)
	case strings.HasPrefix(r.URL.Path, "/api/models/") || isResolvePath(r.URL.Path):
		s.storage.HubHandler().ServeHTTP(w, r)
	case strings.HasPrefix(r.URL.Path, "/api/") || strings.HasPrefix(r.URL.Path, "/cas") || strings.HasPrefix(r.URL.Path, "/objects") || strings.HasPrefix(r.URL.Path, "/lfs/"):
		http.NotFound(w, r)
	default:
		s.serveStatic(w, r)
	}
}

func isResolvePath(value string) bool {
	parts := strings.Split(strings.TrimPrefix(value, "/"), "/")
	return len(parts) >= 5 && parts[2] == "resolve"
}

func (s *Server) serveWhoAmI(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.Header().Set("Allow", "GET")
		writeError(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}
	token, ok := bearerToken(r.Header.Get("Authorization"))
	if !ok {
		writeError(w, http.StatusUnauthorized, "authentication required")
		return
	}
	valid, err := s.storage.State().VerifyAdminToken(r.Context(), token)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "authentication unavailable")
		return
	}
	if !valid {
		writeError(w, http.StatusUnauthorized, "invalid token")
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"type": "user", "id": "local:administrator", "name": "administrator",
		"fullname": "Miniface Administrator", "email": "", "emailVerified": true,
		"canPay": false, "periodEnd": nil, "isPro": false, "avatarUrl": "", "orgs": []any{},
	})
}

func bearerToken(value string) (string, bool) {
	parts := strings.SplitN(value, " ", 2)
	returnValue := ""
	if len(parts) == 2 && strings.EqualFold(parts[0], "Bearer") && parts[1] != "" && !strings.ContainsAny(parts[1], " \t\r\n,") {
		returnValue = parts[1]
	}
	return returnValue, returnValue != ""
}

func (s *Server) serveStatic(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet && r.Method != http.MethodHead {
		w.Header().Set("Allow", "GET, HEAD")
		writeError(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}
	name := strings.TrimPrefix(path.Clean(r.URL.Path), "/")
	if name == "." || name == "" {
		name = "index.html"
	}
	if info, err := fs.Stat(s.staticFiles, name); err == nil && !info.IsDir() {
		if contentType := mime.TypeByExtension(path.Ext(name)); contentType != "" {
			w.Header().Set("Content-Type", contentType)
		}
		if strings.HasPrefix(name, "_app/immutable/") {
			w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		}
		s.static.ServeHTTP(w, r)
		return
	}
	r.URL.Path = "/"
	w.Header().Set("Cache-Control", "no-cache")
	s.static.ServeHTTP(w, r)
}

type statusRecorder struct {
	http.ResponseWriter
	status int
}

func (r *statusRecorder) WriteHeader(status int) {
	if r.status != 0 {
		return
	}
	r.status = status
	r.ResponseWriter.WriteHeader(status)
}

func (r *statusRecorder) Write(body []byte) (int, error) {
	if r.status == 0 {
		r.status = http.StatusOK
	}
	return r.ResponseWriter.Write(body)
}

func (r *statusRecorder) Flush() {
	if r.status == 0 {
		r.WriteHeader(http.StatusOK)
	}
	_ = http.NewResponseController(r.ResponseWriter).Flush()
}

func (r *statusRecorder) Unwrap() http.ResponseWriter { return r.ResponseWriter }

func (s *Server) requestLog(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		started := time.Now()
		requestID := randomValue(12)
		w.Header().Set("X-Request-ID", requestID)
		recorder := &statusRecorder{ResponseWriter: w}
		next.ServeHTTP(recorder, r)
		status := recorder.status
		if status == 0 {
			status = http.StatusOK
		}
		s.logger.Info("http request", "request_id", requestID, "method", r.Method, "path", r.URL.Path, "status", status, "duration_ms", time.Since(started).Milliseconds())
	})
}

func (s *Server) securityHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("Referrer-Policy", "no-referrer")
		w.Header().Set("X-Frame-Options", "DENY")
		w.Header().Set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
		w.Header().Set("Content-Security-Policy", s.csp)
		next.ServeHTTP(w, r)
	})
}

func contentSecurityPolicy(index []byte) string {
	scriptSources := "script-src 'self'"
	for {
		opening := bytes.Index(index, []byte("<script"))
		if opening < 0 {
			break
		}
		tagEnd := bytes.IndexByte(index[opening:], '>')
		if tagEnd < 0 {
			break
		}
		tagEnd += opening
		closing := bytes.Index(index[tagEnd+1:], []byte("</script>"))
		if closing < 0 {
			break
		}
		closing += tagEnd + 1
		if !bytes.Contains(index[opening:tagEnd], []byte("src=")) {
			digest := sha256.Sum256(index[tagEnd+1 : closing])
			scriptSources += " 'sha256-" + base64.StdEncoding.EncodeToString(digest[:]) + "'"
		}
		index = index[closing+len("</script>"):]
	}
	return "default-src 'self'; " + scriptSources + "; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'"
}

func writeJSON(w http.ResponseWriter, status int, value any) {
	if w.Header().Get("Content-Type") == "" {
		w.Header().Set("Content-Type", "application/json")
	}
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(value)
}

func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, map[string]string{"error": message})
}

func randomValue(bytes int) string {
	raw := make([]byte, bytes)
	if _, err := rand.Read(raw); err != nil {
		panic("crypto/rand unavailable: " + err.Error())
	}
	return hex.EncodeToString(raw)
}

func decodeJSON(w http.ResponseWriter, r *http.Request, destination any, maximum int64) error {
	mediaType, _, mediaTypeError := mime.ParseMediaType(r.Header.Get("Content-Type"))
	if mediaTypeError != nil || (mediaType != "application/json" && !strings.HasSuffix(mediaType, "+json")) {
		writeError(w, http.StatusUnsupportedMediaType, "Content-Type must be JSON")
		return errors.New("unsupported content type")
	}
	body := http.MaxBytesReader(w, r.Body, maximum)
	decoder := json.NewDecoder(body)
	decoder.DisallowUnknownFields()
	if err := decoder.Decode(destination); err != nil {
		writeError(w, http.StatusBadRequest, "invalid JSON body")
		return err
	}
	if err := decoder.Decode(&struct{}{}); !errors.Is(err, io.EOF) {
		writeError(w, http.StatusBadRequest, "JSON body must contain one value")
		return errors.New("trailing JSON")
	}
	return nil
}

func constantEqual(left, right string) bool {
	return len(left) == len(right) && subtle.ConstantTimeCompare([]byte(left), []byte(right)) == 1
}
