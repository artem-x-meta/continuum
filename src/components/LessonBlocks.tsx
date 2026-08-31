import { useId, useState, type ReactNode } from 'react';
import { AlertTriangle, Brain, Check, ChevronDown, ChevronRight, ChevronUp, Lightbulb, RotateCcw, Target } from 'lucide-react';
import type { LessonDetail } from '../data/lessonDetailTypes';
import { useLocale } from '../i18n/LocaleContext';

export function LearningGoals({ items }: { items: string[] }) {
  const { copy } = useLocale();
  return (
    <section className="learning-goals">
      <div className="learning-goals__icon"><Target size={21} /></div>
      <div><span>{copy.blocks.goals}</span><ul>{items.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></div>
    </section>
  );
}

export function ConceptCard({ title, type = 'idea', children }: { title: string; type?: 'idea' | 'rule' | 'mistake'; children: ReactNode }) {
  return (
    <aside className={`concept-card concept-card--${type}`}>
      <div className="concept-card__title">{type === 'mistake' ? <AlertTriangle size={18} /> : <Lightbulb size={18} />}<strong>{title}</strong></div>
      <div>{children}</div>
    </aside>
  );
}

export function WorkedExample({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  const { copy } = useLocale();
  return (
    <section className="worked-example">
      <header><span>{number}</span><div><small>{copy.blocks.worked}</small><h3>{title}</h3></div></header>
      <div className="worked-example__body">{children}</div>
    </section>
  );
}

type QuickCheckProps = {
  question: string;
  options: Array<{ label: string; explanation: string }>;
  correctIndex: number;
};

export function QuickCheck({ question, options, correctIndex }: QuickCheckProps) {
  const { copy } = useLocale();
  const c = copy.blocks;
  const [selected, setSelected] = useState<number | null>(null);
  const id = useId();
  return (
    <section className="quick-check" id="check">
      <span className="quick-check__kicker">{c.check}</span>
      <h3>{question}</h3>
      <div className="quick-check__options">
        {options.map((option, index) => {
          const state = selected === null ? '' : index === correctIndex ? 'is-correct' : selected === index ? 'is-wrong' : 'is-muted';
          return <button key={`${id}-${index}`} className={state} type="button" onClick={() => setSelected(index)} disabled={selected !== null}><span>{String.fromCharCode(65 + index)}</span>{option.label}{selected !== null && index === correctIndex && <Check size={17} />}</button>;
        })}
      </div>
      {selected !== null && <div className={`quick-check__feedback ${selected === correctIndex ? 'is-correct' : 'is-wrong'}`}><strong>{selected === correctIndex ? c.exact : c.almost}</strong> {options[selected].explanation}</div>}
      {selected !== null && <button type="button" className="quick-check__retry" onClick={() => setSelected(null)}>{c.retry}</button>}
    </section>
  );
}

export function Reveal({ label, children }: { label?: string; children: ReactNode }) {
  const { copy } = useLocale();
  const [open, setOpen] = useState(false);
  return (
    <div className={`reveal ${open ? 'is-open' : ''}`}>
      <button type="button" onClick={() => setOpen((value) => !value)}>{open ? <ChevronUp size={17} /> : <ChevronDown size={17} />}{open ? copy.blocks.hide : label ?? copy.blocks.showAnswer}</button>
      {open && <div className="reveal__content">{children}</div>}
    </div>
  );
}

export function TermExplorer({ terms }: { terms: LessonDetail['terms'] }) {
  const { copy } = useLocale();
  const [active, setActive] = useState(0);
  return (
    <section className="term-explorer">
      <div className="term-explorer__header"><Brain size={19} /><span>{copy.blocks.glossary}</span></div>
      <div className="term-explorer__tabs" role="tablist">
        {terms.map((term, index) => (
          <button key={term.term} type="button" role="tab" aria-selected={active === index} className={active === index ? 'is-active' : ''} onClick={() => setActive(index)}>{term.term}</button>
        ))}
      </div>
      <div className="term-explorer__definition" role="tabpanel">
        <span>{String(active + 1).padStart(2, '0')}</span>
        <p>{terms[active]?.definition}</p>
      </div>
    </section>
  );
}

export function StepExample({ example }: { example: LessonDetail['example'] }) {
  const { copy } = useLocale();
  const c = copy.blocks;
  const [visibleSteps, setVisibleSteps] = useState(0);
  const complete = visibleSteps >= example.steps.length;
  return (
    <section className="step-example">
      <header><span>{c.steps}</span><h3>{example.title}</h3></header>
      <div className="step-example__problem"><strong>{c.problem}</strong><p>{example.problem}</p></div>
      <ol>
        {example.steps.map((step, index) => (
          <li key={index} className={index < visibleSteps ? 'is-visible' : ''}>
            <span>{index < visibleSteps ? <Check size={15} /> : index + 1}</span>
            <p>{index < visibleSteps ? step : c.hidden}</p>
          </li>
        ))}
      </ol>
      {complete && <div className="step-example__answer"><span>{c.answer}</span><strong>{example.answer}</strong></div>}
      <button type="button" onClick={() => setVisibleSteps(complete ? 0 : visibleSteps + 1)}>
        {complete ? <><RotateCcw size={16} /> {c.restart}</> : <>{visibleSteps ? c.showNext : c.showFirst} <ChevronRight size={16} /></>}
      </button>
    </section>
  );
}
