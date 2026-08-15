<script lang="ts">
  let {
    size = 36,
    title = '',
    reversed = false
  }: { size?: number; title?: string; reversed?: boolean } = $props();
</script>

<svg
  class="mark"
  class:reversed
  width={size}
  height={size}
  viewBox="0 0 180 180"
  role={title ? 'img' : undefined}
  aria-hidden={title ? undefined : 'true'}
  aria-label={title || undefined}
>
  <circle cx="90" cy="59" r="56.5" fill="var(--mark-foreground)" />
  <circle cx="90" cy="59" r="47.5" fill="var(--mark-background)" />
  <path d="M61 51c4-9 12-9 16 0l-4 3c-3-6-7-6-10 0Z" fill="var(--mark-foreground)" />
  <path d="M103 51c4-9 12-9 16 0l-4 3c-3-6-7-6-10 0Z" fill="var(--mark-foreground)" />
  <path d="M74 65c8 7 24 7 32 0-1 14-7 21-16 21S75 79 74 65Z" fill="var(--mark-foreground)" />
  <path d="M15 86h150v50c0 20-14 33-35 33H50c-21 0-35-13-35-33Z" fill="var(--mark-foreground)" />
  <circle cx="57" cy="88" r="15" fill="var(--mark-background)" />
  <circle cx="123" cy="88" r="15" fill="var(--mark-background)" />
  <circle cx="143" cy="147" r="9" fill="#F06A47" />
</svg>

<style>
  .mark {
    --mark-background: #F5F1E8;
    --mark-foreground: #173B36;
    display: block;
    flex: 0 0 auto;
  }

  .mark.reversed {
    --mark-background: #173B36;
    --mark-foreground: #F5F1E8;
  }
</style>
