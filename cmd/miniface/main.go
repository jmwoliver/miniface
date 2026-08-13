package main

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/jmwoliver/miniface/internal/config"
	"github.com/jmwoliver/miniface/internal/server"
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
	cfg, err := config.Parse(os.Args[1:])
	if err != nil {
		return err
	}
	opened, err := storage.Open(context.Background(), cfg)
	if err != nil {
		return err
	}
	defer opened.Storage.Close()
	if opened.TokenNew {
		logger.Warn("generated administrator token; save it now because it will not be shown again", "token", opened.AdminToken)
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
