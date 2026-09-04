import { describe, expect, it } from 'vitest';
import {
  buildSectionSearchText,
  matchesSearchText,
  matchSnippet,
  normalizeSearchText,
  stemSearchText,
  stemToken,
  type SectionSearchSource,
} from '../src/components/SearchDialog';
import type { BookSection, Chapter } from '../src/data/book';

const section: BookSection = {
  number: 46,
  title: 'section_title_sentinel',
  page: 321,
  topics: [{ number: '46.1', title: 'topic_title_sentinel', page: 322 }],
};

const chapter: Chapter = {
  number: 9,
  roman: 'IX',
  title: 'chapter_title_sentinel',
  sections: [section],
};

const source: SectionSearchSource = {
  chapter,
  section,
  meta: {
    kicker: 'meta_kicker_sentinel',
    shortTitle: 'meta_short_title_sentinel',
    description: 'meta_description_sentinel',
    outcome: 'meta_outcome_sentinel',
    formula: 'meta_formula_sentinel',
    symbol: 'meta_symbol_sentinel',
    track: 'meta_track_sentinel',
    accent: 'blue',
    hours: 7,
  },
  guide: {
    summary: 'guide_summary_sentinel',
    keyIdea: 'guide_key_idea_sentinel',
    question: 'guide_question_sentinel',
    formula: 'guide_formula_sentinel',
  },
  detail: {
    hook: 'detail_hook_sentinel',
    explanation: ['detail_explanation_one_sentinel', 'detail_explanation_two_sentinel'],
    terms: [{ term: 'term_name_sentinel', definition: 'term_definition_sentinel' }],
    example: {
      title: 'example_title_sentinel',
      problem: 'example_problem_sentinel',
      steps: ['example_step_sentinel'],
      answer: 'example_answer_sentinel',
    },
    pitfall: 'pitfall_sentinel',
    practice: {
      question: 'practice_question_sentinel',
      answer: 'practice_answer_sentinel',
    },
  },
};

describe('full-text section index', () => {
  it('indexes numbers, titles, topics, metadata, guides, and every lesson-detail field', () => {
    const text = buildSectionSearchText(source, 'en');
    const expectedFragments = [
      'chapter 9', 'ix', '§ 46', '321', '46.1', '322',
      'chapter_title_sentinel', 'section_title_sentinel', 'topic_title_sentinel',
      'meta_kicker_sentinel', 'meta_short_title_sentinel', 'meta_description_sentinel',
      'meta_outcome_sentinel', 'meta_formula_sentinel', 'meta_symbol_sentinel', 'meta_track_sentinel',
      'guide_summary_sentinel', 'guide_key_idea_sentinel', 'guide_question_sentinel', 'guide_formula_sentinel',
      'detail_hook_sentinel', 'detail_explanation_one_sentinel', 'detail_explanation_two_sentinel',
      'term_name_sentinel', 'term_definition_sentinel', 'example_title_sentinel',
      'example_problem_sentinel', 'example_step_sentinel', 'example_answer_sentinel',
      'pitfall_sentinel', 'practice_question_sentinel', 'practice_answer_sentinel',
    ];
    for (const fragment of expectedFragments) expect(text).toContain(fragment);
  });

  it('matches all whitespace-separated terms independent of order and normalizes Russian ё', () => {
    const text = buildSectionSearchText(source, 'en');
    expect(matchesSearchText(text, 'practice_answer_sentinel guide_summary_sentinel', 'en')).toBe(true);
    expect(matchesSearchText(text, 'missing_sentinel', 'en')).toBe(false);
    expect(normalizeSearchText('  ТЕОРЁМА   РОЛЛЯ ', 'ru')).toBe('теорема ролля');
  });
});

describe('русская морфология в поиске', () => {
  const forms = (word: string) => stemToken(normalizeSearchText(word, 'ru'), 'ru');

  it('сводит падежи одного слова к общей основе', () => {
    for (const group of [
      ['производная', 'производные', 'производной', 'производную', 'производных'],
      ['матрица', 'матрицы', 'матрицу', 'матрицей'],
      ['предел', 'пределы', 'пределов', 'пределом'],
      ['функция', 'функции', 'функцию', 'функций'],
      ['ряд', 'ряды', 'ряда', 'рядов'],
      ['интеграл', 'интеграла', 'интегралы', 'интегралов'],
      ['Стокса', 'Стокс', 'Стоксу'],
    ]) {
      const stems = new Set(group.map(forms));
      expect(stems, group.join(' / ')).toHaveLength(1);
    }
  });

  it('не режет слово до неразличимого огрызка', () => {
    for (const word of ['ряд', 'ось', 'куб', 'сумма', 'угол']) {
      expect(forms(word).length, word).toBeGreaterThanOrEqual(3);
    }
  });

  it('индекс и запрос стеммятся согласованно', () => {
    const text = stemSearchText('Производная функции в точке и её геометрический смысл', 'ru');
    for (const query of ['производная', 'производной', 'производные', 'функция', 'функций']) {
      expect(matchesSearchText(text, query, 'ru'), query).toBe(true);
    }
    expect(matchesSearchText(text, 'интеграл', 'ru')).toBe(false);
  });

  it('английский индекс переживает множественное число', () => {
    const text = stemSearchText('Matrices and derivatives of a function', 'en');
    expect(matchesSearchText(text, 'derivative', 'en')).toBe(true);
    expect(matchesSearchText(text, 'derivatives', 'en')).toBe(true);
    expect(matchesSearchText(text, 'functions', 'en')).toBe(true);
    expect(stemToken('class', 'en')).toBe('class');
  });
});

describe('фрагмент совпадения', () => {
  const plain = 'Скалярное произведение двух векторов равно произведению их длин на косинус угла между ними. Оно позволяет находить углы, ортогональные проекции и работу постоянной силы.';

  it('показывает окрестность совпадения и обрезает края многоточием', () => {
    const snippet = matchSnippet(plain, 'ортогональные', 'ru');
    expect(snippet).toContain('ортогональные проекции');
    expect(snippet.startsWith('…')).toBe(true);
    expect(snippet.length).toBeLessThan(plain.length);
  });

  it('находит совпадение по другой форме слова', () => {
    expect(matchSnippet(plain, 'вектор', 'ru')).toContain('векторов');
    expect(matchSnippet(plain, 'векторами', 'ru')).toContain('векторов');
  });

  it('не начинается с многоточия, когда совпадение в начале', () => {
    expect(matchSnippet(plain, 'скалярное', 'ru').startsWith('…')).toBe(false);
  });

  it('возвращает пустую строку без запроса и без совпадения', () => {
    expect(matchSnippet(plain, '', 'ru')).toBe('');
    expect(matchSnippet(plain, 'интеграл', 'ru')).toBe('');
  });
});
