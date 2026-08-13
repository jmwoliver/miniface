import { describe, expect, it } from 'vitest';
import { formatBytes, normalizeProgress, shortSha } from './format';
describe('format helpers', () => {
  it('formats binary sizes', () => { expect(formatBytes(0)).toBe('0 B'); expect(formatBytes(1536)).toBe('1.5 KiB'); expect(formatBytes(-1)).toBe('—'); });
  it('shortens revisions', () => expect(shortSha('1234567890')).toBe('12345678'));
  it('normalizes fractional and percentage progress', () => { expect(normalizeProgress(.25)).toBe(25); expect(normalizeProgress(120)).toBe(100); });
});
