// Package webui exposes the production Svelte build for embedding in the
// Miniface server binary.
package webui

import "embed"

// Build contains the output of `bun run build`.
//
//go:embed all:build
var Build embed.FS
