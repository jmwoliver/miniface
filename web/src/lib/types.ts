export type ValidationStatus = 'valid' | 'warning' | 'invalid' | 'pending' | string;
export interface ModelSummary { id:string; owner:string; name:string; sha:string; updated_at:string; file_count:number; logical_bytes:number; kind:string; architecture:string; quantization:string; base_model?:string; base_revision?:string; source_repository?:string; source_revision?:string; validation_status:ValidationStatus }
export interface HuggingFaceModel { id:string; downloads:number; likes:number; gated:boolean; pipeline_tag?:string; size_bytes?:number }
export interface FileEntry { path:string; size:number; kind:string; sha256?:string; xet_hash?:string }
export interface Revision { oid:string; parent?:string; created_at:string; author:string; message:string; file_count:number }
export interface Job { id:string; type:string; state:string; repo_id?:string; progress:number; current_bytes?:number; total_bytes?:number; error?:string; created_at:string; updated_at:string }
export interface Session { authenticated:boolean; csrf_token?:string; username?:string }
export interface ModelDetail { model:ModelSummary; files:FileEntry[]; revisions:Revision[]; card:string }
export interface Storage { profile:string; logical_bytes:number; physical_bytes:number; repositories:number; ordinary_objects:number; xet_objects:number; dedup_ratio:number }
