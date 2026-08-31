import { describe, expect, it } from 'vitest';
import katex from 'katex';
import { bookStats, chapters, findSection } from '../src/data/book';
import { sectionGuides } from '../src/data/sectionGuides';
import { lessonDetails } from '../src/data/lessonDetails';
import { getRelatedSections } from '../src/data/relations';

describe('структура книги', () => {
  it('полностью повторяет исходное оглавление', () => {
    expect(bookStats).toEqual({ chapters: 18, sections: 80, topics: 275 });
    expect(chapters.map((chapter) => chapter.number)).toEqual(Array.from({ length: 18 }, (_, index) => index + 1));
    expect(chapters.flatMap((chapter) => chapter.sections.map((section) => section.number))).toEqual(
      Array.from({ length: 80 }, (_, index) => index + 1),
    );
  });

  it('даёт маршрут для каждого параграфа', () => {
    for (let section = 1; section <= 80; section += 1) {
      expect(findSection(section), `нет § ${section}`).toBeDefined();
    }
  });

  it('содержит краткую карточку и валидную формулу для каждого параграфа', () => {
    expect(Object.keys(sectionGuides)).toHaveLength(80);
    for (let section = 1; section <= 80; section += 1) {
      const guide = sectionGuides[section];
      expect(guide?.summary.length, `нет конспекта § ${section}`).toBeGreaterThan(50);
      expect(guide?.keyIdea.length).toBeGreaterThan(20);
      expect(() => katex.renderToString(guide.formula, { throwOnError: true })).not.toThrow();
    }
  });

  it('даёт каждому веб-уроку глубокий слой поверх краткого конспекта', () => {
    expect(Object.keys(lessonDetails)).toHaveLength(80);
    for (let section = 1; section <= 80; section += 1) {
      const detail = lessonDetails[section];
      expect(detail?.explanation, `нет объяснения § ${section}`).toHaveLength(2);
      expect(detail?.terms.length).toBeGreaterThanOrEqual(2);
      expect(detail?.example.steps.length).toBeGreaterThanOrEqual(2);
      expect(detail?.practice.question.length).toBeGreaterThan(15);
      const depth = [detail.hook, ...detail.explanation, ...detail.terms.map((term) => term.definition), ...detail.example.steps, detail.pitfall, detail.practice.answer].join(' ').length;
      expect(depth, `слишком короткий § ${section}`).toBeGreaterThan(500);
      expect(new Set(getRelatedSections(section).map((item) => item.section.number)).size).toBeGreaterThanOrEqual(2);
    }
  });
});
