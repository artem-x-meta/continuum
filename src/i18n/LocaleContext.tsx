import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  bookStats,
  chapterMeta as russianChapterMeta,
  chapters as russianChapters,
  tracks as russianTracks,
  type BookSection,
  type Chapter,
  type ChapterMeta,
} from '../data/book';
import { sectionGuides as russianGuides, type SectionGuide } from '../data/sectionGuides';
import { lessonDetails as russianDetails } from '../data/lessonDetails';
import type { LessonDetail } from '../data/lessonDetailTypes';
import { englishSections1 } from '../data/en/sections-1';
import { englishSections2 } from '../data/en/sections-2';
import { englishSections3 } from '../data/en/sections-3';
import { englishChapterMeta, englishChapterTitles, englishTracks } from '../data/en/bookMeta';
import { copies, type Language } from './copy';
import { parseRoute, routeHref, routeLanguage, setRouteLanguageFallback } from '../routing';

const LOCALE_KEY = 'continuum:locale';
const englishSections = { ...englishSections1, ...englishSections2, ...englishSections3 };

function preferredLanguage(): Language {
  const fromRoute = routeLanguage();
  if (fromRoute) return fromRoute;
  if (window.location.hash.replace(/^#\/?/, '').length > 0) return 'ru';
  const stored = localStorage.getItem(LOCALE_KEY);
  if (stored === 'ru' || stored === 'en') return stored;
  return navigator.language.toLocaleLowerCase().startsWith('en') ? 'en' : 'ru';
}

function localizeChapters(): Chapter[] {
  return russianChapters.map((chapter) => ({
    ...chapter,
    title: englishChapterTitles[chapter.number],
    sections: chapter.sections.map((section): BookSection => ({
      ...section,
      title: englishSections[section.number].title,
      topics: section.topics.map((topic, index) => ({
        ...topic,
        title: englishSections[section.number].topics[index],
      })),
    })),
  }));
}

const englishChapters = localizeChapters();
const englishGuides: Record<number, SectionGuide> = Object.fromEntries(
  Object.entries(englishSections).map(([number, bundle]) => [Number(number), bundle.guide]),
);
const englishDetails: Record<number, LessonDetail> = Object.fromEntries(
  Object.entries(englishSections).map(([number, bundle]) => [Number(number), bundle.detail]),
);

type LocaleValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  copy: (typeof copies)[Language];
  chapters: Chapter[];
  chapterMeta: Record<number, ChapterMeta>;
  tracks: ReadonlyArray<{ name: string; label: string; description: string; chapters: readonly number[] }>;
  sectionGuides: Record<number, SectionGuide>;
  lessonDetails: Record<number, LessonDetail>;
  bookStats: typeof bookStats;
  findSection: (sectionNumber: number) => { chapter: Chapter; section: BookSection } | undefined;
};

const LocaleContext = createContext<LocaleValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(preferredLanguage);
  setRouteLanguageFallback(language);

  useEffect(() => {
    const onHashChange = () => {
      const fromRoute = routeLanguage();
      if (fromRoute) {
        setLanguageState(fromRoute);
        localStorage.setItem(LOCALE_KEY, fromRoute);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem(LOCALE_KEY, language);
    if (!routeLanguage()) window.history.replaceState(null, '', routeHref(parseRoute(), language));
    const description = copies[language].home.intro;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector<HTMLMetaElement>('meta[property="og:locale"]')?.setAttribute('content', language === 'ru' ? 'ru_RU' : 'en_US');
  }, [language]);

  const setLanguage = (nextLanguage: Language) => {
    localStorage.setItem(LOCALE_KEY, nextLanguage);
    setLanguageState(nextLanguage);
    window.location.hash = routeHref(parseRoute(), nextLanguage).slice(1);
  };

  const value = useMemo<LocaleValue>(() => {
    const chapters = language === 'ru' ? russianChapters : englishChapters;
    const chapterMeta = language === 'ru' ? russianChapterMeta : englishChapterMeta;
    const tracks = language === 'ru' ? russianTracks : englishTracks;
    const sectionGuides = language === 'ru' ? russianGuides : englishGuides;
    const lessonDetails = language === 'ru' ? russianDetails : englishDetails;
    return {
      language,
      setLanguage,
      copy: copies[language],
      chapters,
      chapterMeta,
      tracks,
      sectionGuides,
      lessonDetails,
      bookStats,
      findSection(sectionNumber: number) {
        for (const chapter of chapters) {
          const section = chapter.sections.find((item) => item.number === sectionNumber);
          if (section) return { chapter, section };
        }
        return undefined;
      },
    };
  }, [language]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error('useLocale must be used inside LocaleProvider');
  return value;
}
