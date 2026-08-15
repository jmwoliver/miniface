<script lang="ts">
  import '@fontsource-variable/bricolage-grotesque/wght.css';
  import '@fontsource-variable/instrument-sans/wght.css';
  import '@fontsource/fragment-mono/400.css';
  import {
    Activity,
    ArrowLeft,
    ArrowRight,
    Check,
    CircleAlert,
    CircleCheck,
    CircleX,
    Clock3,
    CloudDownload,
    Code,
    Copy,
    Database,
    Eye,
    EyeOff,
    FileBox,
    FileText,
    FolderInput,
    Gauge,
    GitCommitHorizontal,
    HardDrive,
    Info,
    KeyRound,
    Layers,
    LayoutGrid,
    List as ListIcon,
    LoaderCircle,
    LogOut,
    Plus,
    RefreshCw,
    Search,
    Server,
    Settings2,
    ShieldCheck,
    SquareStack,
    SquareTerminal,
    TriangleAlert,
    Upload,
    X
  } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { api } from './api';
  import BrandMark from './BrandMark.svelte';
  import {
    dedupSavings,
    formatBytes,
    formatDate,
    formatRelativeDate,
    normalizeProgress,
    shortSha
  } from './format';
  import type { HuggingFaceModel, Job, ModelDetail, ModelSummary, Session, Storage } from './types';
  import './app.css';

  type ModelView = 'grid' | 'list';
  type ModelSort = 'updated' | 'name' | 'size';
  type JobFilter = 'all' | 'active' | 'completed';

  let session: Session | null = null;
  let bootError = '';
  let token = '';
  let showLoginToken = false;
  let loginError = '';
  let busy = false;
  let path = '/';
  let error = '';

  let models: ModelSummary[] | null = null;
  let search = '';
  let modelView: ModelView = 'grid';
  let modelSort: ModelSort = 'updated';

  let detail: ModelDetail | null = null;
  let tab = 'overview';
  let card = '';
  let cardMessage = 'Update model card';
  let cardFeedback = '';
  let cardFeedbackTone: 'success' | 'error' = 'success';

  let importSource: 'local' | 'huggingface' = 'local';
  let importPath = '';
  let repoId = '';
  let message = 'Import local model';
  let importFeedback = '';
  let importFeedbackTone: 'success' | 'error' = 'success';
  let queuedJob = '';
  let hubRepo = '';
  let hubRevision = 'main';
  let hubToken = '';
  let showHubToken = false;
  let hubResults: HuggingFaceModel[] = [];
  let hubSelected: HuggingFaceModel | null = null;
  let hubSearching = false;
  let hubSearchError = '';
  let hubSearchTimer: ReturnType<typeof setTimeout> | undefined;
  let hubSearchGeneration = 0;
  let lastHubDefault = '';

  let jobs: Job[] | null = null;
  let jobFilter: JobFilter = 'all';
  let cancelingJob = '';
  let jobActionError = '';
  let refreshingJobs = false;
  let expandedJob = '';

  let storage: Storage | null = null;
  let copied = '';
  let toast = '';
  let toastTimer: ReturnType<typeof setTimeout> | undefined;

  const nav = [
    { path: '/models', label: 'Models', icon: Layers },
    { path: '/imports', label: 'Import', icon: Upload },
    { path: '/jobs', label: 'Activity', icon: Activity },
    { path: '/storage', label: 'Storage', icon: HardDrive },
    { path: '/settings', label: 'Settings', icon: Settings2 }
  ];
  const detailTabs = [
    { label: 'Overview', slug: 'overview' },
    { label: 'Files', slug: 'files' },
    { label: 'Revisions', slug: 'revisions' },
    { label: 'Use model', slug: 'usage' },
    { label: 'Model card', slug: 'model-card' }
  ];

  $: parts = path.split('/').filter(Boolean);
  $: section = parts[0] || 'models';
  $: filtered = (models ?? [])
    .filter((model) =>
      `${model.owner}/${model.name} ${model.kind} ${model.architecture} ${model.quantization}`
        .toLowerCase()
        .includes(search.trim().toLowerCase())
    )
    .sort((left, right) => {
      if (modelSort === 'name') return `${left.owner}/${left.name}`.localeCompare(`${right.owner}/${right.name}`);
      if (modelSort === 'size') return right.logical_bytes - left.logical_bytes;
      return new Date(right.updated_at).valueOf() - new Date(left.updated_at).valueOf();
    });
  $: activeJobCount = (jobs ?? []).filter(isActiveJob).length;
  $: completedJobCount = (jobs ?? []).filter((job) => job.state === 'completed').length;
  $: visibleJobs = (jobs ?? []).filter((job) => {
    if (jobFilter === 'active') return isActiveJob(job);
    if (jobFilter === 'completed') return !isActiveJob(job);
    return true;
  });
  $: if (session?.authenticated) loadPath(path);

  onMount(() => {
    path = location.pathname;
    const savedView = localStorage.getItem('miniface:model-view');
    const savedSort = localStorage.getItem('miniface:model-sort');
    if (savedView === 'grid' || savedView === 'list') modelView = savedView;
    if (savedSort === 'updated' || savedSort === 'name' || savedSort === 'size') modelSort = savedSort;

    const pop = () => (path = location.pathname);
    addEventListener('popstate', pop);
    api.session().then((value) => (session = value)).catch((reason) => (bootError = reason.message));

    const polling = window.setInterval(() => {
      if (session?.authenticated && section === 'jobs' && activeJobCount > 0) void refreshJobs(false);
    }, 4000);

    return () => {
      removeEventListener('popstate', pop);
      clearInterval(polling);
      if (hubSearchTimer) clearTimeout(hubSearchTimer);
      if (toastTimer) clearTimeout(toastTimer);
    };
  });

  function go(to: string, scroll = true) {
    if (location.pathname !== to) history.pushState({}, '', to);
    path = to;
    if (scroll) requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  async function loadPath(value: string) {
    error = '';
    try {
      const route = value.split('/').filter(Boolean);
      if (!route.length || (route[0] === 'models' && route.length === 1)) {
        if (!models) models = await api.models();
      } else if (route[0] === 'models' && route.length >= 3) {
        const requested = detailTabs.find((candidate) => candidate.slug === (route[3] || 'overview'));
        tab = requested?.slug || 'overview';
        const requestedID = `${route[1]}/${route[2]}`;
        if (detail?.model.id !== requestedID) {
          detail = null;
          const next = await api.model(route[1], route[2]);
          if (path === value) {
            detail = next;
            card = next.card;
            cardFeedback = '';
          }
        }
      } else if (route[0] === 'jobs') {
        await refreshJobs(false);
      } else if (route[0] === 'storage') {
        storage = await api.storage();
      }
    } catch (reason) {
      error = reason instanceof Error ? reason.message : 'Unable to load this page';
    }
  }

  async function login() {
    busy = true;
    loginError = '';
    try {
      session = await api.login(token);
      token = '';
    } catch (reason) {
      loginError = reason instanceof Error ? reason.message : 'Sign in failed';
    } finally {
      busy = false;
    }
  }

  async function logout() {
    if (!session?.csrf_token) return;
    await api.logout(session.csrf_token);
    session = { authenticated: false };
    models = null;
    detail = null;
    jobs = null;
  }

  function setModelView(view: ModelView) {
    modelView = view;
    localStorage.setItem('miniface:model-view', view);
  }

  function saveModelSort() {
    localStorage.setItem('miniface:model-sort', modelSort);
  }

  function chooseImportSource(source: 'local' | 'huggingface') {
    if (source === importSource) return;
    const currentDefault = importSource === 'local' ? 'Import local model' : 'Import from Hugging Face';
    if (message === currentDefault) message = source === 'local' ? 'Import local model' : 'Import from Hugging Face';
    importSource = source;
    importFeedback = '';
    queuedJob = '';
  }

  function scheduleHubSearch() {
    if (hubSearchTimer) clearTimeout(hubSearchTimer);
    const query = hubRepo.trim();
    const generation = ++hubSearchGeneration;
    hubResults = [];
    hubSelected = null;
    hubSearchError = '';
    if (query.includes('/') && (!repoId || repoId === lastHubDefault)) {
      repoId = query;
      lastHubDefault = query;
    }
    if (query.length < 2) return;
    hubSearchTimer = setTimeout(async () => {
      hubSearching = true;
      try {
        const results = await api.searchHuggingFace(query);
        if (generation === hubSearchGeneration) hubResults = results;
      } catch (reason) {
        if (generation === hubSearchGeneration) {
          hubSearchError = reason instanceof Error ? reason.message : 'Search failed';
        }
      } finally {
        if (generation === hubSearchGeneration) hubSearching = false;
      }
    }, 250);
  }

  function selectHubModel(model: HuggingFaceModel) {
    const previous = lastHubDefault;
    hubRepo = model.id;
    hubSelected = model;
    hubResults = [];
    hubSearchGeneration++;
    if (!repoId || repoId === previous) {
      repoId = model.id;
      lastHubDefault = model.id;
    }
  }

  async function startImport() {
    if (!session?.csrf_token) return;
    busy = true;
    importFeedback = '';
    queuedJob = '';
    try {
      const response =
        importSource === 'local'
          ? await api.importLocal({ path: importPath, repo_id: repoId, message }, session.csrf_token)
          : await api.importHuggingFace(
              {
                source_repo_id: hubRepo,
                source_revision: hubRevision,
                destination_repo_id: repoId,
                message,
                token: hubToken
              },
              session.csrf_token
            );
      queuedJob = response.job.id;
      importFeedback = `${repoId} is queued and ready to track.`;
      importFeedbackTone = 'success';
      if (importSource === 'local') importPath = '';
      else hubToken = '';
      models = null;
      jobs = null;
    } catch (reason) {
      importFeedback = reason instanceof Error ? reason.message : 'Import failed';
      importFeedbackTone = 'error';
    } finally {
      busy = false;
    }
  }

  async function refreshJobs(showActivity = true) {
    if (showActivity) refreshingJobs = true;
    try {
      jobs = await api.jobs();
    } finally {
      refreshingJobs = false;
    }
  }

  async function cancelJob(job: Job) {
    if (!session?.csrf_token) return;
    cancelingJob = job.id;
    jobActionError = '';
    try {
      const canceled = await api.cancelJob(job.id, session.csrf_token);
      jobs = jobs?.map((candidate) => (candidate.id === canceled.id ? canceled : candidate)) ?? null;
    } catch (reason) {
      jobActionError = reason instanceof Error ? reason.message : 'Unable to cancel job';
    } finally {
      cancelingJob = '';
    }
  }

  async function saveCard() {
    if (!session?.csrf_token || !detail) return;
    busy = true;
    cardFeedback = '';
    try {
      const response = await api.saveCard(
        detail.model.owner,
        detail.model.name,
        card,
        cardMessage,
        session.csrf_token
      );
      if ('model' in response) detail = response;
      cardFeedback = 'Model card saved as a new immutable revision.';
      cardFeedbackTone = 'success';
    } catch (reason) {
      cardFeedback = reason instanceof Error ? reason.message : 'Save failed';
      cardFeedbackTone = 'error';
    } finally {
      busy = false;
    }
  }

  async function copyText(value: string, key: string) {
    try {
      await navigator.clipboard.writeText(value);
      copied = key;
      showToast('Copied to clipboard');
      window.setTimeout(() => {
        if (copied === key) copied = '';
      }, 1800);
    } catch {
      showToast('Clipboard access is unavailable');
    }
  }

  function showToast(value: string) {
    toast = value;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toast = ''), 2200);
  }

  function endpoint() {
    return location.origin;
  }

  function settingCode(kind: 'env' | 'download' | 'upload') {
    if (kind === 'env') {
      return `export HF_ENDPOINT=${endpoint()}\nexport HF_TOKEN=mf_your_administrator_token`;
    }
    if (kind === 'download') {
      return `export HF_ENDPOINT=${endpoint()}\nexport HF_TOKEN=mf_your_administrator_token\n\nhf download owner/model`;
    }
    return `export HF_ENDPOINT=${endpoint()}\nexport HF_TOKEN=mf_your_administrator_token\nexport HF_HUB_DISABLE_XET=1\n\nhf upload owner/model ./output --exclude README.md`;
  }

  function usage(kind: string) {
    if (!detail) return '';
    const id = `${detail.model.owner}/${detail.model.name}`;
    const sha = detail.model.sha;
    const url = endpoint();
    if (kind === 'env') return `export HF_ENDPOINT=${url}\nexport HF_TOKEN=mf_your_administrator_token`;
    if (kind === 'hf') return `HF_ENDPOINT=${url} HF_TOKEN=mf_your_administrator_token hf download ${id} --revision ${sha}`;
    if (kind === 'transformers') {
      return `import os\nos.environ["HF_ENDPOINT"] = "${url}"\nos.environ["HF_TOKEN"] = "mf_your_administrator_token"\nfrom transformers import AutoModelForCausalLM, AutoTokenizer\n\ntokenizer = AutoTokenizer.from_pretrained("${id}", revision="${sha}")\nmodel = AutoModelForCausalLM.from_pretrained("${id}", revision="${sha}", trust_remote_code=False)`;
    }
    if (
      kind === 'unsloth' &&
      detail.model.kind === 'adapter' &&
      detail.model.base_model &&
      detail.model.base_revision
    ) {
      return `import os\nos.environ["HF_ENDPOINT"] = "${url}"\nos.environ["HF_TOKEN"] = "mf_your_administrator_token"\nfrom unsloth import FastLanguageModel\nfrom peft import PeftModel\n\nmodel, tokenizer = FastLanguageModel.from_pretrained(\n    model_name="${detail.model.base_model}", revision="${detail.model.base_revision}",\n    use_exact_model_name=True, fast_inference=False,\n)\nmodel = PeftModel.from_pretrained(model, "${id}", revision="${sha}")`;
    }
    if (kind === 'unsloth') {
      return `import os\nos.environ["HF_ENDPOINT"] = "${url}"\nos.environ["HF_TOKEN"] = "mf_your_administrator_token"\nfrom unsloth import FastLanguageModel\n\nmodel, tokenizer = FastLanguageModel.from_pretrained(\n    model_name="${id}", revision="${sha}",\n    use_exact_model_name=True, fast_inference=False,\n)`;
    }
    return '';
  }

  function isActiveJob(job: Job) {
    return job.state === 'queued' || job.state === 'running';
  }

  function stateTone(state: string) {
    if (state === 'completed') return 'success';
    if (state === 'failed') return 'danger';
    if (state === 'canceled') return 'muted';
    return 'info';
  }

  function titleCase(value: string) {
    return value.replaceAll('_', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
  }

  function compactNumber(value: number) {
    return new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 }).format(value);
  }
</script>

<svelte:head>
  <title>Miniface · Your models, close at hand</title>
  <meta name="description" content="A private, local-first model registry" />
</svelte:head>

{#if !session}
  <main class="boot-screen">
    <div class="boot-brand"><BrandMark size={44} reversed /><span>miniface</span></div>
    {#if bootError}
      <CircleAlert size={24} />
      <p>{bootError}</p>
      <button class="button secondary" onclick={() => location.reload()}>Try again</button>
    {:else}
      <LoaderCircle class="spin" size={22} />
      <p>Opening your registry…</p>
    {/if}
  </main>
{:else if !session.authenticated}
  <main class="auth-shell">
    <section class="auth-story" aria-label="About Miniface">
      <div class="brand-lockup"><BrandMark size={44} reversed /><span>miniface</span></div>
      <div class="auth-message">
        <span class="kicker inverse">Local model registry</span>
        <h1>Keep your models<br />close at hand.</h1>
        <p>A quiet, private home for model versions, adapters, and artifacts—built to stay on your machine.</p>
      </div>
      <div class="auth-points">
        <span><ShieldCheck size={17} /> Private by default</span>
        <span><Database size={17} /> Deduplicated storage</span>
        <span><GitCommitHorizontal size={17} /> Immutable revisions</span>
      </div>
    </section>
    <section class="login-wrap">
      <div class="login-card">
        <div class="login-mark"><BrandMark size={42} /></div>
        <span class="kicker">Welcome back</span>
        <h2>Open Miniface</h2>
        <p class="subtle">Use the administrator token created when this server started.</p>
        <form onsubmit={(event) => { event.preventDefault(); login(); }}>
          <label for="token">Administrator token</label>
          <div class="password-field">
            <KeyRound size={17} />
            <input
              id="token"
              type={showLoginToken ? 'text' : 'password'}
              bind:value={token}
              required
              autocomplete="current-password"
              placeholder="mf_••••••••••••"
            />
            <button
              type="button"
              class="field-button"
              aria-label={showLoginToken ? 'Hide token' : 'Show token'}
              onclick={() => (showLoginToken = !showLoginToken)}
            >
              {#if showLoginToken}<EyeOff size={17} />{:else}<Eye size={17} />{/if}
            </button>
          </div>
          {#if loginError}<p class="inline-alert danger"><CircleX size={16} />{loginError}</p>{/if}
          <button class="button primary wide" disabled={busy}>
            {#if busy}<LoaderCircle class="spin" size={16} /> Signing in…{:else}Continue <ArrowRight size={16} />{/if}
          </button>
        </form>
        <p class="privacy-note"><ShieldCheck size={14} /> Exchanged for a secure session. Never stored in your browser.</p>
      </div>
    </section>
  </main>
{:else}
  <a class="skip-link" href="#main-content">Skip to content</a>
  <div class="app-shell">
    <aside class="sidebar">
      <button class="sidebar-brand" aria-label="Miniface models" onclick={() => go('/models')}>
        <BrandMark size={36} reversed />
        <span>miniface</span>
        <small>local</small>
      </button>
      <nav aria-label="Main navigation">
        {#each nav as item}
          {@const NavIcon = item.icon}
          <button class:active={section === item.path.slice(1)} aria-current={section === item.path.slice(1) ? 'page' : undefined} onclick={() => go(item.path)}>
            <NavIcon size={18} strokeWidth={1.9} />
            <span>{item.label}</span>
          </button>
        {/each}
      </nav>
      <div class="sidebar-foot">
        <div class="server-state"><i></i><span>Local server</span><small>Connected</small></div>
        <div class="account-row">
          <div class="avatar">{session.username?.slice(0, 1).toUpperCase() || 'A'}</div>
          <div><strong>{session.username || 'Administrator'}</strong><small>Administrator</small></div>
          <button class="icon-button dark" title="Sign out" aria-label="Sign out" onclick={logout}><LogOut size={17} /></button>
        </div>
      </div>
    </aside>

    <div class="mobile-bar">
      <button class="mobile-brand" aria-label="Miniface models" onclick={() => go('/models')}><BrandMark size={30} /><span>miniface</span></button>
      <button class="icon-button" aria-label="Import a model" onclick={() => go('/imports')}><Plus size={18} /></button>
    </div>

    <main id="main-content" class="content">
      {#if error}
        <div class="page-alert" role="alert">
          <CircleAlert size={19} />
          <div><strong>Something went wrong</strong><span>{error}</span></div>
          <button class="button secondary small" onclick={() => loadPath(path)}>Retry</button>
        </div>
      {/if}

      {#if !parts.length || (section === 'models' && parts.length === 1)}
        <header class="page-header">
          <div>
            <span class="kicker">Model library</span>
            <h1>Your models</h1>
            <p>Browse every model, adapter, and immutable revision stored on this server.</p>
          </div>
          <button class="button primary" onclick={() => go('/imports')}><Plus size={17} /> Import model</button>
        </header>

        <section class="library-toolbar" aria-label="Model filters">
          <label class="search-field">
            <Search size={18} />
            <input aria-label="Search models" bind:value={search} placeholder="Search your library" />
            {#if search}<button type="button" aria-label="Clear search" onclick={() => (search = '')}><X size={15} /></button>{/if}
          </label>
          <div class="toolbar-end">
            <span class="result-count">{filtered.length} {filtered.length === 1 ? 'model' : 'models'}</span>
            <label class="select-wrap" aria-label="Sort models">
              <select bind:value={modelSort} onchange={saveModelSort}>
                <option value="updated">Recently updated</option>
                <option value="name">Name</option>
                <option value="size">Largest first</option>
              </select>
            </label>
            <div class="view-switch" aria-label="Model view">
              <button class:active={modelView === 'grid'} aria-label="Grid view" aria-pressed={modelView === 'grid'} onclick={() => setModelView('grid')}><LayoutGrid size={16} /></button>
              <button class:active={modelView === 'list'} aria-label="List view" aria-pressed={modelView === 'list'} onclick={() => setModelView('list')}><ListIcon size={17} /></button>
            </div>
          </div>
        </section>

        {#if !models}
          <div class="empty-state compact"><LoaderCircle class="spin" size={24} /><h2>Loading your library</h2></div>
        {:else if !filtered.length}
          <div class="empty-state">
            <div class="empty-illustration"><SquareStack size={29} /></div>
            <h2>{search ? 'No models found' : 'A fresh place for your models'}</h2>
            <p>{search ? 'Try a model name, owner, type, or architecture.' : 'Import a folder from this machine or mirror a repository from Hugging Face.'}</p>
            {#if search}
              <button class="button secondary" onclick={() => (search = '')}>Clear search</button>
            {:else}
              <button class="button primary" onclick={() => go('/imports')}><Plus size={16} /> Import your first model</button>
            {/if}
          </div>
        {:else if modelView === 'grid'}
          <div class="model-grid">
            {#each filtered as model}
              <button class="model-card" onclick={() => go(`/models/${model.owner}/${model.name}`)}>
                <div class="model-card-top">
                  <div class="model-glyph"><FileBox size={20} /><i></i></div>
                  <span class={`status-dot ${model.validation_status === 'valid' ? 'success' : 'warning'}`} title={model.validation_status}></span>
                </div>
                <div class="model-title">
                  <span>{model.owner}</span>
                  <h2>{model.name}</h2>
                </div>
                <p class="architecture">{model.architecture || 'Architecture not detected'}</p>
                <div class="badges">
                  <span class="badge brand">{model.kind || 'unknown'}</span>
                  {#if model.quantization}<span class="badge">{model.quantization}</span>{/if}
                  <span class={`badge status-${model.validation_status === 'valid' ? 'success' : 'warning'}`}>{model.validation_status}</span>
                </div>
                {#if model.base_model}<p class="base-model"><GitCommitHorizontal size={14} /> Based on {model.base_model}</p>{/if}
                <dl class="model-facts">
                  <div><dt>Size</dt><dd>{formatBytes(model.logical_bytes)}</dd></div>
                  <div><dt>Files</dt><dd>{model.file_count}</dd></div>
                  <div><dt>Revision</dt><dd><code>{shortSha(model.sha)}</code></dd></div>
                </dl>
                <div class="model-card-foot"><span>Updated {formatRelativeDate(model.updated_at)}</span><ArrowRight size={16} /></div>
              </button>
            {/each}
          </div>
        {:else}
          <section class="model-list surface">
            <div class="model-list-head" aria-hidden="true"><span>Model</span><span>Type</span><span>Size</span><span>Updated</span><span></span></div>
            {#each filtered as model}
              <button class="model-row" onclick={() => go(`/models/${model.owner}/${model.name}`)}>
                <span class="model-row-name"><i><FileBox size={18} /></i><span><strong>{model.owner}/{model.name}</strong><small>{model.architecture || 'Architecture not detected'} · <code>{shortSha(model.sha)}</code></small></span></span>
                <span><span class="badge brand">{model.kind || 'unknown'}</span></span>
                <span class="row-value">{formatBytes(model.logical_bytes)}</span>
                <span class="row-value">{formatRelativeDate(model.updated_at)}</span>
                <span class="row-arrow"><ArrowRight size={16} /></span>
              </button>
            {/each}
          </section>
        {/if}

      {:else if section === 'models' && parts.length >= 3}
        {#if !detail}
          <div class="empty-state compact"><LoaderCircle class="spin" size={24} /><h2>Opening repository</h2></div>
        {:else}
          <button class="text-button breadcrumb" onclick={() => go('/models')}><ArrowLeft size={15} /> Model library</button>
          <header class="repository-header">
            <div class="repository-identity">
              <div class="repository-glyph"><FileBox size={24} /></div>
              <div>
                <div class="badges compact-badges">
                  <span class="badge brand">{detail.model.kind || 'unknown'}</span>
                  <span class={`badge status-${detail.model.validation_status === 'valid' ? 'success' : 'warning'}`}>{detail.model.validation_status}</span>
                </div>
                <h1><span>{detail.model.owner}/</span>{detail.model.name}</h1>
                <p>{detail.model.architecture || 'Unknown architecture'} · {formatBytes(detail.model.logical_bytes)} · {detail.model.file_count} files</p>
              </div>
            </div>
            <div class="repository-actions">
              <button class="button secondary" onclick={() => copyText(detail?.model.sha || '', 'revision')}>
                {#if copied === 'revision'}<Check size={15} /> Copied{:else}<Copy size={15} /> <code>{shortSha(detail.model.sha)}</code>{/if}
              </button>
              <button class="button primary" onclick={() => go(`/models/${parts[1]}/${parts[2]}/usage`, false)}><Code size={16} /> Use model</button>
            </div>
          </header>

          <div class="detail-tabs" role="tablist" aria-label="Repository sections">
            {#each detailTabs as item}
              <button
                role="tab"
                aria-selected={tab === item.slug}
                class:active={tab === item.slug}
                onclick={() => go(`/models/${parts[1]}/${parts[2]}${item.slug === 'overview' ? '' : `/${item.slug}`}`, false)}
              >{item.label}</button>
            {/each}
          </div>

          {#if tab === 'overview'}
            {#if detail.model.kind === 'adapter' && detail.model.base_model && !detail.model.base_revision}
              <div class="callout warning"><TriangleAlert size={18} /><div><strong>Base revision is not pinned</strong><span>Pin an immutable base revision before using this adapter for reproducible loads.</span></div></div>
            {/if}
            <div class="overview-grid">
              <section class="surface model-card-content">
                <div class="section-heading"><div><span class="kicker">README.md</span><h2>Model card</h2></div><button class="button ghost small" onclick={() => go(`/models/${parts[1]}/${parts[2]}/model-card`, false)}>Edit <ArrowRight size={14} /></button></div>
                {#if detail.card}
                  <div class="card-text">
                    {#each detail.card.split('\n') as line}
                      {#if line.startsWith('### ')}<h4>{line.slice(4)}</h4>
                      {:else if line.startsWith('## ')}<h3>{line.slice(3)}</h3>
                      {:else if line.startsWith('# ')}<h2>{line.slice(2)}</h2>
                      {:else if line.startsWith('- ')}<p class="card-list-item">{line.slice(2)}</p>
                      {:else if line.trim()}<p>{line}</p>
                      {:else}<span class="card-space"></span>{/if}
                    {/each}
                  </div>
                {:else}<div class="inline-empty"><FileText size={22} /><div><strong>No model card yet</strong><span>Add notes, limitations, and usage guidance for this model.</span></div></div>{/if}
              </section>
              <aside class="overview-side">
                <section class="surface metadata-card">
                  <div class="section-heading"><div><span class="kicker">At a glance</span><h2>Model details</h2></div></div>
                  <dl class="metadata-list">
                    <div><dt>Architecture</dt><dd>{detail.model.architecture || 'Unknown'}</dd></div>
                    <div><dt>Quantization</dt><dd>{detail.model.quantization || 'None detected'}</dd></div>
                    <div><dt>Last updated</dt><dd>{formatDate(detail.model.updated_at)}</dd></div>
                    <div><dt>Current revision</dt><dd><code>{shortSha(detail.model.sha)}</code></dd></div>
                    {#if detail.model.base_model}<div><dt>Base model</dt><dd class="metadata-reference">{detail.model.base_model}{#if detail.model.base_revision} <code>@{shortSha(detail.model.base_revision)}</code>{/if}</dd></div>{/if}
                    {#if detail.model.source_repository}<div><dt>Imported from</dt><dd class="metadata-reference">{detail.model.source_repository} <code>@{shortSha(detail.model.source_revision)}</code></dd></div>{/if}
                  </dl>
                </section>
                <button class="usage-shortcut" onclick={() => go(`/models/${parts[1]}/${parts[2]}/usage`, false)}>
                  <div><SquareTerminal size={20} /><span><strong>Ready to use</strong><small>Copy a pinned CLI or Python snippet</small></span></div><ArrowRight size={17} />
                </button>
              </aside>
            </div>
          {:else if tab === 'files'}
            <section class="surface data-panel">
              <div class="section-heading panel-padding"><div><span class="kicker">Repository contents</span><h2>Files</h2></div><span class="section-meta">{detail.files.length} entries · {formatBytes(detail.files.reduce((total, file) => total + file.size, 0))}</span></div>
              <div class="file-table">
                <div class="file-row file-head" aria-hidden="true"><span>Path</span><span>Storage</span><span>Size</span></div>
                {#each detail.files as file}
                  <div class="file-row"><span class="file-name"><FileText size={16} />{file.path}</span><span><span class="badge">{file.xet_hash ? 'Xet' : file.kind}</span></span><span>{formatBytes(file.size)}</span></div>
                {/each}
              </div>
            </section>
          {:else if tab === 'revisions'}
            <section class="surface revision-panel">
              <div class="section-heading"><div><span class="kicker">Immutable history</span><h2>Revisions</h2></div><span class="section-meta">{detail.revisions.length} total</span></div>
              <div class="timeline">
                {#each detail.revisions as revision, index}
                  <article>
                    <div class="timeline-marker"><GitCommitHorizontal size={16} /></div>
                    <div class="revision-body">
                      <div><h3>{revision.message || 'Untitled revision'}</h3>{#if index === 0}<span class="badge brand">current</span>{/if}</div>
                      <p>{revision.author} · {formatDate(revision.created_at)} · {revision.file_count} files</p>
                      <button class="commit-copy" onclick={() => copyText(revision.oid, `revision-${revision.oid}`)}><code>{revision.oid}</code>{#if copied === `revision-${revision.oid}`}<Check size={14} />{:else}<Copy size={14} />{/if}</button>
                    </div>
                  </article>
                {/each}
              </div>
            </section>
          {:else if tab === 'usage'}
            <div class="callout info"><Info size={18} /><div><strong>Reproducible by default</strong><span>Set <code>HF_ENDPOINT</code> before importing Hugging Face libraries. Every example pins revision <code>{shortSha(detail.model.sha)}</code>.</span></div></div>
            <section class="usage-grid">
              {#each [
                { title: 'Environment', description: 'Use once per shell', key: 'env' },
                { title: 'HF CLI', description: 'Download the pinned snapshot', key: 'hf' },
                { title: 'Transformers', description: 'Load with the Python client', key: 'transformers' },
                { title: 'Unsloth', description: detail.model.kind === 'adapter' ? 'Load base and adapter together' : 'Load for local training', key: 'unsloth' }
              ] as snippet}
                <article class:wide-code={snippet.key === 'transformers' || snippet.key === 'unsloth'} class="code-card">
                  <div><span><strong>{snippet.title}</strong><small>{snippet.description}</small></span><button class="copy-button" aria-label={`Copy ${snippet.title} example`} onclick={() => copyText(usage(snippet.key), `usage-${snippet.key}`)}>{#if copied === `usage-${snippet.key}`}<Check size={14} /> Copied{:else}<Copy size={14} /> Copy{/if}</button></div>
                  <pre><code>{usage(snippet.key)}</code></pre>
                </article>
              {/each}
            </section>
          {:else}
            <section class="editor-layout">
              <div class="surface editor-panel">
                <div class="section-heading"><div><span class="kicker">README.md</span><h2>Edit model card</h2></div><span class="badge">Markdown</span></div>
                <p class="section-description">Document intended use, training details, and limitations. Content stays on this Miniface server.</p>
                <label for="card">Markdown content</label>
                <textarea id="card" bind:value={card} rows="20" placeholder="# Model name&#10;&#10;Describe this model…"></textarea>
                <label for="card-message">Revision message</label>
                <input id="card-message" bind:value={cardMessage} />
                {#if cardFeedback}<p class={`inline-alert ${cardFeedbackTone}`}><CircleCheck size={16} />{cardFeedback}</p>{/if}
                <div class="form-actions"><span>Saving creates a new immutable revision.</span><button class="button primary" disabled={busy} onclick={saveCard}>{#if busy}<LoaderCircle class="spin" size={16} /> Saving…{:else}Save model card{/if}</button></div>
              </div>
            </section>
          {/if}
        {/if}

      {:else if section === 'imports'}
        <header class="page-header narrow-header">
          <div><span class="kicker">Add to your library</span><h1>Import a model</h1><p>Bring in a folder from this machine or mirror a pinned Hugging Face snapshot.</p></div>
        </header>
        <div class="import-layout">
          <section class="import-main">
            <div class="source-options" role="radiogroup" aria-label="Import source">
              <button role="radio" aria-checked={importSource === 'local'} class:active={importSource === 'local'} onclick={() => chooseImportSource('local')}>
                <span class="source-icon"><FolderInput size={21} /></span>
                <span><strong>Local folder</strong><small>Copy a directory from this server</small></span>
                <i></i>
              </button>
              <button role="radio" aria-checked={importSource === 'huggingface'} class:active={importSource === 'huggingface'} onclick={() => chooseImportSource('huggingface')}>
                <span class="source-icon"><CloudDownload size={21} /></span>
                <span><strong>Hugging Face</strong><small>Mirror an immutable snapshot</small></span>
                <i></i>
              </button>
            </div>

            <section class="surface import-form-card">
              <div class="section-heading"><div><span class="step-label">1</span><div><span class="kicker">Source</span><h2>{importSource === 'local' ? 'Choose a local folder' : 'Choose a Hugging Face model'}</h2></div></div></div>
              <form onsubmit={(event) => { event.preventDefault(); startImport(); }}>
                {#if importSource === 'local'}
                  <div class="field-group">
                    <label for="path">Directory path</label>
                    <input id="path" bind:value={importPath} required placeholder="/home/me/models/llama-adapter" />
                    <small>The path is read by the Miniface server. Symlinks and unsafe files are rejected.</small>
                  </div>
                {:else}
                  <div class="field-group">
                    <label for="hub-repo">Repository</label>
                    <div class="hub-picker">
                      <div class="input-with-icon"><Search size={17} /><input id="hub-repo" value={hubRepo} oninput={(event) => { hubRepo = event.currentTarget.value; scheduleHubSearch(); }} required pattern="[^/]+/[^/]+" autocomplete="off" placeholder="google/gemma-3-1b-it" aria-describedby="hub-help" />{#if hubSearching}<LoaderCircle class="spin field-loader" size={16} />{/if}</div>
                      {#if hubResults.length}
                        <div class="hub-results">
                          {#each hubResults as model}
                            <button type="button" onclick={() => selectHubModel(model)}>
                              <span><strong>{model.id}</strong><small>{model.pipeline_tag || 'Model'} · {compactNumber(model.downloads)} downloads</small></span>
                              <span><strong>{model.size_bytes === undefined ? 'Size unavailable' : `≈ ${formatBytes(model.size_bytes)}`}</strong><small class:restricted={model.gated}>{model.gated ? 'Token required' : 'Public'}</small></span>
                            </button>
                          {/each}
                        </div>
                      {/if}
                    </div>
                    <small id="hub-help">Search public models or enter an exact public, private, or gated repository ID.</small>
                  </div>
                  {#if hubSelected?.gated}
                    <div class="access-note warning"><ShieldCheck size={17} /><div><strong>Hugging Face access required</strong><span>Accept this model’s terms, then provide a read token below.</span></div></div>
                  {:else if hubSelected}
                    <div class="access-note success"><CircleCheck size={17} /><div><strong>Public repository</strong><span>No Hugging Face token is required.</span></div></div>
                  {/if}
                  {#if hubSearchError}<p class="inline-alert danger"><CircleX size={16} />{hubSearchError}</p>{/if}
                  <div class="field-row">
                    <div class="field-group">
                      <label for="hub-revision">Source revision</label>
                      <input id="hub-revision" bind:value={hubRevision} required placeholder="main" />
                      <small>Branch, tag, or commit.</small>
                    </div>
                    <div class="field-group">
                      <label for="hub-token">Access token <span class={hubSelected?.gated ? 'required-label' : 'optional-label'}>{hubSelected?.gated ? 'required' : 'optional'}</span></label>
                      <div class="password-field light"><input id="hub-token" type={showHubToken ? 'text' : 'password'} bind:value={hubToken} required={hubSelected?.gated === true} autocomplete="off" placeholder="hf_••••••••••••" /><button type="button" class="field-button" aria-label={showHubToken ? 'Hide token' : 'Show token'} onclick={() => (showHubToken = !showHubToken)}>{#if showHubToken}<EyeOff size={17} />{:else}<Eye size={17} />{/if}</button></div>
                      <small>Held only for the active job.</small>
                    </div>
                  </div>
                {/if}

                <div class="form-divider"></div>
                <div class="section-heading inline-section"><div><span class="step-label">2</span><div><span class="kicker">Destination</span><h2>Name the repository</h2></div></div></div>
                <div class="field-group">
                  <label for="repo">Miniface repository</label>
                  <input id="repo" bind:value={repoId} required pattern="[^/]+/[^/]+" placeholder="team/model-name" />
                  <small>Use an owner/name pair. This becomes the model’s permanent local ID.</small>
                </div>
                <div class="field-group">
                  <label for="message">Revision message</label>
                  <input id="message" bind:value={message} required />
                </div>

                {#if importFeedback}
                  <div class={`import-feedback ${importFeedbackTone}`} role="status">
                    {#if importFeedbackTone === 'success'}<CircleCheck size={19} />{:else}<CircleX size={19} />{/if}
                    <div><strong>{importFeedbackTone === 'success' ? 'Import queued' : 'Couldn’t start import'}</strong><span>{importFeedback}</span></div>
                    {#if queuedJob}<button type="button" class="button secondary small" onclick={() => go('/jobs')}>View activity <ArrowRight size={14} /></button>{/if}
                  </div>
                {/if}

                <div class="form-actions import-actions">
                  <span>{importSource === 'local' ? 'Files are copied into managed storage.' : 'The source revision is resolved once before transfer.'}</span>
                  <button class="button primary" disabled={busy}>{#if busy}<LoaderCircle class="spin" size={16} /> Queueing…{:else}{importSource === 'local' ? 'Import local folder' : 'Import from Hugging Face'} <ArrowRight size={16} />{/if}</button>
                </div>
              </form>
            </section>
          </section>

          <aside class="import-aside">
            <section class="surface flow-card">
              <span class="kicker">What happens next</span>
              <ol>
                <li><span>1</span><div><strong>{importSource === 'local' ? 'Validate files' : 'Resolve snapshot'}</strong><small>{importSource === 'local' ? 'Unsafe files and symlinks are rejected.' : 'The requested revision is pinned to one commit.'}</small></div></li>
                <li><span>2</span><div><strong>Store efficiently</strong><small>Existing Xet content is reused whenever possible.</small></div></li>
                <li><span>3</span><div><strong>Publish atomically</strong><small>The model appears only after every file is durable.</small></div></li>
              </ol>
            </section>
            <div class="privacy-card"><ShieldCheck size={18} /><div><strong>Private by design</strong><span>Imports stay between this browser, your Miniface server, and the source you choose.</span></div></div>
          </aside>
        </div>

      {:else if section === 'jobs'}
        <header class="page-header">
          <div><span class="kicker">Background work</span><h1>Activity</h1><p>Imports, indexing, and maintenance in one compact history.</p></div>
          <button class="button secondary" disabled={refreshingJobs} onclick={() => refreshJobs()}><RefreshCw class={refreshingJobs ? 'spin' : ''} size={16} /> Refresh</button>
        </header>
        {#if jobActionError}<p class="inline-alert danger page-inline-alert"><CircleX size={16} />{jobActionError}</p>{/if}
        {#if !jobs}
          <div class="empty-state compact"><LoaderCircle class="spin" size={24} /><h2>Loading activity</h2></div>
        {:else if !jobs.length}
          <div class="empty-state"><div class="empty-illustration"><Activity size={28} /></div><h2>Nothing running yet</h2><p>Imports and other background work will appear here.</p><button class="button primary" onclick={() => go('/imports')}><Plus size={16} /> Start an import</button></div>
        {:else}
          <div class="activity-summary">
            <div><span class="activity-icon active"><LoaderCircle size={18} /></span><span><strong>{activeJobCount}</strong><small>Active</small></span></div>
            <div><span class="activity-icon done"><CircleCheck size={18} /></span><span><strong>{completedJobCount}</strong><small>Completed</small></span></div>
            <p>Job history is kept as a lightweight audit log; finished work stays collapsed to a single row.</p>
          </div>
          <div class="activity-toolbar">
            <div class="filter-tabs" aria-label="Filter activity">
              <button class:active={jobFilter === 'all'} onclick={() => (jobFilter = 'all')}>All <span>{jobs.length}</span></button>
              <button class:active={jobFilter === 'active'} onclick={() => (jobFilter = 'active')}>Active <span>{activeJobCount}</span></button>
              <button class:active={jobFilter === 'completed'} onclick={() => (jobFilter = 'completed')}>History <span>{jobs.length - activeJobCount}</span></button>
            </div>
            <span class="polling-note">{#if activeJobCount}<i></i> Updates automatically{:else}All caught up{/if}</span>
          </div>
          {#if !visibleJobs.length}
            <div class="empty-state compact"><CircleCheck size={24} /><h2>No jobs in this view</h2></div>
          {:else}
            <section class="jobs-list surface">
              {#each visibleJobs as job}
                <article class:expanded={expandedJob === job.id} class="job-item">
                  <div class="job-main-row">
                    <span class={`job-state status-${stateTone(job.state)}`}>
                      {#if job.state === 'completed'}<CircleCheck size={17} />{:else if job.state === 'failed'}<CircleX size={17} />{:else if job.state === 'canceled'}<X size={17} />{:else if job.state === 'queued'}<Clock3 size={17} />{:else}<LoaderCircle class="spin" size={17} />{/if}
                    </span>
                    <div class="job-name"><strong>{job.repo_id || job.id}</strong><span><span class="badge">{titleCase(job.type)}</span> {titleCase(job.state)}</span></div>
                    <div class="job-progress-cell">
                      <div><span>{isActiveJob(job) ? `${Math.round(normalizeProgress(job.progress))}%` : titleCase(job.state)}</span>{#if job.total_bytes}<small>{formatBytes(job.current_bytes || 0)} / {formatBytes(job.total_bytes)}</small>{/if}</div>
                      {#if isActiveJob(job)}<div class="progress"><i style={`width:${normalizeProgress(job.progress)}%`}></i></div>{/if}
                    </div>
                    <time datetime={job.updated_at}>{formatRelativeDate(job.updated_at)}</time>
                    <div class="job-actions">
                      {#if isActiveJob(job)}<button class="button danger small" disabled={cancelingJob === job.id} onclick={() => cancelJob(job)}>{cancelingJob === job.id ? 'Canceling…' : 'Cancel'}</button>{/if}
                      {#if job.error}<button class="details-button" aria-label={expandedJob === job.id ? 'Hide error details' : 'Show error details'} onclick={() => (expandedJob = expandedJob === job.id ? '' : job.id)}><CircleAlert size={15} /> Details</button>{/if}
                    </div>
                  </div>
                  {#if job.error && expandedJob === job.id}<div class="job-detail"><strong>Error details</strong><code>{job.error}</code><span>Job ID: {job.id}</span></div>{/if}
                </article>
              {/each}
            </section>
          {/if}
        {/if}

      {:else if section === 'storage'}
        <header class="page-header narrow-header">
          <div><span class="kicker">Local infrastructure</span><h1>Storage</h1><p>Understand what your library contains and how efficiently it fits on disk.</p></div>
        </header>
        {#if !storage}
          <div class="empty-state compact"><LoaderCircle class="spin" size={24} /><h2>Reading storage</h2></div>
        {:else}
          <div class="storage-stats">
            <article class="surface stat-card"><span class="stat-icon pine"><Database size={19} /></span><div><span>Logical library</span><strong>{formatBytes(storage.logical_bytes)}</strong><small>Visible repository content</small></div></article>
            <article class="surface stat-card"><span class="stat-icon ink"><HardDrive size={19} /></span><div><span>On disk</span><strong>{formatBytes(storage.physical_bytes)}</strong><small>Physical bytes stored</small></div></article>
            <article class="surface stat-card"><span class="stat-icon sage"><Gauge size={19} /></span><div><span>Deduplication</span><strong>{storage.dedup_ratio.toFixed(2)}×</strong><small>{dedupSavings(storage.dedup_ratio).toFixed(0)}% physical savings</small></div></article>
          </div>
          <div class="storage-grid">
            <section class="surface efficiency-card">
              <div class="section-heading"><div><span class="kicker">Xet efficiency</span><h2>Same library, less disk</h2></div><span class={`badge status-${storage.dedup_ratio > 1 ? 'success' : 'muted'}`}>{storage.profile}</span></div>
              <p>Miniface reuses matching content across files and revisions instead of storing it twice.</p>
              <div class="storage-bars">
                <div><span><strong>Logical</strong><small>{formatBytes(storage.logical_bytes)}</small></span><i><b style="width:100%"></b></i></div>
                <div><span><strong>Physical</strong><small>{formatBytes(storage.physical_bytes)}</small></span><i><b class="physical" style={`width:${Math.max(4, Math.min(100, storage.logical_bytes ? (storage.physical_bytes / storage.logical_bytes) * 100 : 0))}%`}></b></i></div>
              </div>
              <div class="savings-note"><span>{dedupSavings(storage.dedup_ratio).toFixed(0)}%</span><p><strong>less disk used</strong><small>Compared with storing all logical bytes independently.</small></p></div>
            </section>
            <section class="surface inventory-card">
              <div class="section-heading"><div><span class="kicker">Inventory</span><h2>Storage profile</h2></div></div>
              <dl>
                <div><dt><Layers size={16} />Repositories</dt><dd>{storage.repositories}</dd></div>
                <div><dt><FileText size={16} />Ordinary objects</dt><dd>{storage.ordinary_objects.toLocaleString()}</dd></div>
                <div><dt><SquareStack size={16} />Xet objects</dt><dd>{storage.xet_objects.toLocaleString()}</dd></div>
                <div><dt><Server size={16} />Profile</dt><dd>{titleCase(storage.profile)}</dd></div>
              </dl>
            </section>
          </div>
        {/if}

      {:else if section === 'settings'}
        <header class="page-header narrow-header"><div><span class="kicker">Client setup</span><h1>Connect your tools</h1><p>Point Hugging Face clients, Transformers, and training tools at this Miniface server.</p></div></header>
        <section class="endpoint-hero">
          <div><span class="endpoint-icon"><Server size={21} /></span><span><small>Server endpoint</small><strong>{endpoint()}</strong></span></div>
          <button class="button inverse" onclick={() => copyText(endpoint(), 'endpoint')}>{#if copied === 'endpoint'}<Check size={15} /> Copied{:else}<Copy size={15} /> Copy endpoint{/if}</button>
        </section>
        <div class="settings-layout">
          <section class="settings-main">
            {#each [
              { key: 'env', eyebrow: 'Start here', title: 'Set your environment', description: 'Run this before starting Python or the hf CLI.', icon: KeyRound },
              { key: 'download', eyebrow: 'Xet-enabled reads', title: 'Download a model', description: 'Miniface uses Xet for efficient, deduplicated transfers.', icon: CloudDownload },
              { key: 'upload', eyebrow: 'Basic LFS writes', title: 'Upload training output', description: 'Use a fresh process with native Xet writes disabled.', icon: Upload }
            ] as setup}
              {@const SetupIcon = setup.icon}
              <article class="surface setup-card">
                <div class="setup-heading"><span><SetupIcon size={19} /></span><div><small>{setup.eyebrow}</small><h2>{setup.title}</h2><p>{setup.description}</p></div></div>
                {#if setup.key === 'upload'}<div class="mini-warning"><TriangleAlert size={16} /><span><strong>Use a fresh uploader process.</strong> The client reads <code>HF_HUB_DISABLE_XET</code> at import time.</span></div>{/if}
                <div class="code-block"><button class="copy-button" aria-label={`Copy ${setup.title} commands`} onclick={() => copyText(settingCode(setup.key as 'env' | 'download' | 'upload'), `setting-${setup.key}`)}>{#if copied === `setting-${setup.key}`}<Check size={14} /> Copied{:else}<Copy size={14} /> Copy{/if}</button><pre><code>{settingCode(setup.key as 'env' | 'download' | 'upload')}</code></pre></div>
              </article>
            {/each}
          </section>
          <aside class="settings-aside">
            <section class="surface token-note"><ShieldCheck size={20} /><h2>Your token stays private</h2><p>Use the administrator token printed on first startup as <code>HF_TOKEN</code>. Miniface never sends it back to this page after sign-in.</p></section>
            <section class="surface docs-note"><FileText size={20} /><h2>Model cards</h2><p>Edit root model cards inside Miniface to avoid public Hugging Face YAML validation.</p></section>
          </aside>
        </div>
      {:else}
        <div class="empty-state"><div class="empty-illustration"><CircleAlert size={28} /></div><h2>Page not found</h2><p>This part of Miniface doesn’t exist.</p><button class="button primary" onclick={() => go('/models')}>Back to models</button></div>
      {/if}
    </main>
  </div>

  {#if toast}<div class="toast" role="status"><CircleCheck size={16} />{toast}</div>{/if}
{/if}
