import { useCallback, useEffect, useState } from 'react';
import { AppHeader } from './components/AppHeader';
import { SearchDialog } from './components/SearchDialog';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ChapterPage } from './pages/ChapterPage';
import { LessonPage } from './pages/LessonPage';
import { LabsPage } from './pages/LabsPage';
import { parseRoute, type Route } from './routing';
import { useLocale } from './i18n/LocaleContext';

const COMPLETED_KEY = 'continuum:completed';
const BOOKMARKS_KEY = 'continuum:bookmarks';
const THEME_KEY = 'continuum:theme';

function readNumberSet(key: string) {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? '[]');
    return new Set<number>(Array.isArray(value) ? value.filter((item) => typeof item === 'number') : []);
  } catch {
    return new Set<number>();
  }
}

function App() {
  const { language, chapterMeta, findSection } = useLocale();
  const [route, setRoute] = useState<Route>(() => parseRoute());
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completed, setCompleted] = useState<Set<number>>(() => readNumberSet(COMPLETED_KEY));
  const [bookmarks, setBookmarks] = useState<Set<number>>(() => readNumberSet(BOOKMARKS_KEY));
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseRoute());
      setMobileNavOpen(false);
      setSidebarOpen(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (route.page === 'home') document.title = language === 'ru' ? 'Континуум — высшая математика' : 'Continuum — higher mathematics';
    if (route.page === 'catalog') document.title = language === 'ru' ? 'Оглавление — Континуум' : 'Contents — Continuum';
    if (route.page === 'labs') document.title = language === 'ru' ? 'Лаборатории — Континуум' : 'Laboratories — Continuum';
    if (route.page === 'chapter') document.title = `${chapterMeta[route.chapter]?.shortTitle ?? (language === 'ru' ? 'Глава' : 'Chapter')} — ${language === 'ru' ? 'Континуум' : 'Continuum'}`;
    if (route.page === 'section') document.title = `${findSection(route.section)?.section.title ?? (language === 'ru' ? 'Параграф' : 'Section')} — ${language === 'ru' ? 'Континуум' : 'Continuum'}`;
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', document.title);
  }, [chapterMeta, findSection, language, route]);

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    setMobileNavOpen(false);
  }, []);

  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable;
      if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === 'k') {
        event.preventDefault();
        openSearch();
      } else if (event.key === '/' && !isTyping) {
        event.preventDefault();
        openSearch();
      }
    };
    window.addEventListener('keydown', onShortcut);
    return () => window.removeEventListener('keydown', onShortcut);
  }, [openSearch]);

  const toggleStored = (key: string, value: number, setter: React.Dispatch<React.SetStateAction<Set<number>>>) => {
    setter((current) => {
      const next = new Set(current);
      if (next.has(value)) next.delete(value); else next.add(value);
      localStorage.setItem(key, JSON.stringify([...next]));
      return next;
    });
  };

  return (
    <div className="app-shell">
      <AppHeader
        theme={theme}
        onToggleTheme={() => setTheme((value) => value === 'light' ? 'dark' : 'light')}
        onOpenSearch={openSearch}
        mobileMenuOpen={mobileNavOpen}
        onToggleMobileMenu={() => setMobileNavOpen((value) => !value)}
        completed={completed.size}
        currentRoute={route}
      />

      {route.page === 'home' && <HomePage completed={completed} />}
      {route.page === 'catalog' && <CatalogPage completed={completed} bookmarks={bookmarks} />}
      {route.page === 'labs' && <LabsPage />}
      {route.page === 'chapter' && <ChapterPage chapterNumber={route.chapter} completed={completed} onOpenSearch={openSearch} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((value) => !value)} />}
      {route.page === 'section' && (
        <LessonPage
          sectionNumber={route.section}
          completed={completed}
          bookmarks={bookmarks}
          onToggleComplete={(section) => toggleStored(COMPLETED_KEY, section, setCompleted)}
          onToggleBookmark={(section) => toggleStored(BOOKMARKS_KEY, section, setBookmarks)}
          onOpenSearch={openSearch}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((value) => !value)}
        />
      )}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

export default App;
