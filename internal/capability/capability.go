package capability

import (
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"crypto/subtle"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"time"

	"github.com/jmwoliver/xet-go/xetcas"
	casserver "github.com/jmwoliver/xet-go/xetcas/server"
	"github.com/jmwoliver/xet-go/xethash"
)

type Service struct {
	blobs   casserver.BlobStore
	baseURL string
	key     []byte
	now     func() time.Time
	ttl     time.Duration
}

func New(blobs casserver.BlobStore, baseURL string, key []byte) (*Service, error) {
	parsed, err := url.Parse(baseURL)
	if blobs == nil || err != nil || !parsed.IsAbs() || (parsed.Scheme != "http" && parsed.Scheme != "https") || parsed.Host == "" || len(key) < 32 {
		return nil, errors.New("invalid local range capability configuration")
	}
	return &Service{blobs: blobs, baseURL: strings.TrimSuffix(baseURL, "/"), key: append([]byte(nil), key...), now: time.Now, ttl: 5 * time.Minute}, nil
}

func (s *Service) SignRange(ctx context.Context, key casserver.BlobKey, wanted xetcas.HTTPRange) (casserver.SignedRange, error) {
	if err := ctx.Err(); err != nil {
		return casserver.SignedRange{}, err
	}
	if err := wanted.Validate(); err != nil || (key.Kind != casserver.BlobXorb && key.Kind != casserver.BlobShard) || key.Hash.IsZero() {
		return casserver.SignedRange{}, casserver.ErrInvalid
	}
	expires := s.now().UTC().Add(s.ttl).Truncate(time.Second)
	values := url.Values{}
	values.Set("start", strconv.FormatUint(wanted.Start, 10))
	values.Set("end", strconv.FormatUint(wanted.End, 10))
	values.Set("expires", strconv.FormatInt(expires.Unix(), 10))
	payload := capabilityPayload(key.Kind, key.Hash, wanted, expires.Unix())
	values.Set("signature", hex.EncodeToString(s.sign(payload)))
	return casserver.SignedRange{
		URL:       fmt.Sprintf("%s/v1/%s/%s?%s", s.baseURL, key.Kind, key.Hash, values.Encode()),
		ExpiresAt: expires,
	}, nil
}

func (s *Service) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet && r.Method != http.MethodHead {
		w.Header().Set("Allow", "GET, HEAD")
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	parts := strings.Split(strings.TrimPrefix(r.URL.Path, "/"), "/")
	if len(parts) != 3 || parts[0] != "v1" {
		http.NotFound(w, r)
		return
	}
	kind := casserver.BlobKind(parts[1])
	if kind != casserver.BlobXorb && kind != casserver.BlobShard {
		http.NotFound(w, r)
		return
	}
	hash, err := xethash.Parse(parts[2])
	if err != nil {
		http.Error(w, "invalid capability", http.StatusForbidden)
		return
	}
	start, end, expiry, signature, err := parseQuery(r.URL.Query())
	if err != nil || expiry < s.now().Unix() || expiry > s.now().Add(10*time.Minute).Unix() {
		http.Error(w, "invalid or expired capability", http.StatusForbidden)
		return
	}
	wanted := xetcas.HTTPRange{Start: start, End: end}
	if wanted.Validate() != nil {
		http.Error(w, "invalid capability", http.StatusForbidden)
		return
	}
	expected := s.sign(capabilityPayload(kind, hash, wanted, expiry))
	if len(signature) != len(expected) || subtle.ConstantTimeCompare(signature, expected) != 1 {
		http.Error(w, "invalid capability", http.StatusForbidden)
		return
	}
	if r.Header.Get("Range") != fmt.Sprintf("bytes=%d-%d", start, end) {
		http.Error(w, "capability requires its exact Range header", http.StatusForbidden)
		return
	}
	reader, err := s.blobs.Get(r.Context(), casserver.BlobKey{Kind: kind, Hash: hash}, &wanted)
	if err != nil {
		if errors.Is(err, casserver.ErrNotFound) {
			http.NotFound(w, r)
		} else if errors.Is(err, xetcas.ErrRangeNotSatisfiable) {
			w.WriteHeader(http.StatusRequestedRangeNotSatisfiable)
		} else {
			http.Error(w, "object unavailable", http.StatusInternalServerError)
		}
		return
	}
	defer reader.Close()
	length := end - start + 1
	w.Header().Set("Accept-Ranges", "bytes")
	w.Header().Set("Content-Length", strconv.FormatUint(length, 10))
	w.Header().Set("Content-Range", fmt.Sprintf("bytes %d-%d/*", start, end))
	w.Header().Set("Content-Type", "application/octet-stream")
	w.Header().Set("Cache-Control", "private, max-age=0, no-store")
	w.WriteHeader(http.StatusPartialContent)
	if r.Method == http.MethodGet {
		_, _ = io.CopyN(w, reader, int64(length))
	}
}

func parseQuery(values url.Values) (uint64, uint64, int64, []byte, error) {
	if len(values) != 4 || len(values["start"]) != 1 || len(values["end"]) != 1 || len(values["expires"]) != 1 || len(values["signature"]) != 1 {
		return 0, 0, 0, nil, errors.New("invalid query")
	}
	start, err := strconv.ParseUint(values.Get("start"), 10, 64)
	if err != nil {
		return 0, 0, 0, nil, err
	}
	end, err := strconv.ParseUint(values.Get("end"), 10, 64)
	if err != nil {
		return 0, 0, 0, nil, err
	}
	expiry, err := strconv.ParseInt(values.Get("expires"), 10, 64)
	if err != nil {
		return 0, 0, 0, nil, err
	}
	signature, err := hex.DecodeString(values.Get("signature"))
	return start, end, expiry, signature, err
}

func capabilityPayload(kind casserver.BlobKind, hash xethash.Hash, wanted xetcas.HTTPRange, expiry int64) string {
	return fmt.Sprintf("miniface-range-v1\n%s\n%s\n%d\n%d\n%d", kind, hash, wanted.Start, wanted.End, expiry)
}

func (s *Service) sign(payload string) []byte {
	mac := hmac.New(sha256.New, s.key)
	_, _ = mac.Write([]byte(payload))
	return mac.Sum(nil)
}
