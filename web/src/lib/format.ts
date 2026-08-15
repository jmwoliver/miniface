export function formatBytes(value: number): string {
  if (!Number.isFinite(value) || value < 0) return '—';
  if (value === 0) return '0 B';
  const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB'];
  const index = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1);
  const amount = value / 1024 ** index;
  return `${amount.toFixed(index === 0 || amount >= 10 ? 0 : 1)} ${units[index]}`;
}
export function shortSha(sha?: string): string { return sha ? sha.slice(0, 8) : '—'; }
export function formatDate(value: string): string {
  const date = new Date(value); return Number.isNaN(date.valueOf()) ? 'Unknown' : new Intl.DateTimeFormat(undefined, { dateStyle:'medium', timeStyle:'short' }).format(date);
}
export function normalizeProgress(value: number): number { return Math.max(0, Math.min(100, value <= 1 ? value * 100 : value)); }

export function formatRelativeDate(value: string, now = Date.now()): string {
  const timestamp = new Date(value).valueOf();
  if (!Number.isFinite(timestamp)) return 'Unknown';
  const delta = timestamp - now;
  const absolute = Math.abs(delta);
  if (absolute < 60_000) return 'just now';
  const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ['year', 365 * 24 * 60 * 60_000],
    ['month', 30 * 24 * 60 * 60_000],
    ['day', 24 * 60 * 60_000],
    ['hour', 60 * 60_000],
    ['minute', 60_000]
  ];
  const [unit, milliseconds] = units.find(([, duration]) => absolute >= duration) ?? units.at(-1)!;
  return new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' }).format(Math.round(delta / milliseconds), unit);
}

export function dedupSavings(ratio: number): number {
  if (!Number.isFinite(ratio) || ratio <= 1) return 0;
  return Math.min(100, Math.max(0, 100 - 100 / ratio));
}
