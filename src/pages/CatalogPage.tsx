import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Bookmark, Check, Search } from 'lucide-react';
import { routeHref } from '../routing';
import { useLocale } from '../i18n/LocaleContext';

type CatalogPageProps = { completed: Set<number>; bookmarks: Set<number> };

export function CatalogPage({ completed, bookmarks }: CatalogPageProps) {
  const { language, copy, bookStats, chapters, chapterMeta, tracks } = useLocale();
  const c = copy.catalog;
  const [query, setQuery] = useState('');
  const [track, setTrack] = useState('all');
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  useEffect(() => setTrack('all'), [language]);
  const visibleChapters = useMemo(() => chapters.filter((chapter) => {
    if (track !== 'all' && chapterMeta[chapter.number].track !== track) return false;
    if (onlyBookmarks && !chapter.sections.some((section) => bookmarks.has(section.number))) return false;
    if (!query.trim()) return true;
    const haystack = `${chapter.title} ${chapter.sections.map((section) => `${section.title} ${section.topics.map((topic) => topic.title).join(' ')}`).join(' ')}`.toLocaleLowerCase(language);
    return haystack.includes(query.toLocaleLowerCase(language));
  }), [bookmarks, chapterMeta, chapters, language, onlyBookmarks, query, track]);

  return (
    <main className="catalog-page page-width">
      <header className="catalog-hero">
        <span className="eyebrow">{c.kicker}</span>
        <h1 style={{ whiteSpace: 'pre-line' }}>{c.title}</h1>
        <p>{bookStats.chapters} {c.introA} {bookStats.sections} {c.introB} {bookStats.topics} {c.introC}</p>
        <div className="catalog-stats">
          <div><strong>{bookStats.chapters}</strong><span>{c.chapters}</span></div>
          <div><strong>{bookStats.sections}</strong><span>{c.sections}</span></div>
          <div><strong>{bookStats.topics}</strong><span>{c.topics}</span></div>
          <div><strong>{completed.size}</strong><span>{c.completed}</span></div>
        </div>
      </header>

      <div className="catalog-tools">
        <label className="catalog-search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={c.filter} /></label>
        <div className="filter-pills">
          <button type="button" className={track === 'all' ? 'is-active' : ''} onClick={() => setTrack('all')}>{c.all}</button>
          {tracks.map((item) => <button key={item.name} type="button" className={track === item.name ? 'is-active' : ''} onClick={() => setTrack(item.name)}>{item.name}</button>)}
          <button type="button" className={onlyBookmarks ? 'is-active bookmark-filter' : 'bookmark-filter'} onClick={() => setOnlyBookmarks((value) => !value)}><Bookmark size={13} fill={onlyBookmarks ? 'currentColor' : 'none'} /> {c.bookmarks}{bookmarks.size ? ` · ${bookmarks.size}` : ''}</button>
        </div>
      </div>

      <div className="catalog-chapters">
        {visibleChapters.map((chapter) => {
          const meta = chapterMeta[chapter.number];
          return (
            <article key={chapter.number} className={`catalog-chapter accent-${meta.accent}`}>
              <a className="catalog-chapter__header" href={routeHref({ page: 'chapter', chapter: chapter.number })}>
                <span className="catalog-chapter__symbol">{meta.symbol}</span>
                <span><small>{c.chapter} {chapter.roman} · {meta.kicker}</small><h2>{meta.shortTitle}</h2><p>{meta.description}</p></span>
                <ArrowRight size={21} />
              </a>
              <div className="catalog-chapter__sections">
                {chapter.sections.filter((section) => !onlyBookmarks || bookmarks.has(section.number)).map((section) => (
                  <a key={section.number} href={routeHref({ page: 'section', section: section.number })}>
                    <span className="catalog-section-number">§ {section.number}</span>
                    <span><strong>{section.title}</strong><small>{section.topics.length ? `${section.topics.length} ${section.topics.length === 1 ? c.topicOne : c.topicCount}` : c.whole}</small></span>
                    {completed.has(section.number) ? <Check size={17} className="catalog-done" /> : bookmarks.has(section.number) ? <Bookmark size={15} className="catalog-bookmark" fill="currentColor" /> : <ArrowRight size={16} />}
                  </a>
                ))}
              </div>
            </article>
          );
        })}
      </div>
      {!visibleChapters.length && <div className="catalog-empty">{c.empty}</div>}
    </main>
  );
}
