import { ArrowRight, BookOpen, Check, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { Route } from '../routing';
import { routeHref } from '../routing';
import { useLocale } from '../i18n/LocaleContext';

type AppHeaderProps = {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  completed: Set<number>;
  currentRoute: Route;
};

export function AppHeader({
  theme,
  onToggleTheme,
  onOpenSearch,
  mobileMenuOpen,
  onToggleMobileMenu,
  completed,
  currentRoute,
}: AppHeaderProps) {
  const { language, setLanguage, copy, chapters } = useLocale();
  const c = copy.header;
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const catalogActive = currentRoute.page === 'catalog';
  const labsActive = currentRoute.page === 'labs';
  // Куда вести «Продолжить»: первый незавершённый параграф читателя.
  const resumeSection = chapters.flatMap((chapter) => chapter.sections).find((section) => !completed.has(section.number))
    ?? chapters[0].sections[0];
  const resumeLabel = completed.size ? c.resume : c.start;
  const closeMobileMenu = () => {
    if (mobileMenuOpen) onToggleMobileMenu();
  };
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onToggleMobileMenu();
        mobileMenuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!mobileNavRef.current?.contains(target) && !mobileMenuButtonRef.current?.contains(target)) onToggleMobileMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [mobileMenuOpen, onToggleMobileMenu]);
  return (
    <header className="topbar">
      <a href={routeHref({ page: 'home' })} className="brand" aria-label={c.home} aria-current={currentRoute.page === 'home' ? 'page' : undefined}>
        <span className="brand__mark">∫</span>
        <span className="brand__name">{language === 'ru' ? 'континуум' : 'continuum'}</span>
      </a>

      <nav className="topbar__nav" aria-label={c.mainNav}>
        <a className={catalogActive ? 'is-active' : ''} aria-current={catalogActive ? 'page' : undefined} href={routeHref({ page: 'catalog' })}>{c.catalog}</a>
        <a href={routeHref({ page: 'section', section: resumeSection.number })}>{resumeLabel}</a>
        <a className={labsActive ? 'is-active' : ''} aria-current={labsActive ? 'page' : undefined} href={routeHref({ page: 'labs' })}>{c.labs}</a>
      </nav>

      <div className="topbar__actions">
        <button type="button" className="search-trigger" onClick={onOpenSearch} aria-keyshortcuts="Control+K Meta+K /">
          <Search size={17} />
          <span>{c.search}</span>
          <kbd>Ctrl K</kbd>
        </button>
        {completed.size > 0 && (
          <a href={routeHref({ page: 'catalog' })} className="progress-pill" title={c.completed}>
            <Check size={14} /> {completed.size}/80
          </a>
        )}
        <div className="language-switch" role="group" aria-label={c.language}>
          <button type="button" aria-pressed={language === 'ru'} className={language === 'ru' ? 'is-active' : ''} onClick={() => setLanguage('ru')}>RU</button>
          <button type="button" aria-pressed={language === 'en'} className={language === 'en' ? 'is-active' : ''} onClick={() => setLanguage('en')}>EN</button>
        </div>
        <button type="button" className="icon-button" onClick={onToggleTheme} aria-label={theme === 'light' ? c.dark : c.light} aria-pressed={theme === 'dark'}>
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <button ref={mobileMenuButtonRef} type="button" className="icon-button mobile-menu-button" onClick={onToggleMobileMenu} aria-label={mobileMenuOpen ? c.closeMenu : c.menu} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation">
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav ref={mobileNavRef} id="mobile-navigation" className="mobile-nav" aria-label={c.mobileNav}>
          <a onClick={closeMobileMenu} aria-current={catalogActive ? 'page' : undefined} href={routeHref({ page: 'catalog' })}><BookOpen size={17} /> {c.catalog}</a>
          <a onClick={closeMobileMenu} href={routeHref({ page: 'section', section: resumeSection.number })}><ArrowRight size={17} /> {resumeLabel} · § {resumeSection.number}</a>
          <a onClick={closeMobileMenu} aria-current={labsActive ? 'page' : undefined} href={routeHref({ page: 'labs' })}>{c.labs}</a>
          <button type="button" onClick={onOpenSearch}><Search size={17} /> {c.searchShort}</button>
        </nav>
      )}
    </header>
  );
}
