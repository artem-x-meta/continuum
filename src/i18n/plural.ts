import type { Language } from './copy';

/**
 * Формы существительного в порядке [1 тема, 2 темы, 5 тем].
 * В английском вторая форма не используется — там достаточно [one, —, many].
 */
export type PluralForms = readonly [string, string, string];

export function pluralIndex(count: number, language: Language) {
  const n = Math.abs(Math.trunc(count));
  if (language !== 'ru') return n === 1 ? 0 : 2;
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 0;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 1;
  return 2;
}

export function plural(count: number, forms: PluralForms, language: Language) {
  return forms[pluralIndex(count, language)];
}

