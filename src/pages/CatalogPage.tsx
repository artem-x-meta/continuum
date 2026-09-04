import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Bookmark, Check, Search } from 'lucide-react';
import { buildSectionSearchText, matchesSearchText } from '../components/SearchDialog';
import { routeHref } from '../routing';
import { useLocale } from '../i18n/LocaleContext';
import { plural } from '../i18n/plural';

type CatalogPageProps = { completed: Set<number>; bookmarks: Set<number> };

export function CatalogPage({ completed, bookmarks }: CatalogPageProps) {
  const { language, copy, bookStats, chapters, chapterMeta, tracks, sectionGuides, lessonDetails } = useLocale();
  const c = copy.catalog;
  const [query, setQuery] = useState('');
  const [track, setTrack] = useState('all');
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  useEffect(() => {
    setQuery('');
    setTrack('all');
  }, [language]);

  const indexedChapters = useMemo(() => chapters.map((chapter) => ({
    chapter,
    meta: chapterMeta[chapter.number],
    sections: chapter.sections.map((section) => ({
      section,
      text: buildSectionSearchText({
        chapter,
        section,
        meta: chapterMeta[chapter.number],
        guide: sectionGuides[section.number],
        detail: lessonDetails[section.number],
      }, language),
    })),
  })), [chapterMeta, chapters, language, lessonDetails, sectionGuides]);

  const visibleChapters = useMemo(() => indexedChapters.flatMap(({ chapter, meta, sections }) => {
    if (track !== 'all' && meta.track !== track) return [];
    const visibleSections = sections
      .filter(({ section }) => !onlyBookmarks || bookmarks.has(section.number))
      .filter(({ text }) => matchesSearchText(text, query, language))
      .map(({ section }) => section);
    return visibleSections.length ? [{ chapter, sections: visibleSections }] : [];
  }), [bookmarks, indexedChapters, language, onlyBookmarks, query, track]);

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
        <label className="catalog-search"><Search size={18} aria-hidden="true" /><span className="sr-only">{c.filter}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={c.filter} /></label>
        <div className="filter-pills" role="group" aria-label={c.filter}>
          <button type="button" aria-pressed={track === 'all'} className={track === 'all' ? 'is-active' : ''} onClick={() => setTrack('all')}>{c.all}</button>
          {tracks.map((item) => <button key={item.name} type="button" aria-pressed={track === item.name} className={track === item.name ? 'is-active' : ''} onClick={() => setTrack(item.name)}>{item.name}</button>)}
          <button type="button" aria-pressed={onlyBookmarks} className={onlyBookmarks ? 'is-active bookmark-filter' : 'bookmark-filter'} onClick={() => setOnlyBookmarks((value) => !value)}><Bookmark size={13} fill={onlyBookmarks ? 'currentColor' : 'none'} aria-hidden="true" /> {c.bookmarks}{bookmarks.size ? ` · ${bookmarks.size}` : ''}</button>
        </div>
      </div>

      <div className="catalog-chapters">
        {visibleChapters.map(({ chapter, sections }) => {
          const meta = chapterMeta[chapter.number];
          return (
            <article key={chapter.number} className={`catalog-chapter accent-${meta.accent}`}>
              <a className="catalog-chapter__header" href={routeHref({ page: 'chapter', chapter: chapter.number })}>
                <span className="catalog-chapter__symbol">{meta.symbol}</span>
                <span><small>{c.chapter} {chapter.roman} · {meta.kicker}</small><h2>{meta.shortTitle}</h2><p>{meta.description}</p></span>
                <ArrowRight size={21} />
              </a>
              <div className={sections.length === 1 ? 'catalog-chapter__sections is-single' : 'catalog-chapter__sections'}>
                {sections.map((section) => (
                  <a key={section.number} href={routeHref({ page: 'section', section: section.number })}>
                    <span className="catalog-section-number">§ {section.number}</span>
                    <span><strong>{section.title}</strong><small>{section.topics.length ? `${section.topics.length} ${plural(section.topics.length, c.topicForms, language)}` : c.whole}</small></span>
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
