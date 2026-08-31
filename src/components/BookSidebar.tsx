import { Check, ChevronDown, ChevronRight, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { routeHref } from '../routing';
import { useLocale } from '../i18n/LocaleContext';

type BookSidebarProps = {
  currentChapter: number;
  currentSection?: number;
  completed: Set<number>;
  onOpenSearch: () => void;
  openOnMobile?: boolean;
};

export function BookSidebar({ currentChapter, currentSection, completed, onOpenSearch, openOnMobile = false }: BookSidebarProps) {
  const { copy, chapters, chapterMeta } = useLocale();
  const c = copy.sidebar;
  const [expanded, setExpanded] = useState(currentChapter);
  useEffect(() => setExpanded(currentChapter), [currentChapter]);

  return (
    <aside className={`book-sidebar ${openOnMobile ? 'book-sidebar--mobile-open' : ''}`}>
      <button className="sidebar-search" type="button" onClick={onOpenSearch}><Search size={16} /> {c.search} <kbd>/</kbd></button>
      <div className="sidebar-kicker">{c.scope}</div>
      <nav className="sidebar-nav" aria-label={c.nav}>
        {chapters.map((chapter) => {
          const isExpanded = expanded === chapter.number;
          const done = chapter.sections.filter((section) => completed.has(section.number)).length;
          return (
            <div className="sidebar-chapter" key={chapter.number}>
              <button type="button" className={chapter.number === currentChapter ? 'is-current' : ''} onClick={() => setExpanded(isExpanded ? 0 : chapter.number)}>
                <span className={`sidebar-chapter__number accent-${chapterMeta[chapter.number].accent}`}>{chapter.roman}</span>
                <span><strong>{chapterMeta[chapter.number].shortTitle}</strong><small>{done}/{chapter.sections.length} {c.completed}</small></span>
                {isExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
              </button>
              {isExpanded && (
                <div className="sidebar-sections">
                  <a href={routeHref({ page: 'chapter', chapter: chapter.number })} className={!currentSection && chapter.number === currentChapter ? 'is-active' : ''}>{c.overview}</a>
                  {chapter.sections.map((section) => (
                    <a key={section.number} href={routeHref({ page: 'section', section: section.number })} className={section.number === currentSection ? 'is-active' : ''}>
                      <span>§ {section.number}</span>{section.title}
                      {completed.has(section.number) && <Check size={13} />}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
