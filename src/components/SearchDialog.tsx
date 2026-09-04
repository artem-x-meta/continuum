import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { ArrowRight, BookOpen, Search, X } from 'lucide-react';
import type { BookSection, Chapter, ChapterMeta } from '../data/book';
import type { LessonDetail } from '../data/lessonDetailTypes';
import type { SectionGuide } from '../data/sectionGuides';
import type { Language } from '../i18n/copy';
import { useLocale } from '../i18n/LocaleContext';
import { routeHref } from '../routing';

type SearchDialogProps = {
  open: boolean;
  onClose: () => void;
};

export type SectionSearchSource = {
  chapter: Chapter;
  section: BookSection;
  meta: ChapterMeta;
  guide: SectionGuide;
  detail: LessonDetail;
};

type SearchEntry = SectionSearchSource & {
  text: string;
  headingText: string;
  sectionText: string;
  /** Читаемый текст параграфа — из него берётся фрагмент с совпадением. */
  plain: string;
};

const frequentSections = [1, 4, 16, 20, 29, 35, 48, 66];
const RESULT_LIMIT = 30;
const dialogTitleId = 'book-search-dialog-title';
const inputId = 'book-search-input';
const listboxId = 'book-search-results';

export function normalizeSearchText(value: string, language: Language) {
  return value
    .toLocaleLowerCase(language === 'ru' ? 'ru-RU' : 'en-US')
    .replaceAll('ё', 'е')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Русские окончания, от длинных к коротким. Без этого «производной» находит
 * 15 параграфов, «производные» — 18, а «производная» — 20: читатель теряет
 * результаты просто потому, что набрал другой падеж.
 */
const RUSSIAN_ENDINGS = [
  'иями', 'ями', 'ами', 'ыми', 'ими', 'ого', 'его', 'ому', 'ему',
  'ах', 'ях', 'ых', 'их', 'ов', 'ев', 'ей', 'ий', 'ый', 'ой', 'ая', 'яя',
  'ое', 'ее', 'ые', 'ие', 'ом', 'ем', 'ам', 'ям', 'ым', 'им', 'ую', 'юю',
  'ья', 'ье', 'ьи', 'ии', 'ия', 'ию', 'ие',
  'а', 'я', 'о', 'е', 'ы', 'и', 'у', 'ю', 'ь', 'й',
];

const MIN_STEM = 3;

/** Отсечение окончания за один проход: индекс и запрос стеммятся ровно один раз. */
export function stemToken(token: string, language: Language) {
  if (language !== 'ru') {
    // Только множественное число: «derivatives» → «derivative», но «class» не трогаем.
    if (token.length - 1 >= MIN_STEM && token.endsWith('s') && !token.endsWith('ss')) {
      return token.slice(0, -1);
    }
    return token;
  }
  for (const ending of RUSSIAN_ENDINGS) {
    if (token.length - ending.length >= MIN_STEM && token.endsWith(ending)) {
      return token.slice(0, -ending.length);
    }
  }
  return token;
}

/**
 * Формулы в прозе размечены парными «$». В индекс их содержимое не берём:
 * иначе запрос «begin» совпал бы с каждым параграфом, где есть матрица.
 */
export function stripMathSpans(value: string) {
  return value.replace(/\$[^$]*\$/g, ' ');
}

export function stemSearchText(value: string, language: Language) {
  return normalizeSearchText(stripMathSpans(value), language)
    .split(' ')
    .filter(Boolean)
    .map((token) => stemToken(token, language))
    .join(' ');
}

function sectionContentParts(section: BookSection, guide: SectionGuide, detail: LessonDetail): Array<string | number> {
  return [
    section.number,
    `§${section.number}`,
    `§ ${section.number}`,
    section.page,
    section.title,
    ...section.topics.flatMap((topic) => [topic.number, topic.page, topic.title]),
    guide.summary,
    guide.keyIdea,
    guide.question,
    guide.formula,
    detail.hook,
    ...detail.explanation,
    ...detail.terms.flatMap(({ term, definition }) => [term, definition]),
    detail.example.title,
    detail.example.problem,
    ...detail.example.steps,
    detail.example.answer,
    detail.pitfall,
    detail.practice.question,
    detail.practice.answer,
  ];
}

export function buildSectionSearchText({ chapter, section, meta, guide, detail }: SectionSearchSource, language: Language) {
  const localizedNumbers = language === 'ru'
    ? [`глава ${chapter.number}`, `параграф ${section.number}`]
    : [`chapter ${chapter.number}`, `section ${section.number}`];
  const parts: Array<string | number> = [
    chapter.number,
    chapter.roman,
    chapter.title,
    ...localizedNumbers,
    meta.kicker,
    meta.shortTitle,
    meta.description,
    meta.outcome,
    meta.formula,
    meta.symbol,
    meta.track,
    meta.accent,
    meta.hours,
    ...sectionContentParts(section, guide, detail),
  ];
  return stemSearchText(parts.join(' '), language);
}

/** `searchText` должен быть уже пропущен через stemSearchText — стеммим за один проход. */
export function matchesSearchText(searchText: string, query: string, language: Language) {
  const tokens = stemSearchText(query, language).split(' ').filter(Boolean);
  return tokens.length === 0 || tokens.every((token) => searchText.includes(token));
}

/**
 * Фрагмент, объясняющий, почему параграф попал в выдачу. Раньше результат
 * показывал только название, и совпадение в глубине разбора выглядело
 * необъяснимым.
 */
export function matchSnippet(plain: string, query: string, language: Language, radius = 60) {
  const token = stemSearchText(query, language).split(' ').filter(Boolean)[0];
  if (!token) return '';
  const haystack = normalizeSearchText(plain, language);
  const at = haystack.indexOf(token);
  if (at < 0) return '';
  const from = Math.max(0, plain.lastIndexOf(' ', Math.max(0, at - radius)) + 1);
  const to = plain.indexOf(' ', Math.min(plain.length, at + token.length + radius));
  const cut = plain.slice(from, to < 0 ? plain.length : to).trim();
  return `${from > 0 ? '…' : ''}${cut}${to > 0 && to < plain.length ? '…' : ''}`;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const { language, copy, chapters, chapterMeta, sectionGuides, lessonDetails } = useLocale();
  const c = copy.search;
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef(new Map<number, HTMLAnchorElement>());
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const entries = useMemo<SearchEntry[]>(() => chapters.flatMap((chapter) => chapter.sections.map((section) => {
    const source: SectionSearchSource = {
      chapter,
      section,
      meta: chapterMeta[chapter.number],
      guide: sectionGuides[section.number],
      detail: lessonDetails[section.number],
    };
    return {
      ...source,
      text: buildSectionSearchText(source, language),
      headingText: stemSearchText([
        section.number,
        `§${section.number}`,
        section.title,
        ...section.topics.flatMap((topic) => [topic.number, topic.title]),
      ].join(' '), language),
      sectionText: stemSearchText(sectionContentParts(section, source.guide, source.detail).join(' '), language),
      plain: stripMathSpans([source.guide.summary, source.detail.hook, ...source.detail.explanation, source.detail.pitfall].join(' ')).replace(/\s+/g, ' ').trim(),
    };
  })), [chapterMeta, chapters, language, lessonDetails, sectionGuides]);

  const matchingResults = useMemo(() => {
    if (!normalizeSearchText(query, language)) {
      const entriesByNumber = new Map(entries.map((entry) => [entry.section.number, entry]));
      return frequentSections.map((number) => entriesByNumber.get(number)).filter((entry): entry is SearchEntry => entry !== undefined);
    }
    return entries
      .filter((entry) => matchesSearchText(entry.text, query, language))
      .sort((left, right) => {
        const priority = (entry: SearchEntry) => matchesSearchText(entry.headingText, query, language)
          ? 0
          : matchesSearchText(entry.sectionText, query, language) ? 1 : 2;
        return priority(left) - priority(right) || left.section.number - right.section.number;
      });
  }, [entries, language, query]);
  const results = useMemo(() => matchingResults.slice(0, RESULT_LIMIT), [matchingResults]);
  const safeActiveIndex = results.length ? Math.min(activeIndex, results.length - 1) : -1;
  const activeOptionId = safeActiveIndex >= 0 ? `book-search-option-${results[safeActiveIndex].section.number}` : undefined;

  useEffect(() => {
    setQuery('');
    setActiveIndex(0);
  }, [language]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActiveIndex(0);
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, results.length]);

  useEffect(() => {
    if (!open || safeActiveIndex < 0) return;
    optionRefs.current.get(results[safeActiveIndex].section.number)?.scrollIntoView?.({ block: 'nearest' });
  }, [open, results, safeActiveIndex]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousBodyOverflow = document.body.style.overflow;
    const backgroundElements = Array.from(document.querySelectorAll<HTMLElement>('.app-shell > :not(.search-modal)'));
    const backgroundState = backgroundElements.map((element) => ({
      element,
      inert: element.hasAttribute('inert'),
      ariaHidden: element.getAttribute('aria-hidden'),
    }));
    for (const element of backgroundElements) {
      element.setAttribute('inert', '');
      element.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = 'hidden';
    const focusFrame = window.requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));

    const trapFocusAndClose = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])',
      ));
      if (!focusable.length) {
        event.preventDefault();
        panel.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;
      if (event.shiftKey && (current === first || !panel.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !panel.contains(current))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', trapFocusAndClose, true);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', trapFocusAndClose, true);
      document.body.style.overflow = previousBodyOverflow;
      for (const state of backgroundState) {
        if (!state.inert) state.element.removeAttribute('inert');
        if (state.ariaHidden === null) state.element.removeAttribute('aria-hidden');
        else state.element.setAttribute('aria-hidden', state.ariaHidden);
      }
      if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true });
    };
  }, [open]);

  if (!open) return null;

  const activateResult = (index: number) => {
    const result = results[index];
    if (!result) return;
    window.location.hash = routeHref({ page: 'section', section: result.section.number });
    onCloseRef.current();
  };

  const onInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (results.length) setActiveIndex((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (results.length) setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Home' && results.length) {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === 'End' && results.length) {
      event.preventDefault();
      setActiveIndex(results.length - 1);
    } else if (event.key === 'Enter' && safeActiveIndex >= 0) {
      event.preventDefault();
      activateResult(safeActiveIndex);
    }
  };

  const statusText = query
    ? matchingResults.length
      ? `${c.found}: ${matchingResults.length}${matchingResults.length > results.length ? ` · ${c.showingFirst} ${results.length}` : ''}`
      : `${c.emptyTitle}. ${c.emptyBody}`
    : c.frequent;

  return (
    <div
      className="search-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={dialogTitleId}
      onMouseDown={(event) => event.target === event.currentTarget && onCloseRef.current()}
    >
      <div ref={panelRef} className="search-panel" tabIndex={-1}>
        <h2 id={dialogTitleId} className="sr-only">{c.dialog}</h2>
        <div className="search-panel__input">
          <Search size={21} aria-hidden="true" />
          <label className="sr-only" htmlFor={inputId}>{c.dialog}</label>
          <input
            id={inputId}
            ref={inputRef}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="true"
            aria-haspopup="listbox"
            aria-controls={listboxId}
            aria-activedescendant={activeOptionId}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder={c.placeholder}
            autoComplete="off"
          />
          <button type="button" onClick={() => onCloseRef.current()} aria-label={c.closeButton}><X size={19} /></button>
        </div>
        <div className="search-panel__label" aria-hidden="true">{query ? `${c.found}: ${matchingResults.length}${matchingResults.length > results.length ? ` · ${c.showingFirst} ${results.length}` : ''}` : c.frequent}</div>
        <div
          id={listboxId}
          className={results.length ? 'search-results' : 'search-results search-results--empty'}
          role="listbox"
          aria-label={c.dialog}
        >
          {results.map(({ chapter, section, plain }, index) => {
            const optionId = `book-search-option-${section.number}`;
            const snippet = matchSnippet(plain, query, language);
            return (
              <a
                id={optionId}
                ref={(node) => {
                  if (node) optionRefs.current.set(section.number, node);
                  else optionRefs.current.delete(section.number);
                }}
                key={section.number}
                role="option"
                aria-selected={safeActiveIndex === index}
                tabIndex={-1}
                className={safeActiveIndex === index ? 'is-active' : ''}
                href={routeHref({ page: 'section', section: section.number })}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => onCloseRef.current()}
              >
                <span className={`search-result__symbol accent-${chapterMeta[chapter.number].accent}`}>{chapterMeta[chapter.number].symbol}</span>
                <span>
                  <small>{c.chapter} {chapter.roman} · § {section.number}</small>
                  <strong>{section.title}</strong>
                  {snippet && <em className="search-result__snippet">{snippet}</em>}
                </span>
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            );
          })}
          {!results.length && (
            <div className="empty-search" aria-hidden="true">
              <BookOpen size={25} />
              <strong>{c.emptyTitle}</strong>
              <span>{c.emptyBody}</span>
            </div>
          )}
        </div>
        <span className="sr-only" role="status" aria-live="polite">{statusText}</span>
        <div className="search-panel__footer"><span><kbd>↑</kbd><kbd>↓</kbd> {c.choose}</span><span><kbd>esc</kbd> {c.close}</span></div>
      </div>
    </div>
  );
}
