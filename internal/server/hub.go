package server

import (
	"bufio"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/url"
	"strconv"
	"strings"

	"github.com/jmwoliver/miniface/internal/storage"
	"github.com/jmwoliver/xet-go/bucket"
	"github.com/jmwoliver/xet-go/model"
)

func isPreuploadPath(value string) bool {
	parts := strings.Split(strings.TrimPrefix(value, "/"), "/")
	return len(parts) == 6 && parts[0] == "api" && parts[1] == "models" && parts[4] == "preupload"
}

func isCommitPath(value string) bool {
	parts := strings.Split(strings.TrimPrefix(value, "/"), "/")
	return len(parts) == 6 && parts[0] == "api" && parts[1] == "models" && parts[4] == "commit"
}

func isLFSBatchPath(value string) bool {
	parts := strings.Split(strings.TrimPrefix(value, "/"), "/")
	return len(parts) == 6 && strings.HasSuffix(parts[1], ".git") && parts[2] == "info" && parts[3] == "lfs" && parts[4] == "objects" && parts[5] == "batch"
}

func (s *Server) serveHubWrite(w http.ResponseWriter, r *http.Request) {
	if strings.HasPrefix(r.URL.Path, "/lfs/uploads/") {
		s.serveLFSUpload(w, r)
		return
	}
	if !s.authenticateHub(w, r) {
		return
	}
	switch {
	case r.URL.Path == "/api/repos/create":
		s.serveCreateRepository(w, r)
	case isPreuploadPath(r.URL.Path):
		s.servePreupload(w, r)
	case isLFSBatchPath(r.URL.Path):
		s.serveLFSBatch(w, r)
	case isCommitPath(r.URL.Path):
		s.serveCommit(w, r)
	default:
		http.NotFound(w, r)
	}
}

func (s *Server) authenticateHub(w http.ResponseWriter, r *http.Request) bool {
	token, ok := bearerToken(r.Header.Get("Authorization"))
	if !ok {
		writeError(w, http.StatusUnauthorized, "authentication required")
		return false
	}
	valid, err := s.storage.Authenticate(r.Context(), token)
	if err != nil {
		s.internalError(w, err)
		return false
	}
	if !valid {
		writeError(w, http.StatusUnauthorized, "invalid token")
		return false
	}
	return true
}

func (s *Server) serveCreateRepository(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.Header().Set("Allow", "POST")
		writeError(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}
	var request struct {
		Name         string  `json:"name"`
		Organization *string `json:"organization"`
		Type         string  `json:"type"`
		Visibility   string  `json:"visibility"`
	}
	if decodeJSON(w, r, &request, 64<<10) != nil {
		return
	}
	if request.Type != "" && request.Type != "model" {
		writeError(w, http.StatusBadRequest, "only model repositories are supported")
		return
	}
	owner := "administrator"
	if request.Organization != nil && *request.Organization != "" {
		owner = *request.Organization
	}
	if err := s.storage.CreateRepository(r.Context(), owner, request.Name); err != nil {
		s.storageError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"url": fmt.Sprintf("%s/%s/%s", s.storage.BaseURL(), url.PathEscape(owner), url.PathEscape(request.Name))})
}

func (s *Server) servePreupload(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.Header().Set("Allow", "POST")
		writeError(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}
	parts := strings.Split(strings.TrimPrefix(r.URL.Path, "/"), "/")
	owner, name := parts[2], parts[3]
	exists, err := s.storage.RepositoryExists(r.Context(), owner, name)
	if err != nil {
		s.storageError(w, err)
		return
	}
	if !exists {
		writeError(w, http.StatusNotFound, "repository not found")
		return
	}
	var request struct {
		Files []struct {
			Path   string `json:"path"`
			Sample string `json:"sample"`
			Size   int64  `json:"size"`
		} `json:"files"`
		GitIgnore string `json:"gitIgnore"`
	}
	if decodeJSON(w, r, &request, 2<<20) != nil {
		return
	}
	if len(request.Files) > 256 {
		writeError(w, http.StatusBadRequest, "preupload batch exceeds 256 files")
		return
	}
	response := make([]map[string]any, 0, len(request.Files))
	for _, file := range request.Files {
		if _, err := model.ParseFilePath(file.Path); err != nil || file.Size < 0 {
			writeError(w, http.StatusBadRequest, "invalid preupload file")
			return
		}
		mode := "regular"
		if file.Size >= s.storage.XetThreshold() && file.Size > 0 {
			mode = "lfs"
		}
		response = append(response, map[string]any{"path": file.Path, "uploadMode": mode, "shouldIgnore": false, "oid": nil})
	}
	writeJSON(w, http.StatusOK, map[string]any{"files": response})
}

func (s *Server) serveLFSBatch(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.Header().Set("Allow", "POST")
		writeError(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}
	parts := strings.Split(strings.TrimPrefix(r.URL.Path, "/"), "/")
	owner, name := parts[0], strings.TrimSuffix(parts[1], ".git")
	exists, err := s.storage.RepositoryExists(r.Context(), owner, name)
	if err != nil {
		s.storageError(w, err)
		return
	}
	if !exists {
		writeError(w, http.StatusNotFound, "repository not found")
		return
	}
	var request struct {
		Operation string   `json:"operation"`
		HashAlgo  string   `json:"hash_algo"`
		Transfers []string `json:"transfers"`
		Ref       struct {
			Name string `json:"name"`
		} `json:"ref"`
		Objects []struct {
			OID  string `json:"oid"`
			Size int64  `json:"size"`
		} `json:"objects"`
	}
	if decodeJSON(w, r, &request, 2<<20) != nil {
		return
	}
	if request.Operation != "upload" || (request.HashAlgo != "" && request.HashAlgo != "sha256") || len(request.Objects) > 256 {
		writeError(w, http.StatusBadRequest, "unsupported LFS batch request")
		return
	}
	objects := make([]map[string]any, 0, len(request.Objects))
	for _, object := range request.Objects {
		href, ready, err := s.storage.PrepareLFSUpload(r.Context(), owner, name, object.OID, object.Size)
		if err != nil {
			writeError(w, http.StatusBadRequest, err.Error())
			return
		}
		value := map[string]any{"oid": object.OID, "size": object.Size}
		if !ready {
			value["actions"] = map[string]any{"upload": map[string]any{"href": href, "header": map[string]string{}}}
		}
		objects = append(objects, value)
	}
	w.Header().Set("Content-Type", "application/vnd.git-lfs+json")
	writeJSON(w, http.StatusOK, map[string]any{"transfer": "basic", "objects": objects})
}

func (s *Server) serveLFSUpload(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		w.Header().Set("Allow", "PUT")
		writeError(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}
	parts := strings.Split(strings.TrimPrefix(r.URL.Path, "/"), "/")
	if len(parts) != 6 || parts[0] != "lfs" || parts[1] != "uploads" || parts[2] != "v1" {
		http.NotFound(w, r)
		return
	}
	owner, name, oid := parts[3], parts[4], parts[5]
	size, sizeErr := strconv.ParseInt(r.URL.Query().Get("size"), 10, 64)
	expires, expiryErr := strconv.ParseInt(r.URL.Query().Get("expires"), 10, 64)
	signature, signatureErr := hex.DecodeString(r.URL.Query().Get("signature"))
	if sizeErr != nil || expiryErr != nil || signatureErr != nil || !s.storage.VerifyLFSCapability(owner, name, oid, size, expires, signature) {
		writeError(w, http.StatusForbidden, "invalid or expired LFS upload capability")
		return
	}
	if r.ContentLength >= 0 && r.ContentLength != size {
		writeError(w, http.StatusBadRequest, "LFS body length does not match its declaration")
		return
	}
	body := http.MaxBytesReader(w, r.Body, size+1)
	if err := s.storage.IngestLFS(r.Context(), owner, name, oid, size, body); err != nil {
		writeError(w, http.StatusBadRequest, err.Error())
		return
	}
	w.WriteHeader(http.StatusOK)
}

func (s *Server) serveCommit(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.Header().Set("Allow", "POST")
		writeError(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}
	parts := strings.Split(strings.TrimPrefix(r.URL.Path, "/"), "/")
	request := storage.CommitRequest{Owner: parts[2], Name: parts[3], Revision: parts[5]}
	body := http.MaxBytesReader(w, r.Body, 64<<20)
	scanner := bufio.NewScanner(body)
	scanner.Buffer(make([]byte, 64<<10), 4<<20)
	line := 0
	for scanner.Scan() {
		line++
		if len(scanner.Bytes()) == 0 {
			continue
		}
		var record struct {
			Key   string          `json:"key"`
			Value json.RawMessage `json:"value"`
		}
		if err := json.Unmarshal(scanner.Bytes(), &record); err != nil {
			writeError(w, http.StatusBadRequest, "invalid commit NDJSON")
			return
		}
		if line == 1 {
			if record.Key != "header" {
				writeError(w, http.StatusBadRequest, "commit header must be first")
				return
			}
			var header struct {
				Summary      string `json:"summary"`
				ParentCommit string `json:"parentCommit"`
			}
			if err := json.Unmarshal(record.Value, &header); err != nil {
				writeError(w, http.StatusBadRequest, "invalid commit header")
				return
			}
			request.Summary, request.Parent = header.Summary, header.ParentCommit
			continue
		}
		operation, err := parseCommitOperation(record.Key, record.Value, s.storage.XetThreshold())
		if err != nil {
			writeError(w, http.StatusBadRequest, err.Error())
			return
		}
		request.Operations = append(request.Operations, operation)
		if len(request.Operations) > 10_000 {
			writeError(w, http.StatusBadRequest, "commit exceeds 10000 operations")
			return
		}
	}
	if err := scanner.Err(); err != nil || line == 0 {
		writeError(w, http.StatusBadRequest, "invalid or oversized commit NDJSON")
		return
	}
	result, err := s.storage.Commit(r.Context(), request)
	if err != nil {
		if errors.Is(err, bucket.ErrConflict) {
			writeError(w, http.StatusConflict, "parent commit does not match the current revision")
		} else {
			writeError(w, http.StatusBadRequest, err.Error())
		}
		return
	}
	commitURL := fmt.Sprintf("%s/%s/%s/commit/%s", s.storage.BaseURL(), url.PathEscape(request.Owner), url.PathEscape(request.Name), result.OID)
	writeJSON(w, http.StatusOK, map[string]any{"success": true, "commitOid": result.OID, "commitUrl": commitURL, "hookOutput": ""})
}

func parseCommitOperation(kind string, raw json.RawMessage, regularLimit int64) (storage.CommitOperation, error) {
	switch kind {
	case "file":
		var value struct {
			Content  string `json:"content"`
			Path     string `json:"path"`
			Encoding string `json:"encoding"`
		}
		if err := json.Unmarshal(raw, &value); err != nil || value.Encoding != "base64" {
			return storage.CommitOperation{}, errors.New("invalid regular file operation")
		}
		content, err := base64.StdEncoding.DecodeString(value.Content)
		if err != nil || int64(len(content)) >= regularLimit {
			return storage.CommitOperation{}, errors.New("regular file is invalid or exceeds the regular-file threshold")
		}
		return storage.CommitOperation{Kind: kind, Path: value.Path, Content: content}, nil
	case "lfsFile":
		var value struct {
			Path string `json:"path"`
			Algo string `json:"algo"`
			OID  string `json:"oid"`
			Size int64  `json:"size"`
		}
		if err := json.Unmarshal(raw, &value); err != nil || value.Algo != "sha256" || value.Size < 0 {
			return storage.CommitOperation{}, errors.New("invalid LFS file operation")
		}
		return storage.CommitOperation{Kind: kind, Path: value.Path, OID: value.OID, Size: value.Size}, nil
	case "deletedFile", "deletedFolder":
		var value struct {
			Path string `json:"path"`
		}
		if err := json.Unmarshal(raw, &value); err != nil {
			return storage.CommitOperation{}, errors.New("invalid delete operation")
		}
		return storage.CommitOperation{Kind: kind, Path: value.Path}, nil
	default:
		return storage.CommitOperation{}, fmt.Errorf("unsupported commit operation %q", kind)
	}
}
