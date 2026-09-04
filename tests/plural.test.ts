import { describe, expect, it } from 'vitest';
import { plural, pluralForRange, pluralIndex } from '../src/i18n/plural';
import { copies } from '../src/i18n/copy';

const темы = ['тема', 'темы', 'тем'] as const;

describe('русские числительные', () => {
  it('выбирает форму по последней цифре', () => {
    expect(plural(1, темы, 'ru')).toBe('тема');
    expect(plural(2, темы, 'ru')).toBe('темы');
    expect(plural(4, темы, 'ru')).toBe('темы');
    expect(plural(5, темы, 'ru')).toBe('тем');
    expect(plural(9, темы, 'ru')).toBe('тем');
    expect(plural(21, темы, 'ru')).toBe('тема');
    expect(plural(22, темы, 'ru')).toBe('темы');
    expect(plural(25, темы, 'ru')).toBe('тем');
  });

  it('исключает 11–14, где последняя цифра обманывает', () => {
    expect(plural(11, темы, 'ru')).toBe('тем');
    expect(plural(12, темы, 'ru')).toBe('тем');
    expect(plural(13, темы, 'ru')).toBe('тем');
    expect(plural(14, темы, 'ru')).toBe('тем');
    expect(plural(111, темы, 'ru')).toBe('тем');
    expect(plural(112, темы, 'ru')).toBe('тем');
  });

  it('покрывает 0 и 100', () => {
    expect(plural(0, темы, 'ru')).toBe('тем');
    expect(plural(100, темы, 'ru')).toBe('тем');
    expect(plural(101, темы, 'ru')).toBe('тема');
  });
});

describe('английские числительные', () => {
  it('различает только единственное и множественное', () => {
    const topics = ['topic', 'topics', 'topics'] as const;
    expect(plural(1, topics, 'en')).toBe('topic');
    expect(plural(2, topics, 'en')).toBe('topics');
    expect(plural(11, topics, 'en')).toBe('topics');
    expect(pluralIndex(3, 'en')).toBe(2);
  });
});

describe('диапазоны', () => {
  it('согласует форму с последним числом', () => {
    const минуты = ['минута', 'минуты', 'минут'] as const;
    expect(pluralForRange('50–65', минуты, 'ru')).toBe('минут');
    expect(pluralForRange('20–30', минуты, 'ru')).toBe('минут');
    expect(pluralForRange('20–32', минуты, 'ru')).toBe('минуты');
    expect(pluralForRange('1', минуты, 'ru')).toBe('минута');
  });
});

describe('словарь', () => {
  it('во всех наборах форм ровно три варианта', () => {
    for (const [language, copy] of Object.entries(copies)) {
      const sets: Array<[string, readonly string[]]> = [
        ['catalog.topicForms', copy.catalog.topicForms],
        ['chapter.hourForms', copy.chapter.hourForms],
        ['chapter.sectionForms', copy.chapter.sectionForms],
        ['chapter.blockForms', copy.chapter.blockForms],
        ['lesson.minuteForms', copy.lesson.minuteForms],
        ['lesson.blockForms', copy.lesson.blockForms],
      ];
      for (const [name, forms] of sets) {
        expect(forms, `${language}.${name}`).toHaveLength(3);
        expect(forms.every((form) => form.trim().length > 0), `${language}.${name}`).toBe(true);
      }
    }
  });

  it('в русском три формы действительно различны', () => {
    expect(new Set(copies.ru.catalog.topicForms).size).toBe(3);
    expect(new Set(copies.ru.chapter.hourForms).size).toBe(3);
    expect(new Set(copies.ru.chapter.sectionForms).size).toBe(3);
    expect(new Set(copies.ru.lesson.blockForms).size).toBe(3);
  });
});
