package storage

import (
	"testing"

	"github.com/jmwoliver/xet-go/model"
)

func TestClassifyPinnedAdapterAndRemoteCode(t *testing.T) {
	adapter := classifyModel(map[string][]byte{
		"adapter_config.json": []byte(`{"base_model_name_or_path":"team/base","revision":"0123456789abcdef0123456789abcdef01234567","peft_type":"LORA"}`),
	}, nil)
	if adapter.Kind != "adapter" || adapter.BaseModel != "team/base" || adapter.BaseRevision == "" || adapter.ValidationStatus != "valid" {
		t.Fatalf("adapter metadata = %#v", adapter)
	}
	unpinned := classifyModel(map[string][]byte{"adapter_config.json": []byte(`{"base_model_name_or_path":"team/base"}`)}, nil)
	if unpinned.ValidationStatus != "warning" {
		t.Fatalf("unpinned adapter metadata = %#v", unpinned)
	}
	remoteCode := classifyModel(map[string][]byte{"config.json": []byte(`{"architectures":["CustomModel"],"auto_map":{"AutoModel":"model.Custom"}}`)}, []model.FileEntry{})
	if remoteCode.Architecture != "CustomModel" || remoteCode.ValidationStatus != "warning" {
		t.Fatalf("remote-code metadata = %#v", remoteCode)
	}
}
