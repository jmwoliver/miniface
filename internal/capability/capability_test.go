package capability

import (
	"bytes"
	"context"
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
	"testing"
	"time"

	"github.com/jmwoliver/xet-go/xetcas"
	casserver "github.com/jmwoliver/xet-go/xetcas/server"
	"github.com/jmwoliver/xet-go/xethash"
)

func TestExactRangeCapability(t *testing.T) {
	data := []byte("0123456789")
	store := casserver.NewMemoryStore()
	key := casserver.BlobKey{Kind: casserver.BlobXorb, Hash: xethash.Chunk(data)}
	if _, err := store.PutIfAbsent(context.Background(), key, bytes.NewReader(data), int64(len(data))); err != nil {
		t.Fatal(err)
	}
	now := time.Unix(2_000_000_000, 0).UTC()
	service, err := New(store, "https://miniface.example/objects", bytes.Repeat([]byte{7}, 32))
	if err != nil {
		t.Fatal(err)
	}
	service.now = func() time.Time { return now }
	signed, err := service.SignRange(context.Background(), key, xetcas.HTTPRange{Start: 2, End: 5})
	if err != nil {
		t.Fatal(err)
	}
	parsed, _ := url.Parse(signed.URL)
	parsed.Path = strings.TrimPrefix(parsed.Path, "/objects")
	request := httptest.NewRequest(http.MethodGet, parsed.String(), nil)
	request.Header.Set("Range", "bytes=2-5")
	response := httptest.NewRecorder()
	service.ServeHTTP(response, request)
	if response.Code != http.StatusPartialContent || response.Body.String() != "2345" {
		t.Fatalf("valid response = %d, %q", response.Code, response.Body.String())
	}

	tampered := *parsed
	query := tampered.Query()
	query.Set("start", "3")
	tampered.RawQuery = query.Encode()
	request = httptest.NewRequest(http.MethodGet, tampered.String(), nil)
	request.Header.Set("Range", "bytes=3-5")
	response = httptest.NewRecorder()
	service.ServeHTTP(response, request)
	if response.Code != http.StatusForbidden {
		t.Fatalf("tampered response = %d", response.Code)
	}

	service.now = func() time.Time { return now.Add(6 * time.Minute) }
	request = httptest.NewRequest(http.MethodGet, parsed.String(), nil)
	request.Header.Set("Range", "bytes=2-5")
	response = httptest.NewRecorder()
	service.ServeHTTP(response, request)
	if response.Code != http.StatusForbidden {
		t.Fatalf("expired response = %d", response.Code)
	}
}
