import { describe, expect, it } from 'vitest';
import katex from 'katex';
import { chapters } from '../src/data/book';
import { englishSections1 } from '../src/data/en/sections-1';
import { englishSections2 } from '../src/data/en/sections-2';
import { englishSections3 } from '../src/data/en/sections-3';
import { englishChapterMeta, englishChapterTitles, englishTracks } from '../src/data/en/bookMeta';
import { copies } from '../src/i18n/copy';
import { parseRoute, routeHref, routeLanguage, setRouteLanguageFallback } from '../src/routing';

const englishSections = { ...englishSections1, ...englishSections2, ...englishSections3 };

function objectShape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(objectShape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, objectShape((value as Record<string, unknown>)[key])]));
  }
  return typeof value;
}

describe('RU/EN localization', () => {
  it('has identical UI dictionary shapes', () => {
    expect(objectShape(copies.en)).toEqual(objectShape(copies.ru));
  });

  it('covers the same 18 chapters, 80 sections, and 275 topics in English', () => {
    expect(Object.keys(englishChapterTitles)).toHaveLength(18);
    expect(Object.keys(englishChapterMeta)).toHaveLength(18);
    expect(englishTracks).toHaveLength(4);
    expect(Object.keys(englishSections).map(Number)).toEqual(Array.from({ length: 80 }, (_, index) => index + 1));
    const topicCount = chapters.reduce((sum, chapter) => sum + chapter.sections.reduce((sectionSum, section) => {
      expect(englishSections[section.number].topics).toHaveLength(section.topics.length);
      return sectionSum + englishSections[section.number].topics.length;
    }, 0), 0);
    expect(topicCount).toBe(275);
  });

  it('contains no Cyrillic in the English content pack and keeps valid formulas', () => {
    expect(JSON.stringify({ englishSections, englishChapterMeta, englishChapterTitles, englishTracks })).not.toMatch(/[А-Яа-яЁё]/);
    for (let section = 1; section <= 80; section += 1) {
      const bundle = englishSections[section];
      expect(bundle.detail.explanation).toHaveLength(2);
      expect(bundle.detail.terms.length).toBeGreaterThanOrEqual(2);
      expect(bundle.detail.example.steps.length).toBeGreaterThanOrEqual(2);
      expect(() => katex.renderToString(bundle.guide.formula, { throwOnError: true })).not.toThrow();
    }
  });

  it('round-trips localized and legacy hash routes', () => {
    expect(routeHref({ page: 'section', section: 20 }, 'en')).toBe('#/en/section/20');
    expect(routeHref({ page: 'catalog' }, 'ru')).toBe('#/ru/catalog');
    expect(routeLanguage('#/en/chapter/5')).toBe('en');
    expect(parseRoute('#/en/chapter/5')).toEqual({ page: 'chapter', chapter: 5 });
    expect(parseRoute('#/section/20')).toEqual({ page: 'section', section: 20 });
    expect(parseRoute('#/en/labs')).toEqual({ page: 'labs' });
    expect(parseRoute('#/en/chapter/999')).toEqual({ page: 'home' });
    expect(parseRoute('#/en/section/1.5')).toEqual({ page: 'home' });
    setRouteLanguageFallback('en');
    expect(routeHref({ page: 'labs' })).toBe('#/en/labs');
    setRouteLanguageFallback('ru');
  });
});
