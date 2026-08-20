package config

import (
	"errors"
	"flag"
	"fmt"
	"net"
	"net/url"
	"os"
	"path/filepath"
	"strings"
)

type rootsFlag []string

func (r *rootsFlag) String() string { return strings.Join(*r, ",") }

func (r *rootsFlag) Set(value string) error {
	if value == "" {
		return errors.New("import root cannot be empty")
	}
	*r = append(*r, value)
	return nil
}

type Config struct {
	Listen       string
	BaseURL      *url.URL
	DataDir      string
	ImportRoots  []string
	AllowRemote  bool
	XetThreshold int64
}

const DefaultXetThreshold int64 = 1 << 20

func DefaultDataDir() (string, error) {
	home, err := os.UserHomeDir()
	if err != nil {
		return "", fmt.Errorf("find home directory: %w", err)
	}
	dataDir := os.Getenv("XDG_DATA_HOME")
	if dataDir == "" {
		dataDir = filepath.Join(home, ".local", "share")
	}
	return filepath.Join(dataDir, "miniface"), nil
}

func Parse(args []string) (Config, error) {
	home, err := os.UserHomeDir()
	if err != nil {
		return Config{}, fmt.Errorf("find home directory: %w", err)
	}
	dataDir, err := DefaultDataDir()
	if err != nil {
		return Config{}, err
	}

	var cfg Config
	var baseURL string
	var roots rootsFlag
	set := flag.NewFlagSet("miniface", flag.ContinueOnError)
	set.StringVar(&cfg.Listen, "listen", "127.0.0.1:8080", "HTTP listen address")
	set.StringVar(&baseURL, "base-url", "", "public HTTP(S) URL (defaults to the listen address)")
	set.StringVar(&cfg.DataDir, "data-dir", dataDir, "private Miniface data directory")
	set.Var(&roots, "import-root", "directory from which local imports are allowed (repeatable)")
	set.BoolVar(&cfg.AllowRemote, "allow-remote", false, "allow a non-loopback listen address")
	cfg.XetThreshold = DefaultXetThreshold
	if err := set.Parse(args); err != nil {
		return Config{}, err
	}
	if set.NArg() != 0 {
		return Config{}, fmt.Errorf("unexpected arguments: %s", strings.Join(set.Args(), " "))
	}
	host, port, err := net.SplitHostPort(cfg.Listen)
	if err != nil {
		return Config{}, fmt.Errorf("listen address: %w", err)
	}
	if port == "0" && baseURL == "" {
		return Config{}, errors.New("--base-url is required when listening on port 0")
	}
	if !cfg.AllowRemote && !isLoopbackHost(host) {
		return Config{}, errors.New("non-loopback listen addresses require --allow-remote")
	}
	if baseURL == "" {
		baseHost := host
		if baseHost == "" {
			baseHost = "127.0.0.1"
		}
		baseURL = "http://" + net.JoinHostPort(baseHost, port)
	}
	cfg.BaseURL, err = url.Parse(baseURL)
	if err != nil || !cfg.BaseURL.IsAbs() || (cfg.BaseURL.Scheme != "http" && cfg.BaseURL.Scheme != "https") || cfg.BaseURL.Host == "" || cfg.BaseURL.RawQuery != "" || cfg.BaseURL.Fragment != "" {
		return Config{}, errors.New("base URL must be an absolute HTTP(S) URL without query or fragment")
	}
	if cfg.AllowRemote && cfg.BaseURL.Scheme != "https" && !isLoopbackHost(cfg.BaseURL.Hostname()) {
		return Config{}, errors.New("remote mode requires an HTTPS base URL")
	}
	absData, err := filepath.Abs(cfg.DataDir)
	if err != nil {
		return Config{}, fmt.Errorf("data directory: %w", err)
	}
	cfg.DataDir = absData
	if len(roots) == 0 {
		roots = append(roots, home)
	}
	for _, root := range roots {
		absolute, err := filepath.Abs(root)
		if err != nil {
			return Config{}, fmt.Errorf("import root %q: %w", root, err)
		}
		cfg.ImportRoots = append(cfg.ImportRoots, filepath.Clean(absolute))
	}
	return cfg, nil
}

func isLoopbackHost(host string) bool {
	if host == "localhost" {
		return true
	}
	if host == "" {
		return false
	}
	ip := net.ParseIP(host)
	return ip != nil && ip.IsLoopback()
}
