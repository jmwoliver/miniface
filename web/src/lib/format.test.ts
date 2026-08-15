import { describe, expect, it } from 'vitest';
import { dedupSavings, formatBytes, formatRelativeDate, normalizeProgress, shortSha } from './format';
describe('format helpers', () => {
  it('formats binary sizes', () => { expect(formatBytes(0)).toBe('0 B'); expect(formatBytes(1536)).toBe('1.5 KiB'); expect(formatBytes(-1)).toBe('—'); });
  it('shortens revisions', () => expect(shortSha('1234567890')).toBe('12345678'));
  it('normalizes fractional and percentage progress', () => { expect(normalizeProgress(.25)).toBe(25); expect(normalizeProgress(120)).toBe(100); });
  it('formats recent dates relative to now', () => {
    const now = Date.parse('2026-08-15T12:00:00Z');
    expect(formatRelativeDate('2026-08-15T11:59:45Z', now)).toBe('just now');
    expect(formatRelativeDate('2026-08-15T10:00:00Z', now)).toBe('2 hours ago');
  });
  it('calculates physical deduplication savings safely', () => {
    expect(dedupSavings(2)).toBe(50);
    expect(dedupSavings(0)).toBe(0);
  });
});
