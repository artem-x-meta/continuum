import { useMemo, useRef, useState, type ComponentType } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, Check, Clock3, Copy, Gauge, Lightbulb, Menu, Network } from 'lucide-react';
import { BookSidebar } from '../components/BookSidebar';
import { Math } from '../components/Math';
import { ConceptCard, LearningGoals, Reveal, StepExample, TermExplorer } from '../components/LessonBlocks';
import { getRelatedSectionNumbers } from '../data/relations';
import { routeHref } from '../routing';
import { DerivativeLesson, FourierLesson, MatricesLesson, RiemannLesson } from './lessonContent';
import { useLocale } from '../i18n/LocaleContext';
import { plural, pluralForRange } from '../i18n/plural';
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

function GenericLesson({ sectionNumber }: { sectionNumber: number }) {
  const { language, copy, findSection, sectionGuides, lessonDetails } = useLocale();
  const c = copy.lesson;
  const result = findSection(sectionNumber)!;
  const { section } = result;
  const guide = sectionGuides[sectionNumber];
  const detail = lessonDetails[sectionNumber];
  const Lab = localizedLabs[sectionNumber];
  const related = getRelatedSectionNumbers(sectionNumber).map((number) => findSection(number)).filter((item) => item !== undefined);
  const goals = section.topics.length
    ? section.topics.slice(0, 5).map((topic) => language === 'ru' ? `${c.explainTopic} «${topic.title.toLocaleLowerCase('ru')}»` : `${c.explainTopic} “${topic.title}”`)
    : [...c.goalsFallback];

  return (
    <>
      <LearningGoals items={goals} />
      {Lab && <Lab />}
      <section id="idea">
        <h2>{c.why}</h2>
        <p>{detail.hook}</p>
        <h3>{c.unpack}</h3>
        {detail.explanation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <ConceptCard title={c.oneLine} type="idea"><p>{guide.keyIdea}</p></ConceptCard>
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
          <div className="topic-route">
            {section.topics.map((topic, index) => (
              <article id={`topic-${topic.number.replace('.', '-')}`} key={topic.number}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><small>{topic.number}</small><h3>{topic.title}</h3><p>{index === 0 ? c.startBlock : index === section.topics.length - 1 ? c.endBlock : c.middleBlock}</p></div>
              </article>
            ))}
          </div>
        ) : <p>{c.whole}</p>}
      </section>
      <section id="example">
        <h2>{c.solution}</h2>
        <StepExample example={detail.example} />
      </section>
      <ConceptCard title={c.mistake} type="mistake"><p>{detail.pitfall}</p></ConceptCard>
      <section id="check">
        <h2>{c.selfCheck}</h2>
        <div className="open-question"><Lightbulb size={21} /><strong>{guide.question}</strong></div>
        <Reveal label={c.answerGuide}><p>{guide.keyIdea}</p><p>{c.answerGuideText}</p></Reveal>
      </section>
      <section id="practice">
        <h2>{c.practice}</h2>
        <div className="open-question"><Lightbulb size={21} /><strong>{detail.practice.question}</strong></div>
        <Reveal label={c.showSolution}><p>{detail.practice.answer}</p></Reveal>
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
  const readingTime = Featured ? '50–65' : '20–30';
  const blockCount = section.topics.length || 1;

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
            <p>{guide?.summary}</p>
            <div className="lesson-meta"><span><Clock3 size={16} /> {readingTime} {pluralForRange(readingTime, c.minuteForms, language)}</span><span><Gauge size={16} /> {section.number < 13 ? c.base : section.number < 47 ? c.middle : c.advanced}</span><span>{blockCount} {plural(blockCount, c.blockForms, language)}</span></div>
          </header>

          <div className="lesson-body">
            {Featured ? <Featured /> : <GenericLesson key={`${language}-${section.number}`} sectionNumber={section.number} />}
          </div>

          <footer className="lesson-finish">
            <div><span className="eyebrow">{c.finish}</span><h2>{complete ? c.finishDone : c.finishQuestion}</h2><p>{c.localProgress}</p></div>
            <button type="button" className={complete ? 'is-complete' : ''} onClick={() => onToggleComplete(section.number)} aria-pressed={complete}>{complete ? <><Check size={19} /> {c.done}</> : c.complete}</button>
          </footer>

          <nav className="lesson-pagination" aria-label={c.adjacent}>
            {previous ? <a href={routeHref({ page: 'section', section: previous.section.number })}><ArrowLeft size={18} /><span><small>{c.back} · § {previous.section.number}</small><strong>{previous.section.title}</strong></span></a> : <span />}
            {next && <a href={routeHref({ page: 'section', section: next.section.number })}><span><small>{c.next} · § {next.section.number}</small><strong>{next.section.title}</strong></span><ArrowRight size={18} /></a>}
          </nav>
        </article>

        <aside className="lesson-outline">
          <span>{c.onPage}</span>
          <button type="button" onClick={() => document.getElementById(Featured ? 'experiment' : 'idea')?.scrollIntoView()}>{Featured ? c.experiment : c.why}</button>
          <button type="button" onClick={() => document.getElementById(Featured ? 'definition' : 'formula')?.scrollIntoView()}>{Featured ? c.definition : c.formula}</button>
          <button type="button" onClick={() => document.getElementById(Featured ? 'check' : 'example')?.scrollIntoView()}>{Featured ? c.selfCheck : c.example}</button>
          {!Featured && <button type="button" onClick={() => document.getElementById('practice')?.scrollIntoView()}>{c.practice}</button>}
          <div className="outline-progress"><span>{c.bookProgress}</span><strong>{completed.size}/80</strong><i><b style={{ width: `${(completed.size / 80) * 100}%` }} /></i></div>
        </aside>
      </main>
    </div>
  );
}
