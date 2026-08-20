package main

import (
	"context"
	"errors"
	"flag"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"syscall"
	"time"

	"github.com/jmwoliver/miniface/internal/config"
	"github.com/jmwoliver/miniface/internal/server"
	"github.com/jmwoliver/miniface/internal/state"
	"github.com/jmwoliver/miniface/internal/storage"
)

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stderr, nil))
	if err := run(logger); err != nil {
		logger.Error("miniface stopped", "error", err)
		os.Exit(1)
	}
}

func run(logger *slog.Logger) error {
	args := os.Args[1:]
	if len(args) > 0 && args[0] == "auth" {
		return runAuth(args[1:])
	}
	if len(args) > 0 && args[0] == "serve" {
		args = args[1:]
	}
	cfg, err := config.Parse(args)
	if err != nil {
		return err
	}
	opened, err := storage.Open(context.Background(), cfg)
	if err != nil {
		return err
	}
	defer opened.Storage.Close()
	if opened.SetupSecretNew {
		logger.Warn("generated one-time administrator setup secret; save it now because it will not be shown again", "setup_secret", opened.SetupSecret)
	}
	application, err := server.New(cfg, opened.Storage, logger)
	if err != nil {
		return err
	}
	httpServer := &http.Server{
		Addr: cfg.Listen, Handler: application.Handler(),
		ReadHeaderTimeout: 10 * time.Second, ReadTimeout: 15 * time.Minute,
		WriteTimeout: 15 * time.Minute, IdleTimeout: 2 * time.Minute,
		MaxHeaderBytes: 1 << 20,
	}

	serverErrors := make(chan error, 1)
	go func() {
		logger.Info("miniface listening", "address", cfg.Listen, "endpoint", cfg.BaseURL.String(), "data_dir", cfg.DataDir)
		serverErrors <- httpServer.ListenAndServe()
	}()
	signals, cancelSignals := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer cancelSignals()
	select {
	case err := <-serverErrors:
		if errors.Is(err, http.ErrServerClosed) {
			return nil
		}
		return err
	case <-signals.Done():
		opened.Storage.StopJobs()
		shutdown, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()
		return httpServer.Shutdown(shutdown)
	}
}

func runAuth(args []string) error {
	if len(args) == 0 || args[0] != "recover" {
		return errors.New("usage: miniface auth recover [--data-dir PATH]")
	}
	defaultDataDir, err := config.DefaultDataDir()
	if err != nil {
		return err
	}
	set := flag.NewFlagSet("miniface auth recover", flag.ContinueOnError)
	dataDir := set.String("data-dir", defaultDataDir, "private Miniface data directory")
	if err := set.Parse(args[1:]); err != nil {
		return err
	}
	if set.NArg() != 0 {
		return errors.New("usage: miniface auth recover [--data-dir PATH]")
	}
	absolute, err := filepath.Abs(*dataDir)
	if err != nil {
		return err
	}
	info, err := os.Lstat(absolute)
	if err != nil || !info.IsDir() || info.Mode()&os.ModeSymlink != 0 {
		return errors.New("data directory must be an existing real directory")
	}
	database := filepath.Join(absolute, "miniface.sqlite")
	if info, err := os.Lstat(database); err != nil || !info.Mode().IsRegular() || info.Mode()&os.ModeSymlink != 0 {
		return errors.New("Miniface state database was not found in the data directory")
	}
	store, err := state.Open(database)
	if err != nil {
		return err
	}
	defer store.Close()
	secret, err := store.RecoverAdministrator(context.Background())
	if err != nil {
		return err
	}
	_, err = fmt.Fprintf(os.Stdout, "Administrator credentials were reset. Restart Miniface and complete setup with this one-time secret:\n%s\n", secret)
	return err
}
