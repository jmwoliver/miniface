package config

import (
	"os"
	"path/filepath"
	"testing"
)

func TestParseUsesLoopbackAndFixedXetThreshold(t *testing.T) {
	root := t.TempDir()
	cfg, err := Parse([]string{"--listen", "127.0.0.1:9876", "--data-dir", filepath.Join(root, "data"), "--import-root", root})
	if err != nil {
		t.Fatal(err)
	}
	if cfg.BaseURL.String() != "http://127.0.0.1:9876" || cfg.XetThreshold != DefaultXetThreshold || len(cfg.ImportRoots) != 1 {
		t.Fatalf("unexpected config: %#v", cfg)
	}
	if _, err := Parse([]string{"--listen", "0.0.0.0:8080"}); err == nil {
		t.Fatal("remote listen without opt-in succeeded")
	}
	if _, err := Parse([]string{"--listen", "0.0.0.0:8080", "--allow-remote", "--base-url", "http://example.com"}); err == nil {
		t.Fatal("remote HTTP base URL succeeded")
	}
	if _, err := os.Stat(root); err != nil {
		t.Fatal(err)
	}
}
