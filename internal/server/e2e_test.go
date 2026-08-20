package server

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net"
	"net/http"
	"net/http/cookiejar"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/jmwoliver/miniface/internal/config"
	"github.com/jmwoliver/miniface/internal/state"
	"github.com/jmwoliver/miniface/internal/storage"
)

func TestLocalImportUIAndHubResolve(t *testing.T) {
	root := t.TempDir()
	source := filepath.Join(root, "model")
	if err := os.Mkdir(source, 0o700); err != nil {
		t.Fatal(err)
	}
	configBody := []byte(`{"model_type":"miniface-test","architectures":["MinifaceModel"]}`)
	weights := bytes.Repeat([]byte("miniface-xet-fixture"), 70_000)
	if err := os.WriteFile(filepath.Join(source, "config.json"), configBody, 0o600); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(source, "model.safetensors"), weights, 0o600); err != nil {
		t.Fatal(err)
	}

	listener, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatal(err)
	}
	base, _ := url.Parse("http://" + listener.Addr().String())
	cfg := config.Config{Listen: listener.Addr().String(), BaseURL: base, DataDir: filepath.Join(root, "data"), ImportRoots: []string{root}, XetThreshold: config.DefaultXetThreshold}
	opened, err := storage.Open(context.Background(), cfg)
	if err != nil {
		t.Fatal(err)
	}
	application, err := New(cfg, opened.Storage, slog.New(slog.NewTextHandler(io.Discard, nil)))
	if err != nil {
		t.Fatal(err)
	}
	httpServer := &http.Server{Handler: application.Handler()}
	done := make(chan error, 1)
	go func() { done <- httpServer.Serve(listener) }()
	t.Cleanup(func() {
		shutdown, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		_ = httpServer.Shutdown(shutdown)
		<-done
		_ = opened.Storage.Close()
	})

	jar, _ := cookiejar.New(nil)
	client := &http.Client{Jar: jar, Timeout: 20 * time.Second}
	sessionBeforeSetup, err := client.Get(base.String() + "/api/miniface/v1/session")
	if err != nil {
		t.Fatal(err)
	}
	var initialSession sessionResponse
	decodeForTest(t, sessionBeforeSetup, &initialSession)
	if initialSession.Authenticated || !initialSession.SetupRequired {
		t.Fatalf("initial session = %#v", initialSession)
	}
	invalidSetup := requestJSONForStatusTest(t, client, http.MethodPost, base.String()+"/api/miniface/v1/setup", "", map[string]string{
		"setup_secret": "wrong", "password": "short",
	})
	if invalidSetup.StatusCode != http.StatusBadRequest {
		t.Fatalf("invalid setup = %d", invalidSetup.StatusCode)
	}
	_ = invalidSetup.Body.Close()
	indexResponse, err := client.Get(base.String())
	if err != nil {
		t.Fatal(err)
	}
	indexBody, err := io.ReadAll(indexResponse.Body)
	_ = indexResponse.Body.Close()
	if err != nil {
		t.Fatal(err)
	}
	csp := indexResponse.Header.Get("Content-Security-Policy")
	if !strings.Contains(csp, "script-src 'self' 'sha256-") || strings.Contains(csp, "script-src 'self' 'unsafe-inline'") {
		t.Fatalf("frontend CSP does not allow only its hashed bootstrap: %q", csp)
	}
	assetMarker := `href="/_app/`
	assetStart := strings.Index(string(indexBody), assetMarker)
	if assetStart < 0 {
		t.Fatal("frontend index does not reference an embedded asset")
	}
	assetStart += len(`href="`)
	assetEnd := strings.IndexByte(string(indexBody[assetStart:]), '"')
	if assetEnd < 0 {
		t.Fatal("frontend index has a malformed asset reference")
	}
	assetResponse, err := client.Get(base.String() + string(indexBody[assetStart:assetStart+assetEnd]))
	if err != nil {
		t.Fatal(err)
	}
	_ = assetResponse.Body.Close()
	if assetResponse.StatusCode != http.StatusOK || !strings.Contains(assetResponse.Header.Get("Content-Type"), "javascript") {
		t.Fatalf("embedded frontend asset = %d, %q", assetResponse.StatusCode, assetResponse.Header.Get("Content-Type"))
	}
	login := requestJSONForTest(t, client, http.MethodPost, base.String()+"/api/miniface/v1/setup", "", map[string]string{
		"setup_secret": opened.SetupSecret, "password": "correct horse battery staple",
	})
	var session sessionResponse
	decodeForTest(t, login, &session)
	if !session.Authenticated || session.CSRFToken == "" {
		t.Fatalf("login response = %#v", session)
	}
	secondSetup := requestJSONForStatusTest(t, client, http.MethodPost, base.String()+"/api/miniface/v1/setup", "", map[string]string{
		"setup_secret": opened.SetupSecret, "password": "another valid administrator password",
	})
	if secondSetup.StatusCode != http.StatusBadRequest {
		t.Fatalf("repeated setup = %d", secondSetup.StatusCode)
	}
	_ = secondSetup.Body.Close()
	secondJar, _ := cookiejar.New(nil)
	secondClient := &http.Client{Jar: secondJar, Timeout: 20 * time.Second}
	secondLogin := requestJSONForTest(t, secondClient, http.MethodPost, base.String()+"/api/miniface/v1/session", "", map[string]string{
		"password": "correct horse battery staple",
	})
	var secondSession sessionResponse
	decodeForTest(t, secondLogin, &secondSession)
	if !secondSession.Authenticated {
		t.Fatalf("second browser login = %#v", secondSession)
	}
	tokenResponse := requestJSONForTest(t, client, http.MethodPost, base.String()+"/api/miniface/v1/settings/tokens", session.CSRFToken, map[string]any{
		"name": "Test client", "scopes": []string{"write"}, "expires_in_days": 1,
	})
	var createdToken struct {
		Token        string                    `json:"token"`
		TokenDetails state.PersonalAccessToken `json:"token_details"`
	}
	decodeForTest(t, tokenResponse, &createdToken)
	if !strings.HasPrefix(createdToken.Token, "mf_pat_") {
		t.Fatalf("created token = %q", createdToken.Token)
	}
	searchResponse, err := client.Get(base.String() + "/api/miniface/v1/huggingface/models?search=x")
	if err != nil {
		t.Fatal(err)
	}
	var searchResults struct {
		Models []storage.HuggingFaceModel `json:"models"`
	}
	decodeForTest(t, searchResponse, &searchResults)
	if len(searchResults.Models) != 0 {
		t.Fatalf("short Hugging Face search = %#v", searchResults.Models)
	}
	invalidRemoteImport := requestJSONForStatusTest(t, client, http.MethodPost, base.String()+"/api/miniface/v1/imports/huggingface", session.CSRFToken, map[string]string{
		"source_repo_id": "invalid", "source_revision": "main", "destination_repo_id": "local/remote", "message": "Import", "token": "",
	})
	if invalidRemoteImport.StatusCode != http.StatusBadRequest {
		body, _ := io.ReadAll(invalidRemoteImport.Body)
		_ = invalidRemoteImport.Body.Close()
		t.Fatalf("invalid remote import = %d: %s", invalidRemoteImport.StatusCode, body)
	}
	_ = invalidRemoteImport.Body.Close()
	importResponse := requestJSONForTest(t, client, http.MethodPost, base.String()+"/api/miniface/v1/imports", session.CSRFToken, map[string]string{
		"path": source, "repo_id": "local/test-model", "message": "Initial import",
	})
	var queued struct {
		Job state.Job `json:"job"`
	}
	decodeForTest(t, importResponse, &queued)
	waitForJobForTest(t, client, base.String(), queued.Job.ID)
	jobResponse, err := client.Get(base.String() + "/api/miniface/v1/jobs/" + queued.Job.ID)
	if err != nil {
		t.Fatal(err)
	}
	var completedJob struct {
		Job state.Job `json:"job"`
	}
	decodeForTest(t, jobResponse, &completedJob)
	if completedJob.Job.State != "completed" || completedJob.Job.Phase != "Completed" {
		t.Fatalf("completed job = %#v", completedJob.Job)
	}
	missingCSRF := requestJSONForStatusTest(t, client, http.MethodPost, base.String()+"/api/miniface/v1/jobs/"+queued.Job.ID+"/cancel", "", nil)
	if missingCSRF.StatusCode != http.StatusForbidden {
		t.Fatalf("cancel without CSRF = %d", missingCSRF.StatusCode)
	}
	_ = missingCSRF.Body.Close()
	completedCancel := requestJSONForStatusTest(t, client, http.MethodPost, base.String()+"/api/miniface/v1/jobs/"+queued.Job.ID+"/cancel", session.CSRFToken, nil)
	if completedCancel.StatusCode != http.StatusConflict {
		t.Fatalf("cancel completed job = %d", completedCancel.StatusCode)
	}
	_ = completedCancel.Body.Close()
	unknownCancel := requestJSONForStatusTest(t, client, http.MethodPost, base.String()+"/api/miniface/v1/jobs/"+strings.Repeat("f", 32)+"/cancel", session.CSRFToken, nil)
	if unknownCancel.StatusCode != http.StatusNotFound {
		t.Fatalf("cancel unknown job = %d", unknownCancel.StatusCode)
	}
	_ = unknownCancel.Body.Close()

	detailResponse, err := client.Get(base.String() + "/api/miniface/v1/models/local/test-model")
	if err != nil {
		t.Fatal(err)
	}
	var detail storage.ModelDetail
	decodeForTest(t, detailResponse, &detail)
	if detail.Model.Architecture != "MinifaceModel" || len(detail.Files) != 2 || detail.Files[1].XetHash == "" {
		t.Fatalf("model detail = %#v", detail)
	}
	previewResponse, err := client.Get(base.String() + "/api/miniface/v1/models/local/test-model/file?path=config.json&revision=" + detail.Model.SHA)
	if err != nil {
		t.Fatal(err)
	}
	var preview storage.FilePreview
	decodeForTest(t, previewResponse, &preview)
	if !preview.Previewable || preview.Truncated || preview.Text != string(configBody) || preview.Revision != detail.Model.SHA {
		t.Fatalf("file preview = %#v", preview)
	}
	downloadResponse, err := client.Get(base.String() + "/api/miniface/v1/models/local/test-model/download?path=config.json&revision=" + detail.Model.SHA)
	if err != nil {
		t.Fatal(err)
	}
	downloadBody, err := io.ReadAll(downloadResponse.Body)
	_ = downloadResponse.Body.Close()
	if err != nil || downloadResponse.StatusCode != http.StatusOK || !bytes.Equal(downloadBody, configBody) || !strings.Contains(downloadResponse.Header.Get("Content-Disposition"), "attachment") {
		t.Fatalf("UI download = %d, %q, %d bytes, %v", downloadResponse.StatusCode, downloadResponse.Header.Get("Content-Disposition"), len(downloadBody), err)
	}
	rangeRequest, _ := http.NewRequest(http.MethodGet, base.String()+"/api/miniface/v1/models/local/test-model/download?path=model.safetensors&revision="+detail.Model.SHA, nil)
	rangeRequest.Header.Set("Range", "bytes=5-14")
	rangeResponse, err := client.Do(rangeRequest)
	if err != nil {
		t.Fatal(err)
	}
	rangeBody, err := io.ReadAll(rangeResponse.Body)
	_ = rangeResponse.Body.Close()
	if err != nil || rangeResponse.StatusCode != http.StatusPartialContent || !bytes.Equal(rangeBody, weights[5:15]) || rangeResponse.Header.Get("Content-Range") != fmt.Sprintf("bytes 5-14/%d", len(weights)) {
		t.Fatalf("range download = %d, %q, %d bytes, %v", rangeResponse.StatusCode, rangeResponse.Header.Get("Content-Range"), len(rangeBody), err)
	}
	invalidRangeRequest, _ := http.NewRequest(http.MethodGet, base.String()+"/api/miniface/v1/models/local/test-model/download?path=config.json&revision="+detail.Model.SHA, nil)
	invalidRangeRequest.Header.Set("Range", "bytes=999999-")
	invalidRangeResponse, err := client.Do(invalidRangeRequest)
	if err != nil {
		t.Fatal(err)
	}
	if invalidRangeResponse.StatusCode != http.StatusRequestedRangeNotSatisfiable {
		t.Fatalf("invalid range = %d", invalidRangeResponse.StatusCode)
	}
	_ = invalidRangeResponse.Body.Close()

	secondImport := requestJSONForTest(t, client, http.MethodPost, base.String()+"/api/miniface/v1/imports", session.CSRFToken, map[string]string{
		"path": source, "repo_id": "local/test-model", "message": "Repeated import",
	})
	decodeForTest(t, secondImport, &queued)
	waitForJobForTest(t, client, base.String(), queued.Job.ID)
	detailResponse, err = client.Get(base.String() + "/api/miniface/v1/models/local/test-model")
	if err != nil {
		t.Fatal(err)
	}
	decodeForTest(t, detailResponse, &detail)
	if len(detail.Revisions) != 1 {
		t.Fatalf("unchanged import created %d revisions; want 1", len(detail.Revisions))
	}

	resolveRequest, _ := http.NewRequest(http.MethodGet, base.String()+"/local/test-model/resolve/main/model.safetensors", nil)
	resolveRequest.Header.Set("Authorization", "Bearer "+createdToken.Token)
	resolveResponse, err := client.Do(resolveRequest)
	if err != nil {
		t.Fatal(err)
	}
	downloaded, err := io.ReadAll(resolveResponse.Body)
	_ = resolveResponse.Body.Close()
	if err != nil || resolveResponse.StatusCode != http.StatusOK || !bytes.Equal(downloaded, weights) {
		t.Fatalf("resolve = %d, %d bytes, %v", resolveResponse.StatusCode, len(downloaded), err)
	}

	changePassword := requestJSONForTest(t, client, http.MethodPut, base.String()+"/api/miniface/v1/settings/password", session.CSRFToken, map[string]string{
		"current_password": "correct horse battery staple", "new_password": "new correct horse battery staple",
	})
	decodeForTest(t, changePassword, &session)
	otherModels, err := secondClient.Get(base.String() + "/api/miniface/v1/models")
	if err != nil {
		t.Fatal(err)
	}
	if otherModels.StatusCode != http.StatusUnauthorized {
		t.Fatalf("second session after password change = %d", otherModels.StatusCode)
	}
	_ = otherModels.Body.Close()
	oldLogin := requestJSONForStatusTest(t, secondClient, http.MethodPost, base.String()+"/api/miniface/v1/session", "", map[string]string{"password": "correct horse battery staple"})
	if oldLogin.StatusCode != http.StatusUnauthorized {
		t.Fatalf("old password login = %d", oldLogin.StatusCode)
	}
	_ = oldLogin.Body.Close()
	newLogin := requestJSONForTest(t, secondClient, http.MethodPost, base.String()+"/api/miniface/v1/session", "", map[string]string{"password": "new correct horse battery staple"})
	decodeForTest(t, newLogin, &secondSession)

	revokeResponse := requestJSONForTest(t, client, http.MethodDelete, base.String()+"/api/miniface/v1/settings/tokens/"+createdToken.TokenDetails.ID, session.CSRFToken, nil)
	_ = revokeResponse.Body.Close()
	revokedResolveRequest, _ := http.NewRequest(http.MethodGet, base.String()+"/local/test-model/resolve/main/model.safetensors", nil)
	revokedResolveRequest.Header.Set("Authorization", "Bearer "+createdToken.Token)
	revokedResolveResponse, err := client.Do(revokedResolveRequest)
	if err != nil {
		t.Fatal(err)
	}
	if revokedResolveResponse.StatusCode != http.StatusUnauthorized {
		t.Fatalf("revoked PAT resolve = %d", revokedResolveResponse.StatusCode)
	}
	_ = revokedResolveResponse.Body.Close()
}

func TestParseByteRange(t *testing.T) {
	tests := []struct {
		value      string
		size       int64
		start, end int64
		valid      bool
	}{
		{"", 10, 0, 0, true},
		{"bytes=2-5", 10, 2, 6, true},
		{"bytes=7-", 10, 7, 10, true},
		{"bytes=-3", 10, 7, 10, true},
		{"bytes=-30", 10, 0, 10, true},
		{"bytes=10-", 10, 0, 0, false},
		{"bytes=4-2", 10, 0, 0, false},
		{"bytes=0-1,4-5", 10, 0, 0, false},
		{"items=0-1", 10, 0, 0, false},
		{"bytes=0-", 0, 0, 0, false},
	}
	for _, test := range tests {
		t.Run(test.value, func(t *testing.T) {
			parsed, err := parseByteRange(test.value, test.size)
			if !test.valid {
				if err == nil {
					t.Fatalf("parseByteRange(%q, %d) = %#v", test.value, test.size, parsed)
				}
				return
			}
			if err != nil {
				t.Fatal(err)
			}
			if test.value == "" {
				if parsed != nil {
					t.Fatalf("empty range = %#v", parsed)
				}
				return
			}
			if parsed.Start != test.start || parsed.End != test.end {
				t.Fatalf("parseByteRange(%q, %d) = %#v", test.value, test.size, parsed)
			}
		})
	}
}

func waitForJobForTest(t *testing.T, client *http.Client, baseURL, jobID string) {
	t.Helper()
	deadline := time.Now().Add(15 * time.Second)
	for {
		response, err := client.Get(baseURL + "/api/miniface/v1/jobs")
		if err != nil {
			t.Fatal(err)
		}
		var jobs struct {
			Jobs []state.Job `json:"jobs"`
		}
		decodeForTest(t, response, &jobs)
		for _, job := range jobs.Jobs {
			if job.ID != jobID {
				continue
			}
			if job.State == "completed" {
				return
			}
			if job.State == "failed" {
				t.Fatalf("import failed: %s", job.Error)
			}
		}
		if time.Now().After(deadline) {
			t.Fatal("timed out waiting for import")
		}
		time.Sleep(25 * time.Millisecond)
	}
}

func requestJSONForTest(t *testing.T, client *http.Client, method, target, csrf string, value any) *http.Response {
	t.Helper()
	response := requestJSONForStatusTest(t, client, method, target, csrf, value)
	if response.StatusCode < 200 || response.StatusCode >= 300 {
		message, _ := io.ReadAll(response.Body)
		_ = response.Body.Close()
		t.Fatalf("%s %s = %d: %s", method, target, response.StatusCode, strings.TrimSpace(string(message)))
	}
	return response
}

func requestJSONForStatusTest(t *testing.T, client *http.Client, method, target, csrf string, value any) *http.Response {
	t.Helper()
	body, _ := json.Marshal(value)
	request, _ := http.NewRequest(method, target, bytes.NewReader(body))
	request.Header.Set("Content-Type", "application/json")
	if csrf != "" {
		request.Header.Set("X-CSRF-Token", csrf)
	}
	response, err := client.Do(request)
	if err != nil {
		t.Fatal(err)
	}
	return response
}

func decodeForTest(t *testing.T, response *http.Response, destination any) {
	t.Helper()
	defer response.Body.Close()
	if response.StatusCode < 200 || response.StatusCode >= 300 {
		body, _ := io.ReadAll(response.Body)
		t.Fatalf("response = %d: %s", response.StatusCode, body)
	}
	if err := json.NewDecoder(response.Body).Decode(destination); err != nil {
		t.Fatal(fmt.Errorf("decode response: %w", err))
	}
}
