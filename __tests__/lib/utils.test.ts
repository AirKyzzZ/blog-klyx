import { formatDate, calculateReadingTime, slugify, excerpt } from '@/lib/utils';

describe('formatDate', () => {
  it('formats date in French locale', () => {
    const result = formatDate('2025-11-01');
    expect(result).toContain('2025');
    expect(result).toContain('novembre');
  });
});

describe('calculateReadingTime', () => {
  it('calculates reading time correctly', () => {
    const content = 'word '.repeat(200); // 200 words = 1 minute
    const result = calculateReadingTime(content);
    expect(result).toBe('1 min de lecture');
  });

  it('rounds up for partial minutes', () => {
    const content = 'word '.repeat(250); // 250 words = 1.25 minutes
    const result = calculateReadingTime(content);
    expect(result).toBe('2 min de lecture');
  });
});

describe('slugify', () => {
  it('converts text to URL-friendly slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('removes accents and special characters', () => {
    expect(slugify('Création site web à Bordeaux')).toBe('creation-site-web-a-bordeaux');
  });

  it('handles multiple spaces and hyphens', () => {
    expect(slugify('Hello    World---Test')).toBe('hello-world-test');
  });
});

describe('excerpt', () => {
  it('returns full text if shorter than maxLength', () => {
    const text = 'Short text';
    expect(excerpt(text, 50)).toBe('Short text');
  });

  it('truncates and adds ellipsis if longer', () => {
    const text = 'This is a very long text that should be truncated';
    const result = excerpt(text, 20);
    expect(result).toHaveLength(24); // 20 + '...'
    expect(result).toContain('...');
  });
});

