import { Check, ChevronDown, ChevronRight, Search } from 'lucide-react';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { routeHref } from '../routing';
import { useLocale } from '../i18n/LocaleContext';

type BookSidebarProps = {
  currentChapter: number;
  currentSection?: number;
  completed: Set<number>;
  onOpenSearch: () => void;
  openOnMobile?: boolean;
  onClose?: () => void;
};

export function BookSidebar({ currentChapter, currentSection, completed, onOpenSearch, openOnMobile = false, onClose }: BookSidebarProps) {
  const { copy, chapters, chapterMeta } = useLocale();
  const c = copy.sidebar;
  // Несколько глав можно держать открытыми: сравнить два раздела — обычная задача.
  const [expanded, setExpanded] = useState<Set<number>>(() => new Set([currentChapter]));
  const [mobileLayout, setMobileLayout] = useState(() => window.matchMedia('(max-width: 900px)').matches);
  const sidebarRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => setExpanded((current) => current.has(currentChapter) ? current : new Set(current).add(currentChapter)), [currentChapter]);

  // Без этого отметка «ты здесь» уезжает под сгиб на дальних главах:
  // сайдбар прокручен в начало, а активный параграф — на 1250px ниже.
  useEffect(() => {
    const sidebar = sidebarRef.current;
    const active = sidebar?.querySelector<HTMLElement>('.sidebar-sections a.is-active');
    if (!sidebar || !active) return;
    const offset = active.offsetTop - sidebar.clientHeight / 2 + active.offsetHeight / 2;
    sidebar.scrollTo({ top: Math.max(0, offset), behavior: 'instant' });
  }, [currentChapter, currentSection, expanded]);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 900px)');
    const onChange = (event: MediaQueryListEvent) => setMobileLayout(event.matches);
    setMobileLayout(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!mobileLayout || !openOnMobile) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose?.();
        return;
      }
      if (event.key === 'Tab') {
        const focusable = [...(sidebarRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [])]
          .filter((element) => element.getClientRects().length > 0);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileLayout, onClose, openOnMobile]);

  return (
    <>
      {mobileLayout && openOnMobile && <div className="book-sidebar-backdrop" aria-hidden="true" onClick={onClose} />}
      <aside
        ref={sidebarRef}
        id="book-sidebar"
        className={`book-sidebar ${openOnMobile ? 'book-sidebar--mobile-open' : ''}`}
        aria-label={c.nav}
        role={mobileLayout ? 'dialog' : undefined}
        aria-modal={mobileLayout && openOnMobile ? true : undefined}
        aria-hidden={mobileLayout && !openOnMobile ? true : undefined}
        inert={mobileLayout && !openOnMobile ? true : undefined}
      >
        <button ref={closeButtonRef} className="sidebar-close" type="button" onClick={onClose} aria-label={c.close}><X size={18} /> {c.close}</button>
        <button className="sidebar-search" type="button" onClick={() => { onOpenSearch(); onClose?.(); }}><Search size={16} /> {c.search} <kbd>/</kbd></button>
        <div className="sidebar-kicker">{c.scope}</div>
        <nav className="sidebar-nav" aria-label={c.nav}>
          {chapters.map((chapter) => {
            const isExpanded = expanded.has(chapter.number);
            const done = chapter.sections.filter((section) => completed.has(section.number)).length;
            const sectionsId = `sidebar-chapter-${chapter.number}`;
            return (
              <div className="sidebar-chapter" key={chapter.number}>
                <button
                  type="button"
                  className={chapter.number === currentChapter ? 'is-current' : ''}
                  onClick={() => setExpanded((current) => {
                    const next = new Set(current);
                    if (!next.delete(chapter.number)) next.add(chapter.number);
                    return next;
                  })}
                  aria-expanded={isExpanded}
                  aria-controls={sectionsId}
                >
                  <span className={`sidebar-chapter__number accent-${chapterMeta[chapter.number].accent}`}>{chapter.roman}</span>
                  <span><strong>{chapterMeta[chapter.number].shortTitle}</strong><small>{done}/{chapter.sections.length} {c.completed}</small></span>
                  {isExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                </button>
                {isExpanded && (
                  <div className="sidebar-sections" id={sectionsId}>
                    <a onClick={onClose} href={routeHref({ page: 'chapter', chapter: chapter.number })} aria-current={!currentSection && chapter.number === currentChapter ? 'page' : undefined} className={!currentSection && chapter.number === currentChapter ? 'is-active' : ''}>{c.overview}</a>
                    {chapter.sections.map((section) => (
                      <a onClick={onClose} key={section.number} href={routeHref({ page: 'section', section: section.number })} aria-current={section.number === currentSection ? 'page' : undefined} className={section.number === currentSection ? 'is-active' : ''}>
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
    </>
  );
}
