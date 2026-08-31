import { ArrowRight, Check, Clock3, Menu, Target } from 'lucide-react';
import { BookSidebar } from '../components/BookSidebar';
import { routeHref } from '../routing';
import { useLocale } from '../i18n/LocaleContext';

type ChapterPageProps = {
  chapterNumber: number;
  completed: Set<number>;
  onOpenSearch: () => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export function ChapterPage({ chapterNumber, completed, onOpenSearch, sidebarOpen, onToggleSidebar }: ChapterPageProps) {
  const { copy, chapters, chapterMeta } = useLocale();
  const c = copy.chapter;
  const chapter = chapters.find((item) => item.number === chapterNumber) ?? chapters[0];
  const meta = chapterMeta[chapter.number];
  const completeCount = chapter.sections.filter((section) => completed.has(section.number)).length;
  const percent = Math.round((completeCount / chapter.sections.length) * 100);

  return (
    <div className="book-layout">
      <BookSidebar currentChapter={chapter.number} completed={completed} onOpenSearch={onOpenSearch} openOnMobile={sidebarOpen} />
      <main className="chapter-page">
        <button className="lesson-mobile-toc chapter-mobile-toc" type="button" onClick={onToggleSidebar}><Menu size={17} /> {copy.lesson.toc}</button>
        <header className={`chapter-hero accent-${meta.accent}`}>
          <div className="breadcrumbs"><a href={routeHref({ page: 'catalog' })}>{c.book}</a><span>/</span><span>{c.chapter} {chapter.roman}</span></div>
          <div className="chapter-hero__main">
            <div>
              <span className="eyebrow">{c.chapter} {chapter.roman} · {meta.kicker}</span>
              <h1>{chapter.title}</h1>
              <p>{meta.description}</p>
            </div>
            <div className="chapter-hero__symbol">{meta.symbol}</div>
          </div>
          <div className="chapter-meta-row">
            <span><Clock3 size={16} /> ≈ {meta.hours} {c.hours}</span>
            <span><Target size={16} /> {chapter.sections.length} {chapter.sections.length === 1 ? c.sectionOne : c.sections}</span>
            <span className="chapter-progress"><i><b style={{ width: `${percent}%` }} /></i>{percent}%</span>
          </div>
        </header>

        <div className="chapter-content">
          <section className="chapter-outcome">
            <span>{c.after}</span><p>{meta.outcome}</p><strong>{meta.formula}</strong>
          </section>
          <div className="chapter-section-heading"><span className="eyebrow">{c.route}</span><h2>{c.paragraphs}</h2></div>
          <div className="section-card-list">
            {chapter.sections.map((section, index) => (
              <a key={section.number} className={completed.has(section.number) ? 'is-complete' : ''} href={routeHref({ page: 'section', section: section.number })}>
                <span className="section-card__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="section-card__copy">
                  <small>§ {section.number} · {section.topics.length || 1} {(section.topics.length || 1) === 1 ? c.blockOne : c.blocks}</small>
                  <strong>{section.title}</strong>
                  <em>{section.topics.slice(0, 3).map((topic) => topic.title).join(' · ') || c.whole}</em>
                </span>
                {completed.has(section.number) ? <span className="section-card__done"><Check size={17} /></span> : <ArrowRight size={19} />}
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
