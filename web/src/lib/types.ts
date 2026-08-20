export type ValidationStatus = 'valid' | 'warning' | 'invalid' | 'pending' | string;
export interface ModelSummary { id:string; owner:string; name:string; sha:string; updated_at:string; file_count:number; logical_bytes:number; kind:string; architecture:string; quantization:string; base_model?:string; base_revision?:string; source_repository?:string; source_revision?:string; validation_status:ValidationStatus }
export interface HuggingFaceModel { id:string; downloads:number; likes:number; gated:boolean; pipeline_tag?:string; size_bytes?:number }
export interface FileEntry { path:string; size:number; kind:string; sha256?:string; xet_hash?:string }
export interface Revision { oid:string; parent?:string; created_at:string; author:string; message:string; file_count:number }
export interface Job { id:string; type:string; state:string; phase:string; repo_id?:string; source_repository?:string; source_revision?:string; progress:number; current_bytes?:number; total_bytes?:number; error?:string; created_at:string; updated_at:string }
export interface Session { authenticated:boolean; setup_required:boolean; csrf_token?:string; username?:string }
export interface ModelDetail { model:ModelSummary; files:FileEntry[]; revisions:Revision[]; card:string }
export interface FilePreview extends FileEntry { revision:string; content_type?:string; text?:string; previewable:boolean; truncated:boolean }
export interface StorageRepository { id:string; owner:string; name:string; revision:string; logical_bytes:number; file_count:number; revisions:number; updated_at:string }
export interface Storage { profile:string; logical_bytes:number; physical_bytes:number; repositories:number; ordinary_objects:number; xet_objects:number; dedup_ratio:number; repository_breakdown:StorageRepository[] }
export interface PersonalAccessToken { id:string; name:string; prefix:string; scopes:string[]; created_at:string; last_used_at?:string; expires_at?:string; revoked_at?:string }
export interface ServerInfo { endpoint:string; listen:string; secure:boolean; remote_access:boolean; storage:{profile:string;metadata_database:string;object_storage:string;data_directory:string;xet_threshold_bytes:number;available_bytes:number}; runtime:{miniface_version:string;go_version:string;os:string;arch:string} }
