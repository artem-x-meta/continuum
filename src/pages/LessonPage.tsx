import { useEffect, useMemo, useRef, useState, type ComponentType } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, Check, Copy, Lightbulb, Menu, Network } from 'lucide-react';
import { BookSidebar } from '../components/BookSidebar';
import { Math } from '../components/Math';
import { RichText } from '../components/RichText';
import { ConceptCard, Reveal, StepExample, TermExplorer } from '../components/LessonBlocks';
import { getRelatedSectionNumbers } from '../data/relations';
import { routeHref } from '../routing';
import { DerivativeLesson, FourierLesson, MatricesLesson, RiemannLesson } from './lessonContent';
import { useLocale } from '../i18n/LocaleContext';
import { plural } from '../i18n/plural';
import { MatrixLab } from '../components/labs/MatrixLab';
import { DerivativeLab } from '../components/labs/DerivativeLab';
import { RiemannLab } from '../components/labs/RiemannLab';
import { FourierLab } from '../components/labs/FourierLab';

type LessonPageProps = {
  sectionNumber: number;
  completed: Set<number>;
  bookmarks: Set<number>;
  onToggleComplete: (section: number) => void;
  onToggleBookmark: (section: number) => void;
  onOpenSearch: () => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onCloseSidebar: () => void;
};

const featuredLessons: Partial<Record<number, ComponentType>> = {
  1: MatricesLesson,
  20: DerivativeLesson,
  35: RiemannLesson,
  66: FourierLesson,
};

const localizedLabs: Partial<Record<number, ComponentType>> = {
  1: MatrixLab,
  20: DerivativeLab,
  35: RiemannLab,
  66: FourierLab,
};

type OutlineItem = { id: string; label: string };

/**
 * Оглавление страницы собирается из того, что реально отрендерилось,
 * а не из заранее заданного списка: блоки у параграфов разные.
 */
function useArticleOutline(key: string) {
  const [outline, setOutline] = useState<OutlineItem[]>([]);
  const [activeHeading, setActiveHeading] = useState('');

  useEffect(() => {
    const body = document.querySelector('.lesson-body');
    if (!body) return;

    const items: OutlineItem[] = [];
    body.querySelectorAll<HTMLElement>(':scope > section, :scope > aside').forEach((block, index) => {
      const label = (block.dataset.outline ?? block.querySelector('h2, h3')?.textContent ?? '').trim();
      if (!label) return;
      if (!block.id) block.id = `block-${index + 1}`;
      items.push({ id: block.id, label });
    });
    setOutline(items);
    setActiveHeading(items[0]?.id ?? '');
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActiveHeading(visible[0].target.id);
      },
      { rootMargin: '-90px 0px -55% 0px' },
    );
    for (const item of items) {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [key]);

  return { outline, activeHeading };
}

function GenericLesson({ sectionNumber }: { sectionNumber: number }) {
  const { language, copy, findSection, sectionGuides, lessonDetails } = useLocale();
  const c = copy.lesson;
  const result = findSection(sectionNumber)!;
  const { section } = result;
  const guide = sectionGuides[sectionNumber];
  const detail = lessonDetails[sectionNumber];
  const Lab = localizedLabs[sectionNumber];
  const related = getRelatedSectionNumbers(sectionNumber).map((number) => findSection(number)).filter((item) => item !== undefined);

  return (
    <>
      {Lab && <Lab />}
      <section id="idea">
        <h2>{c.why}</h2>
        <p><RichText>{detail.hook}</RichText></p>
        <h3>{c.unpack}</h3>
        {detail.explanation.map((paragraph) => <p key={paragraph}><RichText>{paragraph}</RichText></p>)}
        <ConceptCard title={c.oneLine} type="idea"><p><RichText>{guide.keyIdea}</RichText></p></ConceptCard>
      </section>
      <section id="formula">
        <h2>{c.formula}</h2>
        <Math block>{guide.formula}</Math>
        <p className="formula-caption">{c.formulaCaption}</p>
      </section>
      <TermExplorer terms={detail.terms} />
      <section id="route">
        <h2>{c.route}</h2>
        {section.topics.length ? (
          <ol className="topic-route">
            {section.topics.map((topic) => (
              <li id={`topic-${topic.number.replace('.', '-')}`} key={topic.number}>
                <span>{topic.number}</span>
                <h3>{topic.title}</h3>
              </li>
            ))}
          </ol>
        ) : <p>{c.whole}</p>}
      </section>
      <section id="example">
        <h2>{c.solution}</h2>
        <StepExample example={detail.example} />
      </section>
      <ConceptCard title={c.mistake} type="mistake"><p><RichText>{detail.pitfall}</RichText></p></ConceptCard>
      <section id="check">
        <h2>{c.selfCheck}</h2>
        <div className="open-question"><Lightbulb size={21} /><strong><RichText>{guide.question}</RichText></strong></div>
        <Reveal label={c.answerGuide}><p><RichText>{guide.keyIdea}</RichText></p><p>{c.answerGuideText}</p></Reveal>
      </section>
      <section id="practice">
        <h2>{c.practice}</h2>
        <div className="open-question"><Lightbulb size={21} /><strong><RichText>{detail.practice.question}</RichText></strong></div>
        <Reveal label={c.showSolution}><p><RichText>{detail.practice.answer}</RichText></p></Reveal>
      </section>
      <section id="connections">
        <h2>{c.connections}</h2>
        <div className="connection-note"><Network size={22} /><p>{c.connectionsText}</p></div>
        <div className="connection-links">
          {related.map(({ chapter, section: item }) => <a key={item.number} href={routeHref({ page: 'section', section: item.number })}><small>{c.chapter} {chapter.roman} · § {item.number}</small><strong>{item.title}</strong></a>)}
        </div>
      </section>
    </>
  );
}

export function LessonPage({
  sectionNumber,
  completed,
  bookmarks,
  onToggleComplete,
  onToggleBookmark,
  onOpenSearch,
  sidebarOpen,
  onToggleSidebar,
  onCloseSidebar,
}: LessonPageProps) {
  const { language, copy, chapters, chapterMeta, findSection, sectionGuides } = useLocale();
  const c = copy.lesson;
  const result = findSection(sectionNumber) ?? findSection(1)!;
  const { chapter, section } = result;
  const meta = chapterMeta[chapter.number];
  const guide = sectionGuides[section.number];
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const tocButtonRef = useRef<HTMLButtonElement>(null);
  const allSections = useMemo(() => chapters.flatMap((item) => item.sections.map((entry) => ({ chapter: item, section: entry }))), [chapters]);
  const currentIndex = allSections.findIndex((item) => item.section.number === section.number);
  const previous = allSections[currentIndex - 1];
  const next = allSections[currentIndex + 1];
  const Featured = language === 'ru' ? featuredLessons[section.number] : undefined;
  const complete = completed.has(section.number);
  const bookmarked = bookmarks.has(section.number);
  const topicCount = section.topics.length;
  const { outline, activeHeading } = useArticleOutline(`${language}-${section.number}`);

  const closeSidebar = () => {
    onCloseSidebar();
    tocButtonRef.current?.focus();
  };

  const copyLink = async () => {
    setCopyFailed(false);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
      } else {
        const input = document.createElement('textarea');
        input.value = window.location.href;
        input.setAttribute('readonly', '');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        const succeeded = document.execCommand('copy');
        input.remove();
        if (!succeeded) throw new Error('Copy command failed');
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
      setCopyFailed(true);
      window.setTimeout(() => setCopyFailed(false), 2200);
    }
  };

  return (
    <div className="book-layout lesson-layout">
      <BookSidebar currentChapter={chapter.number} currentSection={section.number} completed={completed} onOpenSearch={onOpenSearch} openOnMobile={sidebarOpen} onClose={closeSidebar} />
      <main className="lesson-page">
        <button ref={tocButtonRef} className="lesson-mobile-toc" type="button" onClick={onToggleSidebar} aria-expanded={sidebarOpen} aria-controls="book-sidebar"><Menu size={17} /> {c.toc}</button>
        <article className="lesson-article">
          <header className={`lesson-header accent-${meta.accent}`}>
            <div className="breadcrumbs"><a href={routeHref({ page: 'catalog' })}>{c.book}</a><span>/</span><a href={routeHref({ page: 'chapter', chapter: chapter.number })}>{c.chapter} {chapter.roman}</a><span>/</span><span>§ {section.number}</span></div>
            <div className="lesson-header__topline"><span className="eyebrow">§ {section.number} · {meta.shortTitle}</span><div><button type="button" className={bookmarked ? 'is-active' : ''} onClick={() => onToggleBookmark(section.number)} aria-label={bookmarked ? c.removeBookmark : c.bookmark} aria-pressed={bookmarked}><Bookmark size={18} fill={bookmarked ? 'currentColor' : 'none'} /></button><button type="button" onClick={copyLink} aria-label={copied ? c.copied : copyFailed ? c.copyFailed : c.copy}>{copied ? <Check size={18} /> : <Copy size={18} />}</button><span className="sr-only" role="status" aria-live="polite">{copied ? c.copied : copyFailed ? c.copyFailed : ''}</span></div></div>
            <h1>{section.title}</h1>
            <p>{guide?.summary ? <RichText>{guide.summary}</RichText> : null}</p>
            {topicCount > 0 && <div className="lesson-meta"><span>{topicCount} {plural(topicCount, c.topicForms, language)}</span></div>}
          </header>

          <div className="lesson-body">
            {Featured ? <Featured /> : <GenericLesson key={`${language}-${section.number}`} sectionNumber={section.number} />}
          </div>

          <footer className="lesson-finish">
            <div><h2>{complete ? c.finishDone : c.finishQuestion}</h2><p>{c.localProgress}</p></div>
            <button type="button" className={complete ? 'is-complete' : ''} onClick={() => onToggleComplete(section.number)} aria-pressed={complete}>{complete ? <><Check size={19} /> {c.done}</> : c.complete}</button>
          </footer>

          <nav className="lesson-pagination" aria-label={c.adjacent}>
            {previous ? <a href={routeHref({ page: 'section', section: previous.section.number })}><ArrowLeft size={18} /><span><small>{c.back} · § {previous.section.number}</small><strong>{previous.section.title}</strong></span></a> : <span />}
            {next && <a href={routeHref({ page: 'section', section: next.section.number })}><span><small>{c.next} · § {next.section.number}</small><strong>{next.section.title}</strong></span><ArrowRight size={18} /></a>}
          </nav>
        </article>

        <aside className="lesson-outline">
          <span>{c.onPage}</span>
          {outline.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activeHeading === item.id ? 'is-current' : ''}
              aria-current={activeHeading === item.id ? 'true' : undefined}
              onClick={() => document.getElementById(item.id)?.scrollIntoView()}
            >
              {item.label}
            </button>
          ))}
          <div className="outline-progress"><span>{c.bookProgress}</span><strong>{completed.size}/80</strong><i><b style={{ width: `${(completed.size / 80) * 100}%` }} /></i></div>
        </aside>
      </main>
    </div>
  );
}
