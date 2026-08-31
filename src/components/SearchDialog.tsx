import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { ArrowRight, BookOpen, Search, X } from 'lucide-react';
import { routeHref } from '../routing';
import { useLocale } from '../i18n/LocaleContext';

type SearchDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const { language, copy, chapters, chapterMeta } = useLocale();
  const c = copy.search;
  const normalize = (value: string) => value.toLocaleLowerCase(language).replaceAll('ё', 'е').trim();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const entries = useMemo(() => chapters.flatMap((chapter) => chapter.sections.map((section) => ({
    chapter,
    section,
    text: normalize(`${section.number} ${section.title} ${section.topics.map((topic) => topic.title).join(' ')}`),
  }))), [chapters, language]);
  const results = useMemo(() => {
    const normalized = normalize(query);
    if (!normalized) return entries.filter((entry) => [1, 4, 16, 20, 29, 35, 48, 66].includes(entry.section.number));
    return entries.filter((entry) => entry.text.includes(normalized)).slice(0, 10);
  }, [entries, query]);

  useEffect(() => setActiveIndex(0), [language, query, results.length]);

  useEffect(() => {
    if (open) {
      setQuery('');
      window.setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open, onClose]);

  if (!open) return null;

  const onInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!results.length) return;
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!results.length) return;
      setActiveIndex((index) => Math.max(index - 1, 0));
    }
    if (event.key === 'Enter' && results[activeIndex]) {
      window.location.hash = routeHref({ page: 'section', section: results[activeIndex].section.number });
      onClose();
    }
  };

  return (
    <div className="search-modal" role="dialog" aria-modal="true" aria-label={c.dialog} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="search-panel">
        <div className="search-panel__input">
          <Search size={21} />
          <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={onInputKeyDown} placeholder={c.placeholder} />
          <button type="button" onClick={onClose} aria-label={c.closeButton}><X size={19} /></button>
        </div>
        <div className="search-panel__label">{query ? `${c.found}: ${results.length}` : c.frequent}</div>
        <div className="search-results">
          {results.map(({ chapter, section }, index) => (
            <a key={section.number} className={activeIndex === index ? 'is-active' : ''} href={routeHref({ page: 'section', section: section.number })} onMouseEnter={() => setActiveIndex(index)} onClick={onClose}>
              <span className={`search-result__symbol accent-${chapterMeta[chapter.number].accent}`}>{chapterMeta[chapter.number].symbol}</span>
              <span>
                <small>{c.chapter} {chapter.roman} · § {section.number}</small>
                <strong>{section.title}</strong>
              </span>
              <ArrowRight size={18} />
            </a>
          ))}
          {!results.length && (
            <div className="empty-search">
              <BookOpen size={25} />
              <strong>{c.emptyTitle}</strong>
              <span>{c.emptyBody}</span>
            </div>
          )}
        </div>
        <div className="search-panel__footer"><span><kbd>↑</kbd><kbd>↓</kbd> {c.choose}</span><span><kbd>esc</kbd> {c.close}</span></div>
      </div>
    </div>
  );
}
