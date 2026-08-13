import type { HuggingFaceModel, Job, ModelDetail, ModelSummary, Session, Storage } from './types';

const base = '/api/miniface/v1';
export class ApiError extends Error { constructor(message:string, public status:number) { super(message); } }
async function request<T>(path:string, init:RequestInit = {}, csrf?:string):Promise<T> {
  const headers = new Headers(init.headers); headers.set('Accept','application/json');
  if (init.body) headers.set('Content-Type','application/json'); if (csrf) headers.set('X-CSRF-Token',csrf);
  const response = await fetch(`${base}${path}`, { ...init, headers, credentials:'same-origin' });
  if (!response.ok) { let message=`Request failed (${response.status})`; try { const body=await response.json(); message=body.error ?? body.message ?? message; } catch {} throw new ApiError(message,response.status); }
  return response.json() as Promise<T>;
}
export const api = {
  session: () => request<Session>('/session'),
  login: (token:string) => request<Session>('/session',{method:'POST',body:JSON.stringify({token})}),
  logout: (csrf:string) => request<Session>('/session',{method:'DELETE'},csrf),
  models: async () => (await request<{models:ModelSummary[]}>('/models')).models,
  model: (owner:string,repo:string) => request<ModelDetail>(`/models/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`),
  jobs: async () => (await request<{jobs:Job[]}>('/jobs')).jobs,
  cancelJob: async (id:string,csrf:string) => (await request<{job:Job}>(`/jobs/${encodeURIComponent(id)}/cancel`,{method:'POST'},csrf)).job,
  storage: () => request<Storage>('/storage'),
  searchHuggingFace: async (search:string) => (await request<{models:HuggingFaceModel[]}>(`/huggingface/models?search=${encodeURIComponent(search)}`)).models,
  importLocal: (data:{path:string;repo_id:string;message:string},csrf:string) => request<{job:Job}>('/imports',{method:'POST',body:JSON.stringify(data)},csrf),
  importHuggingFace: (data:{source_repo_id:string;source_revision:string;destination_repo_id:string;message:string;token:string},csrf:string) => request<{job:Job}>('/imports/huggingface',{method:'POST',body:JSON.stringify(data)},csrf),
  saveCard: (owner:string,repo:string,content:string,message:string,csrf:string) => request<ModelDetail|{job:Job}>(`/models/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/card`,{method:'PUT',body:JSON.stringify({content,message})},csrf)
};
