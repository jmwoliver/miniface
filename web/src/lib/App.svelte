<script lang="ts">
  import '@fontsource-variable/bricolage-grotesque/wght.css';
  import '@fontsource-variable/instrument-sans/wght.css';
  import '@fontsource/fragment-mono/400.css';
  import {
    Activity,
    ArrowLeft,
    ArrowRight,
    Check,
    ChevronRight,
    CircleAlert,
    CircleCheck,
    CircleX,
    Clock3,
    CloudDownload,
    Code,
    Copy,
    Database,
    Download,
    Eye,
    EyeOff,
    FileBox,
    FileText,
    Folder,
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
    TriangleAlert,
    Trash2,
    Upload,
    X
  } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { api } from './api';
  import BrandMark from './BrandMark.svelte';
  import {
    formatBytes,
    formatDate,
    formatRelativeDate,
    normalizeProgress,
    shortSha
  } from './format';
  import type {
    FileEntry,
    FilePreview,
    HuggingFaceModel,
    Job,
    ModelDetail,
    ModelSummary,
    PersonalAccessToken,
    ServerInfo,
    Session,
    Storage
  } from './types';
  import './app.css';

  type ModelView = 'grid' | 'list';
  type ModelSort = 'updated' | 'name' | 'size';
  type JobFilter = 'all' | 'active' | 'completed';
  type BrowseEntry = { type: 'directory'; name: string; path: string } | ({ type: 'file'; name: string } & FileEntry);

  let session: Session | null = null;
  let bootError = '';
  let credential = '';
  let password = '';
  let passwordConfirmation = '';
  let showLoginToken = false;
  let loginError = '';
  let busy = false;
  let path = '/';
  let error = '';
  let connectionLost = false;

  let models: ModelSummary[] | null = null;
  let search = '';
  let modelView: ModelView = 'grid';
  let modelSort: ModelSort = 'updated';

  let detail: ModelDetail | null = null;
  let tab = 'overview';
  let selectedRevision = '';
  let currentDirectory = '';
  let fileSearch = '';
  let selectedFile: FilePreview | null = null;
  let fileLoading = false;
  let card = '';
  let cardMessage = 'Update model card';
  let cardFeedback = '';
  let cardFeedbackTone: 'success' | 'error' = 'success';

  let importSource: 'local' | 'huggingface' = 'local';
  let localDraft = { path: '', repository: '', message: 'Import local model' };
  let huggingFaceDraft = {
    sourceRepository: '',
    sourceRevision: 'main',
    accessToken: '',
    destinationRepository: '',
    message: 'Import from Hugging Face'
  };
  let importSubmitting = false;
  let importFeedback = '';
  let importFeedbackTone: 'success' | 'error' = 'success';
  let showHubToken = false;
  let hubResults: HuggingFaceModel[] = [];
  let hubSelected: HuggingFaceModel | null = null;
  let hubSearching = false;
  let hubSearchError = '';
  let hubSearchTimer: ReturnType<typeof setTimeout> | undefined;
  let hubSearchGeneration = 0;
  let lastHubDefault = '';
  let activeHubResult = -1;
  let hubPopupOpen = false;
  let hubPickerElement: HTMLDivElement;

  let jobs: Job[] | null = null;
  let jobFilter: JobFilter = 'all';
  let cancelingJob = '';
  let jobActionError = '';
  let refreshingJobs = false;
  let expandedJob = '';

  let storage: Storage | null = null;
  let serverInfo: ServerInfo | null = null;
  let personalTokens: PersonalAccessToken[] | null = null;
  let newTokenName = 'Local CLI';
  let newTokenScope: 'read' | 'write' = 'write';
  let newTokenExpiry = 0;
  let createdToken = '';
  let tokenFeedback = '';
  let changingPassword = false;
  let currentPassword = '';
  let newPassword = '';
  let passwordFeedback = '';
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
    { label: 'Usage', slug: 'usage' },
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
  $: fileRows = repositoryFileRows(detail?.files ?? [], currentDirectory, fileSearch);
  $: if (session?.authenticated) loadPath(path);
  $: if (section !== 'imports' && huggingFaceDraft.accessToken) huggingFaceDraft.accessToken = '';
  $: if (section !== 'settings' && createdToken) createdToken = '';
  $: if (section !== 'settings' && currentPassword) currentPassword = '';
  $: if (section !== 'settings' && newPassword) newPassword = '';

  onMount(() => {
    path = location.pathname;
    const savedView = localStorage.getItem('miniface:model-view');
    const savedSort = localStorage.getItem('miniface:model-sort');
    if (savedView === 'grid' || savedView === 'list') modelView = savedView;
    if (savedSort === 'updated' || savedSort === 'name' || savedSort === 'size') modelSort = savedSort;

    const pop = () => (path = location.pathname);
    const connection = (event: Event) => (connectionLost = !(event as CustomEvent<boolean>).detail);
    const outsidePicker = (event: PointerEvent) => {
      if (hubPickerElement && !hubPickerElement.contains(event.target as Node)) closeHubPopup();
    };
    addEventListener('popstate', pop);
    addEventListener('miniface:connection', connection);
    document.addEventListener('pointerdown', outsidePicker);
    api.session().then((value) => (session = value)).catch((reason) => (bootError = reason.message));

    const polling = window.setInterval(() => {
      if (connectionLost) {
        void api.session().then((value) => {
          if (!value.authenticated) session = value;
        }).catch(() => undefined);
      } else if (session?.authenticated && section === 'jobs' && activeJobCount > 0) {
        void refreshJobs(false);
      }
    }, 4000);

    return () => {
      removeEventListener('popstate', pop);
      removeEventListener('miniface:connection', connection);
      document.removeEventListener('pointerdown', outsidePicker);
      clearInterval(polling);
      if (hubSearchTimer) clearTimeout(hubSearchTimer);
      if (toastTimer) clearTimeout(toastTimer);
    };
  });

  function go(to: string, scroll = true) {
    if (section === 'imports' && !to.startsWith('/imports')) huggingFaceDraft.accessToken = '';
    if (section === 'settings' && !to.startsWith('/settings')) {
      createdToken = '';
      currentPassword = '';
      newPassword = '';
    }
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
            selectedRevision = next.model.sha;
            currentDirectory = '';
            fileSearch = '';
            selectedFile = null;
            card = next.card;
            cardFeedback = '';
          }
        }
      } else if (route[0] === 'jobs') {
        await refreshJobs(false);
        if (route[1]) {
          expandedJob = route[1];
          requestAnimationFrame(() => document.getElementById(`job-${route[1]}`)?.scrollIntoView({ block: 'center' }));
        }
      } else if (route[0] === 'storage') {
        storage = await api.storage();
      } else if (route[0] === 'settings') {
        [serverInfo, personalTokens] = await Promise.all([api.server(), api.tokens()]);
      }
    } catch (reason) {
      error = reason instanceof Error ? reason.message : 'Unable to load this page';
    }
  }

  async function login() {
    busy = true;
    loginError = '';
    try {
      if (session?.setup_required) {
        if (password !== passwordConfirmation) throw new Error('Passwords do not match');
        session = await api.setup(credential, password);
      } else {
        session = await api.login(password);
      }
      credential = '';
      password = '';
      passwordConfirmation = '';
    } catch (reason) {
      loginError = reason instanceof Error ? reason.message : 'Sign in failed';
    } finally {
      busy = false;
    }
  }

  async function logout() {
    if (!session?.csrf_token) return;
    await api.logout(session.csrf_token);
    session = { authenticated: false, setup_required: false };
    models = null;
    detail = null;
    jobs = null;
    createdToken = '';
    currentPassword = '';
    newPassword = '';
    huggingFaceDraft.accessToken = '';
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
    importSource = source;
    importFeedback = '';
    closeHubPopup();
  }

  function scheduleHubSearch() {
    if (hubSearchTimer) clearTimeout(hubSearchTimer);
    const query = huggingFaceDraft.sourceRepository.trim();
    const generation = ++hubSearchGeneration;
    hubSearching = false;
    hubResults = [];
    activeHubResult = -1;
    hubPopupOpen = false;
    hubSelected = null;
    hubSearchError = '';
    if (!huggingFaceDraft.destinationRepository || huggingFaceDraft.destinationRepository === lastHubDefault) {
      const automaticDestination = query.includes('/') ? query : '';
      huggingFaceDraft.destinationRepository = automaticDestination;
      lastHubDefault = automaticDestination;
    }
    if (query.length < 2) return;
    hubSearchTimer = setTimeout(async () => {
      hubSearching = true;
      try {
        const results = await api.searchHuggingFace(query);
        if (generation === hubSearchGeneration) {
          hubResults = results;
          hubPopupOpen = results.length > 0;
        }
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
    huggingFaceDraft.sourceRepository = model.id;
    hubSelected = model;
    closeHubPopup();
    hubSearchGeneration++;
    if (!huggingFaceDraft.destinationRepository || huggingFaceDraft.destinationRepository === previous) {
      huggingFaceDraft.destinationRepository = model.id;
      lastHubDefault = model.id;
    }
  }

  function closeHubPopup() {
    hubPopupOpen = false;
    activeHubResult = -1;
  }

  function setActiveHubResult(index: number) {
    activeHubResult = Math.max(0, Math.min(hubResults.length - 1, index));
    requestAnimationFrame(() => document.getElementById(`hub-option-${activeHubResult}`)?.scrollIntoView({ block: 'nearest' }));
  }

  function handleHubKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' && hubResults.length) {
      event.preventDefault();
      hubPopupOpen = true;
      setActiveHubResult(activeHubResult < 0 ? 0 : activeHubResult + 1);
    } else if (event.key === 'ArrowUp' && hubResults.length) {
      event.preventDefault();
      hubPopupOpen = true;
      setActiveHubResult(activeHubResult < 0 ? 0 : activeHubResult - 1);
    } else if (event.key === 'Enter' && hubPopupOpen && activeHubResult >= 0) {
      event.preventDefault();
      selectHubModel(hubResults[activeHubResult]);
    } else if (event.key === 'Escape' && hubPopupOpen) {
      event.preventDefault();
      closeHubPopup();
    }
  }

  async function startImport() {
    if (!session?.csrf_token || importSubmitting) return;
    importSubmitting = true;
    importFeedback = '';
    try {
      const response =
        importSource === 'local'
          ? await api.importLocal({ path: localDraft.path, repo_id: localDraft.repository, message: localDraft.message }, session.csrf_token)
          : await api.importHuggingFace(
              {
                source_repo_id: huggingFaceDraft.sourceRepository,
                source_revision: huggingFaceDraft.sourceRevision,
                destination_repo_id: huggingFaceDraft.destinationRepository,
                message: huggingFaceDraft.message,
                token: huggingFaceDraft.accessToken
              },
              session.csrf_token
            );
      if (importSource === 'local') localDraft.path = '';
      else huggingFaceDraft.accessToken = '';
      models = null;
      jobs = [response.job];
      go(`/jobs/${response.job.id}`);
    } catch (reason) {
      importFeedback = reason instanceof Error ? reason.message : 'Import failed';
      importFeedbackTone = 'error';
    } finally {
      importSubmitting = false;
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

  function repositoryFileRows(files: FileEntry[], directory: string, query: string): BrowseEntry[] {
    const searchValue = query.trim().toLowerCase();
    if (searchValue) {
      return files
        .filter((file) => file.path.toLowerCase().includes(searchValue))
        .map((file) => ({ ...file, type: 'file' as const, name: file.path }));
    }
    const directories = new Map<string, BrowseEntry>();
    const rows: BrowseEntry[] = [];
    for (const file of files) {
      if (!file.path.startsWith(directory)) continue;
      const remainder = file.path.slice(directory.length);
      const separator = remainder.indexOf('/');
      if (separator >= 0) {
        const name = remainder.slice(0, separator);
        const path = `${directory}${name}/`;
        directories.set(path, { type: 'directory', name, path });
      } else {
        rows.push({ ...file, type: 'file', name: remainder });
      }
    }
    return [...directories.values(), ...rows].sort((left, right) => {
      if (left.type !== right.type) return left.type === 'directory' ? -1 : 1;
      return left.name.localeCompare(right.name);
    });
  }

  function openDirectory(directory: string) {
    currentDirectory = directory;
    selectedFile = null;
  }

  async function openFile(file: FileEntry) {
    if (!detail) return;
    fileLoading = true;
    try {
      selectedFile = await api.filePreview(detail.model.owner, detail.model.name, file.path, selectedRevision);
    } catch (reason) {
      error = reason instanceof Error ? reason.message : 'Unable to open file';
    } finally {
      fileLoading = false;
    }
  }

  async function selectRevision(revision: string) {
    if (!detail || revision === selectedRevision) return;
    const { owner, name } = detail.model;
    error = '';
    try {
      detail = await api.model(owner, name, revision);
      selectedRevision = detail.model.sha;
      currentDirectory = '';
      selectedFile = null;
    } catch (reason) {
      error = reason instanceof Error ? reason.message : 'Unable to load revision';
    }
  }

  function downloadURL(filePath: string) {
    if (!detail) return '';
    return api.fileDownloadURL(detail.model.owner, detail.model.name, filePath, selectedRevision);
  }

  async function createPersonalToken() {
    if (!session?.csrf_token || !newTokenName.trim()) return;
    tokenFeedback = '';
    try {
      const result = await api.createToken(
        { name: newTokenName, scopes: [newTokenScope], expires_in_days: newTokenExpiry },
        session.csrf_token
      );
      createdToken = result.token;
      personalTokens = [result.token_details, ...(personalTokens ?? [])];
      tokenFeedback = 'Copy this token now. It will not be shown again.';
    } catch (reason) {
      tokenFeedback = reason instanceof Error ? reason.message : 'Unable to create token';
    }
  }

  async function revokePersonalToken(id: string) {
    if (!session?.csrf_token) return;
    await api.revokeToken(id, session.csrf_token);
    personalTokens = personalTokens?.map((token) => token.id === id ? { ...token, revoked_at: new Date().toISOString() } : token) ?? null;
  }

  async function updatePassword() {
    if (!session?.csrf_token || changingPassword) return;
    changingPassword = true;
    passwordFeedback = '';
    try {
      session = await api.changePassword(currentPassword, newPassword, session.csrf_token);
      currentPassword = '';
      newPassword = '';
      passwordFeedback = 'Password updated. Other browser sessions were signed out.';
    } catch (reason) {
      passwordFeedback = reason instanceof Error ? reason.message : 'Unable to change password';
    } finally {
      changingPassword = false;
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
      return `export HF_ENDPOINT=${endpoint()}\nexport HF_TOKEN=mf_pat_your_token`;
    }
    if (kind === 'download') {
      return `export HF_ENDPOINT=${endpoint()}\nexport HF_TOKEN=mf_pat_your_token\n\nhf download owner/model`;
    }
    return `export HF_ENDPOINT=${endpoint()}\nexport HF_TOKEN=mf_pat_your_token\nexport HF_HUB_DISABLE_XET=1\n\nhf upload owner/model ./output --exclude README.md`;
  }

  function usage(kind: string) {
    if (!detail) return '';
    const id = `${detail.model.owner}/${detail.model.name}`;
    const sha = detail.model.sha;
    const url = endpoint();
    if (kind === 'env') return `export HF_ENDPOINT=${url}\nexport HF_TOKEN=mf_pat_your_token`;
    if (kind === 'hf') return `HF_ENDPOINT=${url} HF_TOKEN=mf_pat_your_token hf download ${id} --revision ${sha}`;
    if (kind === 'transformers') {
      return `import os\nos.environ["HF_ENDPOINT"] = "${url}"\nos.environ["HF_TOKEN"] = "mf_pat_your_token"\nfrom transformers import AutoModelForCausalLM, AutoTokenizer\n\ntokenizer = AutoTokenizer.from_pretrained("${id}", revision="${sha}")\nmodel = AutoModelForCausalLM.from_pretrained("${id}", revision="${sha}", trust_remote_code=False)`;
    }
    if (
      kind === 'unsloth' &&
      detail.model.kind === 'adapter' &&
      detail.model.base_model &&
      detail.model.base_revision
    ) {
      return `import os\nos.environ["HF_ENDPOINT"] = "${url}"\nos.environ["HF_TOKEN"] = "mf_pat_your_token"\nfrom unsloth import FastLanguageModel\nfrom peft import PeftModel\n\nmodel, tokenizer = FastLanguageModel.from_pretrained(\n    model_name="${detail.model.base_model}", revision="${detail.model.base_revision}",\n    use_exact_model_name=True, fast_inference=False,\n)\nmodel = PeftModel.from_pretrained(model, "${id}", revision="${sha}")`;
    }
    if (kind === 'unsloth') {
      return `import os\nos.environ["HF_ENDPOINT"] = "${url}"\nos.environ["HF_TOKEN"] = "mf_pat_your_token"\nfrom unsloth import FastLanguageModel\n\nmodel, tokenizer = FastLanguageModel.from_pretrained(\n    model_name="${id}", revision="${sha}",\n    use_exact_model_name=True, fast_inference=False,\n)`;
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
    return value.replaceAll('_', ' ').replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
  }

  function jobSource(type: string) {
    return type === 'huggingface-import' ? 'Hugging Face' : type === 'import' ? 'Local folder' : titleCase(type);
  }

  function compactNumber(value: number) {
    return new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 }).format(value);
  }
</script>

<svelte:head>
  <title>Miniface</title>
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
    <section class="login-wrap">
      <div class="login-card">
        <div class="login-brand"><BrandMark size={42} /><span>miniface</span></div>
        <h2>{session.setup_required ? 'Set up administrator' : 'Sign in'}</h2>
        <p class="subtle">{session.setup_required ? 'Enter the one-time setup secret, then create your browser password.' : 'Sign in with your administrator password.'}</p>
        <form onsubmit={(event) => { event.preventDefault(); login(); }}>
          {#if session.setup_required}
            <label for="credential">Setup secret</label>
            <div class="password-field">
              <KeyRound size={17} />
              <input id="credential" type={showLoginToken ? 'text' : 'password'} bind:value={credential} required autocomplete="one-time-code" placeholder="mf_setup_••••••••" />
              <button type="button" class="field-button" aria-label={showLoginToken ? 'Hide secret' : 'Show secret'} onclick={() => (showLoginToken = !showLoginToken)}>{#if showLoginToken}<EyeOff size={17} />{:else}<Eye size={17} />{/if}</button>
            </div>
          {/if}
          <label for="password">{session.setup_required ? 'New password' : 'Password'}</label>
          <div class="password-field">
            <KeyRound size={17} />
            <input id="password" type="password" bind:value={password} required minlength={session.setup_required ? 12 : undefined} autocomplete={session.setup_required ? 'new-password' : 'current-password'} />
          </div>
          {#if session.setup_required}
            <label for="password-confirmation">Confirm password</label>
            <input id="password-confirmation" type="password" bind:value={passwordConfirmation} required minlength="12" autocomplete="new-password" />
          {/if}
          {#if loginError}<p class="inline-alert danger"><CircleX size={16} />{loginError}</p>{/if}
          <button class="button primary wide" disabled={busy}>
            {#if busy}<LoaderCircle class="spin" size={16} /> Working…{:else}{session.setup_required ? 'Create administrator' : 'Sign in'} <ArrowRight size={16} />{/if}
          </button>
        </form>
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
      {#if connectionLost}
        <div class="connection-banner" role="alert"><CircleAlert size={16} /> Connection lost — retrying</div>
      {/if}
      {#if error}
        <div class="page-alert" role="alert">
          <CircleAlert size={19} />
          <div><strong>Something went wrong</strong><span>{error}</span></div>
          <button class="button secondary small" onclick={() => loadPath(path)}>Retry</button>
        </div>
      {/if}

      {#if !parts.length || (section === 'models' && parts.length === 1)}
        <header class="page-header">
          <div><h1>Models</h1></div>
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
            <h2>{search ? 'No models found' : 'No models yet'}</h2>
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
              {#if tab !== 'usage'}<button class="button primary" onclick={() => go(`/models/${parts[1]}/${parts[2]}/usage`, false)}><Code size={16} /> Get code</button>{/if}
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
                  <div class="section-heading"><div><h2>Model details</h2></div></div>
                  <dl class="metadata-list">
                    <div><dt>Architecture</dt><dd>{detail.model.architecture || 'Unknown'}</dd></div>
                    <div><dt>Quantization</dt><dd>{detail.model.quantization || 'None detected'}</dd></div>
                    <div><dt>Last updated</dt><dd>{formatDate(detail.model.updated_at)}</dd></div>
                    <div><dt>Current revision</dt><dd><code>{shortSha(detail.model.sha)}</code></dd></div>
                    {#if detail.model.base_model}<div><dt>Base model</dt><dd class="metadata-reference">{detail.model.base_model}{#if detail.model.base_revision} <code>@{shortSha(detail.model.base_revision)}</code>{/if}</dd></div>{/if}
                    {#if detail.model.source_repository}<div><dt>Source</dt><dd class="metadata-reference">Hugging Face · {detail.model.source_repository} <code>@{shortSha(detail.model.source_revision)}</code></dd></div>{/if}
                  </dl>
                </section>
              </aside>
            </div>
          {:else if tab === 'files'}
            <section class="surface data-panel file-browser">
              <div class="file-browser-toolbar panel-padding">
                <label class="search-field"><Search size={16} /><input aria-label="Search repository paths" bind:value={fileSearch} placeholder="Search paths" />{#if fileSearch}<button type="button" aria-label="Clear file search" onclick={() => (fileSearch = '')}><X size={14} /></button>{/if}</label>
                <label class="select-wrap revision-select"><span>Revision</span><select value={selectedRevision} onchange={(event) => selectRevision(event.currentTarget.value)}>{#each detail.revisions as revision}<option value={revision.oid}>{shortSha(revision.oid)} · {revision.message || 'Untitled revision'}</option>{/each}</select></label>
              </div>
              {#if !fileSearch}
                <nav class="file-breadcrumbs panel-padding" aria-label="File path">
                  <button onclick={() => openDirectory('')}>Files</button>
                  {#each currentDirectory.split('/').filter(Boolean) as directory, index}
                    <ChevronRight size={13} /><button onclick={() => openDirectory(`${currentDirectory.split('/').filter(Boolean).slice(0, index + 1).join('/')}/`)}>{directory}</button>
                  {/each}
                </nav>
              {/if}
              <div class="file-table">
                <div class="file-row file-head" aria-hidden="true"><span>Path</span><span>Storage</span><span>Size</span></div>
                {#if !fileRows.length}<div class="inline-empty file-empty"><FileText size={20} /><div><strong>No files found</strong></div></div>{/if}
                {#each fileRows as entry}
                  <button class="file-row file-button" class:selected={selectedFile?.path === entry.path} onclick={() => entry.type === 'directory' ? openDirectory(entry.path) : openFile(entry)}>
                    <span class="file-name">{#if entry.type === 'directory'}<Folder size={16} />{:else}<FileText size={16} />{/if}{entry.name}</span>
                    <span>{#if entry.type === 'file'}<span class="badge">{entry.xet_hash ? 'Xet' : 'Blob'}</span>{/if}</span>
                    <span>{entry.type === 'file' ? formatBytes(entry.size) : ''}</span>
                  </button>
                {/each}
              </div>
            </section>
            {#if fileLoading}<div class="file-details surface"><LoaderCircle class="spin" size={18} /> Opening file…</div>{/if}
            {#if selectedFile}
              <section class="file-details surface">
                <div class="section-heading"><div><h2>{selectedFile.path}</h2><span class="section-meta">{formatBytes(selectedFile.size)} · {selectedFile.xet_hash ? 'Xet' : 'Blob'}</span></div><a class="button secondary" href={downloadURL(selectedFile.path)}><Download size={15} /> Download</a></div>
                <dl class="file-hashes">
                  {#if selectedFile.sha256}<div><dt>SHA-256</dt><dd><code>{selectedFile.sha256}</code></dd></div>{/if}
                  {#if selectedFile.xet_hash}<div><dt>Xet hash</dt><dd><code>{selectedFile.xet_hash}</code></dd></div>{/if}
                </dl>
                {#if selectedFile.previewable}<pre class="file-preview"><code>{selectedFile.text}</code></pre>{:else}<p class="section-description">Preview is not available for this file type.</p>{/if}
                {#if selectedFile.truncated}<p class="section-description">Preview limited to the first 64 KiB.</p>{/if}
              </section>
            {/if}
          {:else if tab === 'revisions'}
            <section class="surface revision-panel">
              <div class="section-heading"><div><h2>Revisions</h2></div><span class="section-meta">{detail.revisions.length} total</span></div>
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
            <div class="callout info"><Info size={18} /><div><strong>Pinned revision</strong><span>Set <code>HF_ENDPOINT</code> before importing Hugging Face libraries. These examples use <code>{shortSha(detail.model.sha)}</code>.</span></div></div>
            <section class="usage-grid">
              {#each [
                { title: 'HF CLI', description: 'Download the pinned snapshot', key: 'hf' },
                { title: 'Environment', description: 'Use once per shell', key: 'env' },
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
        <header class="page-header"><div><h1>Import model</h1></div></header>
        <div class="import-layout">
          <section class="import-main">
            <div class="source-options" role="radiogroup" aria-label="Import source">
              <button role="radio" aria-checked={importSource === 'local'} class:active={importSource === 'local'} onclick={() => chooseImportSource('local')}>
                <span class="source-icon"><FolderInput size={21} /></span>
                <span><strong>Local folder</strong></span>
                <i></i>
              </button>
              <button role="radio" aria-checked={importSource === 'huggingface'} class:active={importSource === 'huggingface'} onclick={() => chooseImportSource('huggingface')}>
                <span class="source-icon"><CloudDownload size={21} /></span>
                <span><strong>Hugging Face</strong></span>
                <i></i>
              </button>
            </div>

            <section class="surface import-form-card">
              <div class="section-heading"><div><h2>{importSource === 'local' ? 'Local folder' : 'Hugging Face repository'}</h2></div></div>
              <form onsubmit={(event) => { event.preventDefault(); startImport(); }}>
                {#if importSource === 'local'}
                  <div class="field-group">
                    <label for="path">Directory path</label>
                    <input id="path" bind:value={localDraft.path} required placeholder="/home/me/models/llama-adapter" />
                    <small>The path is read by the Miniface server. Symlinks and unsafe files are rejected.</small>
                  </div>
                {:else}
                  <div class="field-group">
                    <label for="hub-repo">Repository</label>
                    <div class="hub-picker" bind:this={hubPickerElement}>
                      <div class="input-with-icon"><Search size={17} /><input id="hub-repo" role="combobox" aria-autocomplete="list" aria-expanded={hubPopupOpen} aria-controls="hub-results" aria-activedescendant={activeHubResult >= 0 ? `hub-option-${activeHubResult}` : undefined} value={huggingFaceDraft.sourceRepository} oninput={(event) => { huggingFaceDraft.sourceRepository = event.currentTarget.value; scheduleHubSearch(); }} onkeydown={handleHubKeydown} onfocus={() => { if (hubResults.length) hubPopupOpen = true; }} onblur={() => setTimeout(() => { if (!hubPickerElement?.contains(document.activeElement)) closeHubPopup(); })} required pattern="[^/]+/[^/]+" autocomplete="off" placeholder="google/gemma-3-1b-it" aria-describedby="hub-help" />{#if hubSearching}<LoaderCircle class="spin field-loader" size={16} />{/if}</div>
                      {#if hubPopupOpen && hubResults.length}
                        <div id="hub-results" class="hub-results" role="listbox">
                          {#each hubResults as model, index}
                            <button id={`hub-option-${index}`} type="button" role="option" tabindex="-1" aria-selected={activeHubResult === index} class:active={activeHubResult === index} onmouseenter={() => (activeHubResult = index)} onmousedown={(event) => event.preventDefault()} onclick={() => selectHubModel(model)}>
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
                  {/if}
                  {#if hubSearchError}<p class="inline-alert danger"><CircleX size={16} />{hubSearchError}</p>{/if}
                  <div class="field-row">
                    <div class="field-group">
                      <label for="hub-revision">Source revision</label>
                      <input id="hub-revision" bind:value={huggingFaceDraft.sourceRevision} required placeholder="main" />
                      <small>Branch, tag, or commit.</small>
                    </div>
                    <div class="field-group">
                      <label for="hub-token">Access token <span class={hubSelected?.gated ? 'required-label' : 'optional-label'}>{hubSelected?.gated ? 'required' : 'optional'}</span></label>
                      <div class="password-field light"><input id="hub-token" type={showHubToken ? 'text' : 'password'} bind:value={huggingFaceDraft.accessToken} required={hubSelected?.gated === true} autocomplete="off" placeholder="hf_••••••••••••" /><button type="button" class="field-button" aria-label={showHubToken ? 'Hide token' : 'Show token'} onclick={() => (showHubToken = !showHubToken)}>{#if showHubToken}<EyeOff size={17} />{:else}<Eye size={17} />{/if}</button></div>
                      <small>Held only for the active job.</small>
                    </div>
                  </div>
                {/if}
                <div class="field-group">
                  <label for="repo">Miniface repository</label>
                  {#if importSource === 'local'}<input id="repo" bind:value={localDraft.repository} required pattern="[^/]+/[^/]+" placeholder="team/model-name" />{:else}<input id="repo" bind:value={huggingFaceDraft.destinationRepository} required pattern="[^/]+/[^/]+" placeholder="team/model-name" />{/if}
                </div>
                <div class="field-group">
                  <label for="message">Revision message</label>
                  {#if importSource === 'local'}<input id="message" bind:value={localDraft.message} required />{:else}<input id="message" bind:value={huggingFaceDraft.message} required />{/if}
                </div>

                {#if importFeedback}
                  <div class={`import-feedback ${importFeedbackTone}`} role="status">
                    <CircleX size={19} /><div><strong>Couldn’t start import</strong><span>{importFeedback}</span></div>
                  </div>
                {/if}

                <div class="form-actions import-actions">
                  <span></span><button class="button primary" disabled={importSubmitting}>{#if importSubmitting}<LoaderCircle class="spin" size={16} /> Queueing…{:else}Import model <ArrowRight size={16} />{/if}</button>
                </div>
              </form>
            </section>
          </section>
        </div>

      {:else if section === 'jobs'}
        <header class="page-header">
          <div><h1>Activity</h1></div>
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
          </div>
          <div class="activity-toolbar">
            <div class="filter-tabs" aria-label="Filter activity">
              <button class:active={jobFilter === 'all'} onclick={() => (jobFilter = 'all')}>All <span>{jobs.length}</span></button>
              <button class:active={jobFilter === 'active'} onclick={() => (jobFilter = 'active')}>Active <span>{activeJobCount}</span></button>
              <button class:active={jobFilter === 'completed'} onclick={() => (jobFilter = 'completed')}>History <span>{jobs.length - activeJobCount}</span></button>
            </div>
            {#if activeJobCount}<span class="polling-note"><i></i> Updates automatically</span>{/if}
          </div>
          {#if !visibleJobs.length}
            <div class="empty-state compact"><CircleCheck size={24} /><h2>No jobs in this view</h2></div>
          {:else}
            <section class="jobs-list surface">
              {#each visibleJobs as job}
                <article id={`job-${job.id}`} class:expanded={expandedJob === job.id} class:highlighted={parts[1] === job.id} class="job-item">
                  <div class="job-main-row">
                    <span class={`job-state status-${stateTone(job.state)}`}>
                      {#if job.state === 'completed'}<CircleCheck size={17} />{:else if job.state === 'failed'}<CircleX size={17} />{:else if job.state === 'canceled'}<X size={17} />{:else if job.state === 'queued'}<Clock3 size={17} />{:else}<LoaderCircle class="spin" size={17} />{/if}
                    </span>
                    <div class="job-name"><strong>{job.repo_id || job.id}</strong><span>{jobSource(job.type)} · {job.phase || titleCase(job.state)}</span></div>
                    <div class="job-progress-cell">
                      <div><span>{job.phase || titleCase(job.state)}</span>{#if job.total_bytes}<small>{formatBytes(job.current_bytes || 0)} / {formatBytes(job.total_bytes)}</small>{/if}</div>
                      {#if isActiveJob(job) && job.total_bytes}<div class="progress"><i style={`width:${normalizeProgress(job.progress)}%`}></i></div>{/if}
                    </div>
                    <time datetime={job.updated_at}>{formatRelativeDate(job.updated_at)}</time>
                    <div class="job-actions">
                      {#if isActiveJob(job)}<button class="button danger small" disabled={cancelingJob === job.id} onclick={() => cancelJob(job)}>{cancelingJob === job.id ? 'Canceling…' : 'Cancel'}</button>{/if}
                      {#if !isActiveJob(job)}<button class="button secondary small" onclick={() => go('/imports')}>Import another</button>{/if}
                      <button class:error={Boolean(job.error)} class="details-button" aria-expanded={expandedJob === job.id} aria-controls={`job-detail-${job.id}`} onclick={() => (expandedJob = expandedJob === job.id ? '' : job.id)}>{#if job.error}<CircleAlert size={15} />{:else}<Info size={15} />{/if} Details</button>
                    </div>
                  </div>
                  {#if expandedJob === job.id}
                    <div id={`job-detail-${job.id}`} class:error={Boolean(job.error)} class="job-detail">
                      {#if job.error}<strong>Error</strong><code>{job.error}</code>{/if}
                      {#if job.source_repository}<span>Source: {job.source_repository}{#if job.source_revision} @ <code>{shortSha(job.source_revision)}</code>{/if}</span>{/if}
                      {#if job.total_bytes}<span>Transferred: {formatBytes(job.current_bytes || 0)} / {formatBytes(job.total_bytes)}</span>{/if}
                      <span>Created: {formatDate(job.created_at)}</span>
                      <span>Job ID: <code>{job.id}</code></span>
                    </div>
                  {/if}
                </article>
              {/each}
            </section>
          {/if}
        {/if}

      {:else if section === 'storage'}
        <header class="page-header"><div><h1>Storage</h1></div></header>
        {#if !storage}
          <div class="empty-state compact"><LoaderCircle class="spin" size={24} /><h2>Reading storage</h2></div>
        {:else}
          <div class="storage-stats">
            <article class="surface stat-card"><span class="stat-icon pine"><Database size={19} /></span><div><span>Logical usage</span><strong>{formatBytes(storage.logical_bytes)}</strong></div></article>
            <article class="surface stat-card"><span class="stat-icon ink"><HardDrive size={19} /></span><div><span>Physical usage</span><strong>{formatBytes(storage.physical_bytes)}</strong></div></article>
            <article class="surface stat-card"><span class="stat-icon sage"><Gauge size={19} /></span><div><span>Deduplication</span><strong>{storage.dedup_ratio.toFixed(2)}×</strong></div></article>
          </div>
          <section class="surface efficiency-card storage-comparison">
              <div class="section-heading"><div><h2>Logical and physical usage</h2></div></div>
              <div class="storage-bars">
                <div><span><strong>Logical</strong><small>{formatBytes(storage.logical_bytes)}</small></span><i><b style="width:100%"></b></i></div>
                <div><span><strong>Physical</strong><small>{formatBytes(storage.physical_bytes)}</small></span><i><b class="physical" style={`width:${Math.max(4, Math.min(100, storage.logical_bytes ? (storage.physical_bytes / storage.logical_bytes) * 100 : 0))}%`}></b></i></div>
              </div>
          </section>
          <section class="surface repository-storage">
            <div class="section-heading panel-padding"><div><h2>Repositories</h2></div><span class="section-meta">{storage.repositories}</span></div>
            <div class="storage-repository-row storage-repository-head" aria-hidden="true"><span>Repository</span><span>Logical size</span><span>Files</span><span>Revisions</span><span>Updated</span></div>
            {#each storage.repository_breakdown as repository}
              <button class="storage-repository-row" onclick={() => go(`/models/${repository.owner}/${repository.name}/files`)}><strong>{repository.id}</strong><span>{formatBytes(repository.logical_bytes)}</span><span>{repository.file_count}</span><span>{repository.revisions}</span><span>{formatRelativeDate(repository.updated_at)}</span></button>
            {/each}
          </section>
        {/if}

      {:else if section === 'settings'}
        <header class="page-header"><div><h1>Settings</h1></div></header>
        <section class="endpoint-hero">
          <div><span class="endpoint-icon"><Server size={21} /></span><span><small>Server endpoint</small><strong>{endpoint()}</strong></span></div>
          <button class="button inverse" onclick={() => copyText(endpoint(), 'endpoint')}>{#if copied === 'endpoint'}<Check size={15} /> Copied{:else}<Copy size={15} /> Copy endpoint{/if}</button>
        </section>
        <div class="settings-sections">
          <section class="settings-main settings-section">
            <h2>Client setup</h2>
            {#each [
              { key: 'env', title: 'Environment', icon: KeyRound },
              { key: 'download', title: 'Download', icon: CloudDownload },
              { key: 'upload', title: 'Upload', icon: Upload }
            ] as setup}
              {@const SetupIcon = setup.icon}
              <article class="surface setup-card">
                <div class="setup-heading"><span><SetupIcon size={19} /></span><div><h2>{setup.title}</h2></div></div>
                {#if setup.key === 'upload'}<div class="mini-warning"><TriangleAlert size={16} /><span><strong>Use a fresh uploader process.</strong> The client reads <code>HF_HUB_DISABLE_XET</code> at import time.</span></div>{/if}
                <div class="code-block"><button class="copy-button" aria-label={`Copy ${setup.title} commands`} onclick={() => copyText(settingCode(setup.key as 'env' | 'download' | 'upload'), `setting-${setup.key}`)}>{#if copied === `setting-${setup.key}`}<Check size={14} /> Copied{:else}<Copy size={14} /> Copy{/if}</button><pre><code>{settingCode(setup.key as 'env' | 'download' | 'upload')}</code></pre></div>
              </article>
            {/each}
          </section>
          <section class="settings-section">
            <h2>Tokens</h2>
            <div class="surface token-manager">
              <form class="token-form" onsubmit={(event) => { event.preventDefault(); createPersonalToken(); }}>
                <label>Name<input bind:value={newTokenName} required maxlength="100" /></label>
                <label>Access<select bind:value={newTokenScope}><option value="read">Read</option><option value="write">Read and write</option></select></label>
                <label>Expiration<select bind:value={newTokenExpiry}><option value={0}>No expiration</option><option value={30}>30 days</option><option value={90}>90 days</option><option value={365}>1 year</option></select></label>
                <button class="button primary">Create token</button>
              </form>
              {#if createdToken}<div class="created-token"><code>{createdToken}</code><button class="button secondary small" onclick={() => copyText(createdToken, 'new-token')}><Copy size={14} /> Copy</button></div>{/if}
              {#if tokenFeedback}<p class="section-description">{tokenFeedback}</p>{/if}
              <div class="token-list">
                {#each personalTokens ?? [] as personalToken}
                  <div><span><strong>{personalToken.name}</strong><small>{personalToken.prefix} · {personalToken.scopes.join(', ')} · created {formatDate(personalToken.created_at)} · {personalToken.expires_at ? `expires ${formatDate(personalToken.expires_at)}` : 'no expiration'}{personalToken.last_used_at ? ` · used ${formatRelativeDate(personalToken.last_used_at)}` : ''}</small></span>{#if personalToken.revoked_at}<span class="badge status-muted">Revoked</span>{:else if personalToken.expires_at && new Date(personalToken.expires_at) <= new Date()}<span class="badge status-muted">Expired</span>{:else}<button class="button danger small" onclick={() => revokePersonalToken(personalToken.id)}><Trash2 size={13} /> Revoke</button>{/if}</div>
                {/each}
              </div>
            </div>
          </section>
          <section class="settings-section">
            <h2>Administrator</h2>
            <form class="surface password-settings" onsubmit={(event) => { event.preventDefault(); updatePassword(); }}><label>Current password<input type="password" bind:value={currentPassword} required autocomplete="current-password" /></label><label>New password<input type="password" bind:value={newPassword} required minlength="12" autocomplete="new-password" /></label><button class="button secondary" disabled={changingPassword}>Change password</button>{#if passwordFeedback}<p class="section-description">{passwordFeedback}</p>{/if}</form>
          </section>
          {#if serverInfo}
            <details class="surface server-details"><summary>Server details</summary><dl><div><dt>Version</dt><dd>{serverInfo.runtime.miniface_version}</dd></div><div><dt>Storage backend</dt><dd>Local filesystem</dd></div><div><dt>Metadata database</dt><dd>{serverInfo.storage.metadata_database}</dd></div><div><dt>Data directory</dt><dd><code>{serverInfo.storage.data_directory}</code></dd></div><div><dt>Available disk</dt><dd>{formatBytes(serverInfo.storage.available_bytes)}</dd></div><div><dt>Garbage collection</dt><dd>Not available</dd></div><div><dt>Runtime</dt><dd>{serverInfo.runtime.go_version} · {serverInfo.runtime.os}/{serverInfo.runtime.arch}</dd></div></dl></details>
          {/if}
        </div>
      {:else}
        <div class="empty-state"><div class="empty-illustration"><CircleAlert size={28} /></div><h2>Page not found</h2><p>This part of Miniface doesn’t exist.</p><button class="button primary" onclick={() => go('/models')}>Back to models</button></div>
      {/if}
    </main>
  </div>

  {#if toast}<div class="toast" role="status"><CircleCheck size={16} />{toast}</div>{/if}
{/if}
