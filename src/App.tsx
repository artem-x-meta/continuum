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

export function parseNumberSet(value: string | null) {
  try {
    const parsed = JSON.parse(value ?? '[]');
    return new Set<number>(Array.isArray(parsed)
      ? parsed.filter((item) => Number.isInteger(item) && item >= 1 && item <= 80)
      : []);
  } catch {
    return new Set<number>();
  }
}

function readNumberSet(key: string) {
  try {
    return parseNumberSet(localStorage.getItem(key));
  } catch {
    return new Set<number>();
  }
}

function storeNumberSet(key: string, value: Set<number>) {
  try {
    localStorage.setItem(key, JSON.stringify([...value].sort((a, b) => a - b)));
  } catch {
    // Progress remains usable for the current tab when storage is unavailable.
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
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_KEY);
    } catch {
      // Fall back to the operating-system preference.
    }
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
    document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#101720' : '#f4f2eb');
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // The visual theme still works when storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === null) {
        setCompleted(new Set());
        setBookmarks(new Set());
        return;
      }
      if (event.key === COMPLETED_KEY) setCompleted(parseNumberSet(event.newValue));
      if (event.key === BOOKMARKS_KEY) setBookmarks(parseNumberSet(event.newValue));
      if (event.key === THEME_KEY && (event.newValue === 'light' || event.newValue === 'dark')) setTheme(event.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1181px)');
    const closeResponsiveNavigation = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMobileNavOpen(false);
        setSidebarOpen(false);
      }
    };
    if (desktop.matches) {
      setMobileNavOpen(false);
      setSidebarOpen(false);
    }
    desktop.addEventListener('change', closeResponsiveNavigation);
    return () => desktop.removeEventListener('change', closeResponsiveNavigation);
  }, []);

  useEffect(() => {
    const desktopBookLayout = window.matchMedia('(min-width: 901px)');
    const closeSidebarOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setSidebarOpen(false);
    };
    if (desktopBookLayout.matches) setSidebarOpen(false);
    desktopBookLayout.addEventListener('change', closeSidebarOnDesktop);
    return () => desktopBookLayout.removeEventListener('change', closeSidebarOnDesktop);
  }, []);

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

  const toggleStored = (key: string, value: number, current: Set<number>, setter: React.Dispatch<React.SetStateAction<Set<number>>>) => {
    let next = new Set(current);
    try {
      next = parseNumberSet(localStorage.getItem(key));
    } catch {
      // Use the in-memory state if storage cannot be read.
    }
    if (next.has(value)) next.delete(value); else next.add(value);
    storeNumberSet(key, next);
    setter(next);
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
      {route.page === 'chapter' && <ChapterPage chapterNumber={route.chapter} completed={completed} onOpenSearch={openSearch} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((value) => !value)} onCloseSidebar={() => setSidebarOpen(false)} />}
      {route.page === 'section' && (
        <LessonPage
          sectionNumber={route.section}
          completed={completed}
          bookmarks={bookmarks}
          onToggleComplete={(section) => toggleStored(COMPLETED_KEY, section, completed, setCompleted)}
          onToggleBookmark={(section) => toggleStored(BOOKMARKS_KEY, section, bookmarks, setBookmarks)}
          onOpenSearch={openSearch}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((value) => !value)}
          onCloseSidebar={() => setSidebarOpen(false)}
        />
      )}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

export default App;
