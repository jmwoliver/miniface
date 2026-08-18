package storage

import (
	"context"
	"io"

	"github.com/jmwoliver/miniface/internal/state"
	"github.com/jmwoliver/xet-go/bucket"
	"github.com/jmwoliver/xet-go/model"
)

func (l *Local) metadataForSnapshot(ctx context.Context, repo model.RepoKey, oid model.OID, entries []model.FileEntry) state.ModelMetadata {
	files := make(map[string][]byte)
	revision, _ := model.RevisionFromOID(oid)
	for _, name := range []model.FilePath{"config.json", "adapter_config.json"} {
		opened, err := l.service.OpenFile(ctx, repo, revision, name, bucket.OpenOptions{})
		if err != nil || opened.FileSize > 2<<20 {
			continue
		}
		body, readErr := io.ReadAll(io.LimitReader(opened.Body, 2<<20+1))
		closeErr := opened.Body.Close()
		if readErr == nil && closeErr == nil {
			files[string(name)] = body
		}
	}
	return classifyModel(files, entries)
}

func equalTrees(left, right []model.FileEntry) bool {
	if len(left) != len(right) {
		return false
	}
	for index := range left {
		if left[index].Path != right[index].Path || left[index].Ref.Kind() != right[index].Ref.Kind() || left[index].Ref.FileSize() != right[index].Ref.FileSize() {
			return false
		}
		leftSHA, leftHasSHA := left[index].Ref.SHA256()
		rightSHA, rightHasSHA := right[index].Ref.SHA256()
		leftXet, leftHasXet := left[index].Ref.XetHash()
		rightXet, rightHasXet := right[index].Ref.XetHash()
		if leftHasSHA != rightHasSHA || leftSHA != rightSHA || leftHasXet != rightHasXet || leftXet != rightXet {
			return false
		}
	}
	return true
}
