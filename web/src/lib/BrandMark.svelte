<script lang="ts">
  let { size = 36, title = '' }: { size?: number; title?: string } = $props();
</script>

<svg
  class="mark"
  width={size}
  height={size}
  viewBox="0 0 40 40"
  role={title ? 'img' : undefined}
  aria-hidden={title ? undefined : 'true'}
  aria-label={title || undefined}
>
  <rect width="40" height="40" rx="12" fill="#6758F3" />
  <path d="M9 9.5h22a3 3 0 0 1 3 3v9.25a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V12.5a3 3 0 0 1 3-3Z" fill="#F7F7F2" />
  <circle cx="14" cy="16.5" r="1.65" fill="#202026" />
  <circle cx="26" cy="16.5" r="1.65" fill="#202026" />
  <path d="M15.5 20c1.1 1.25 2.6 1.9 4.5 1.9s3.4-.65 4.5-1.9" fill="none" stroke="#202026" stroke-linecap="round" stroke-width="1.8" />
  <path d="M7.5 27.5h25v1.75a4 4 0 0 1-4 4h-17a4 4 0 0 1-4-4V27.5Z" fill="#202026" />
  <path d="M12 30.25h7" stroke="#F7F7F2" stroke-linecap="round" stroke-width="1.5" />
  <circle cx="28.75" cy="30.25" r="1.75" fill="#C7F36B" />
</svg>

<style>
  .mark { display: block; flex: 0 0 auto; }
</style>
