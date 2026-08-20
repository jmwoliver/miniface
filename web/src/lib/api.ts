import type { FilePreview, HuggingFaceModel, Job, ModelDetail, ModelSummary, PersonalAccessToken, ServerInfo, Session, Storage } from './types';

const base = '/api/miniface/v1';
export class ApiError extends Error { constructor(message:string, public status:number) { super(message); } }
async function request<T>(path:string, init:RequestInit = {}, csrf?:string):Promise<T> {
  const headers = new Headers(init.headers); headers.set('Accept','application/json');
  if (init.body) headers.set('Content-Type','application/json'); if (csrf) headers.set('X-CSRF-Token',csrf);
  let response:Response;
  try {
    response = await fetch(`${base}${path}`, { ...init, headers, credentials:'same-origin' });
    if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('miniface:connection',{detail:true}));
  } catch (error) {
    if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('miniface:connection',{detail:false}));
    throw error;
  }
  if (!response.ok) { let message=`Request failed (${response.status})`; try { const body=await response.json(); message=body.error ?? body.message ?? message; } catch {} throw new ApiError(message,response.status); }
  return response.json() as Promise<T>;
}
export const api = {
  session: () => request<Session>('/session'),
  setup: (setup_secret:string,password:string) => request<Session>('/setup',{method:'POST',body:JSON.stringify({setup_secret,password})}),
  login: (password:string) => request<Session>('/session',{method:'POST',body:JSON.stringify({password})}),
  logout: (csrf:string) => request<Session>('/session',{method:'DELETE'},csrf),
  models: async () => (await request<{models:ModelSummary[]}>('/models')).models,
  model: (owner:string,repo:string,revision = '') => request<ModelDetail>(`/models/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}${revision ? `?revision=${encodeURIComponent(revision)}` : ''}`),
  filePreview: (owner:string,repo:string,path:string,revision:string) => request<FilePreview>(`/models/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/file?path=${encodeURIComponent(path)}&revision=${encodeURIComponent(revision)}`),
  fileDownloadURL: (owner:string,repo:string,path:string,revision:string) => `${base}/models/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/download?path=${encodeURIComponent(path)}&revision=${encodeURIComponent(revision)}`,
  jobs: async () => (await request<{jobs:Job[]}>('/jobs')).jobs,
  job: async (id:string) => (await request<{job:Job}>(`/jobs/${encodeURIComponent(id)}`)).job,
  cancelJob: async (id:string,csrf:string) => (await request<{job:Job}>(`/jobs/${encodeURIComponent(id)}/cancel`,{method:'POST'},csrf)).job,
  storage: () => request<Storage>('/storage'),
  server: () => request<ServerInfo>('/server'),
  tokens: async () => (await request<{tokens:PersonalAccessToken[]}>('/settings/tokens')).tokens,
  createToken: (data:{name:string;scopes:string[];expires_in_days:number},csrf:string) => request<{token_details:PersonalAccessToken;token:string}>('/settings/tokens',{method:'POST',body:JSON.stringify(data)},csrf),
  revokeToken: (id:string,csrf:string) => request<{revoked:boolean}>(`/settings/tokens/${encodeURIComponent(id)}`,{method:'DELETE'},csrf),
  changePassword: (current_password:string,new_password:string,csrf:string) => request<Session>('/settings/password',{method:'PUT',body:JSON.stringify({current_password,new_password})},csrf),
  searchHuggingFace: async (search:string) => (await request<{models:HuggingFaceModel[]}>(`/huggingface/models?search=${encodeURIComponent(search)}`)).models,
  importLocal: (data:{path:string;repo_id:string;message:string},csrf:string) => request<{job:Job}>('/imports',{method:'POST',body:JSON.stringify(data)},csrf),
  importHuggingFace: (data:{source_repo_id:string;source_revision:string;destination_repo_id:string;message:string;token:string},csrf:string) => request<{job:Job}>('/imports/huggingface',{method:'POST',body:JSON.stringify(data)},csrf),
  saveCard: (owner:string,repo:string,content:string,message:string,csrf:string) => request<ModelDetail|{job:Job}>(`/models/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/card`,{method:'PUT',body:JSON.stringify({content,message})},csrf)
};
