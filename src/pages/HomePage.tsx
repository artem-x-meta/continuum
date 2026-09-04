import { useId, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { ArrowRight, BookOpen, Braces, CheckCircle2, Download, FlaskConical, Network, Sparkles } from 'lucide-react';
import { routeHref } from '../routing';
import { HeroVisual } from '../components/HeroVisual';
import { MatrixLab } from '../components/labs/MatrixLab';
import { DerivativeLab } from '../components/labs/DerivativeLab';
import { RiemannLab } from '../components/labs/RiemannLab';
import { FourierLab } from '../components/labs/FourierLab';
import { useLocale } from '../i18n/LocaleContext';

const labComponents = [
  { id: 'matrix', component: MatrixLab },
  { id: 'derivative', component: DerivativeLab },
  { id: 'integral', component: RiemannLab },
  { id: 'fourier', component: FourierLab },
] as const;

type HomePageProps = {
  completed: Set<number>;
};

export function HomePage({ completed }: HomePageProps) {
  const { copy, bookStats, chapters, chapterMeta, tracks } = useLocale();
  const c = copy.home;
  const labTabsId = useId();
  const labTabs = labComponents.map((lab, index) => ({ ...lab, label: c.labTabs[index][0], note: c.labTabs[index][1] }));
  const [activeLab, setActiveLab] = useState<(typeof labComponents)[number]['id']>('matrix');
  const [mountedLabs, setMountedLabs] = useState<Set<string>>(() => new Set(['matrix']));
  const continueSection = chapters.flatMap((chapter) => chapter.sections).find((section) => !completed.has(section.number)) ?? chapters[0].sections[0];
  const selectLab = (id: (typeof labComponents)[number]['id']) => {
    setActiveLab(id);
    setMountedLabs((current) => current.has(id) ? current : new Set(current).add(id));
  };
  const activateLabFromKeyboard = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % labTabs.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + labTabs.length) % labTabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = labTabs.length - 1;
    else return;
    event.preventDefault();
    selectLab(labTabs[next].id);
    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabs?.[next]?.focus();
  };

  return (
    <main>
      <section className="home-hero page-width">
        <div className="home-hero__copy">
          <div className="hero-badge"><Sparkles size={14} /> {c.badge}</div>
          <h1>{c.titleA}<br /><em>{c.titleB}</em>{c.titleC}</h1>
          <p>{c.intro}</p>
          <div className="hero-actions">
            <a className="button button--primary" href={routeHref({ page: 'section', section: continueSection.number })}>
              {completed.size ? c.continue : c.start} <ArrowRight size={18} />
            </a>
            <a className="button button--ghost" href={routeHref({ page: 'catalog' })}><BookOpen size={18} /> {c.openCatalog}</a>
          </div>
          <div className="hero-proof">
            <div className="mini-avatars" aria-hidden="true"><span>∫</span><span>∂</span><span>Σ</span></div>
            <p><strong>{bookStats.chapters} {c.chapters} · {bookStats.sections} {c.sections}</strong><br />{c.route}</p>
          </div>
        </div>
        <HeroVisual />
      </section>

      <section className="principles-bar">
        <div className="page-width principles-bar__inner">
          {[FlaskConical, Braces, CheckCircle2, Network].map((Icon, index) => <div key={c.principles[index][0]}><Icon size={20} /><span><strong>{c.principles[index][0]}</strong> {c.principles[index][1]}</span></div>)}
        </div>
      </section>

      <section className="interactive-showcase section-space page-width">
        <div className="section-heading section-heading--split">
          <div>
            <span className="eyebrow">{c.interactiveKicker}</span>
            <h2 style={{ whiteSpace: 'pre-line' }}>{c.interactiveTitle}</h2>
          </div>
          <p>{c.interactiveText}</p>
        </div>
        <div className="lab-tabs" role="tablist" aria-label={c.labChoice}>
          {labTabs.map((lab, index) => (
            <button key={lab.id} id={`${labTabsId}-tab-${lab.id}`} type="button" className={activeLab === lab.id ? 'is-active' : ''} onClick={() => selectLab(lab.id)} onKeyDown={(event) => activateLabFromKeyboard(event, index)} role="tab" aria-selected={activeLab === lab.id} aria-controls={`${labTabsId}-panel-${lab.id}`} tabIndex={activeLab === lab.id ? 0 : -1}>
              <span>0{index + 1}</span><strong>{lab.label}</strong><small>{lab.note}</small>
            </button>
          ))}
        </div>
        <div className="showcase-lab">
          {labTabs.map((lab) => {
            const Lab = lab.component;
            const isActive = activeLab === lab.id;
            // Монтируем панель только после первого показа: иначе главная сразу
            // строит четыре SVG-лаборатории, из которых видна одна.
            return (
              <div key={lab.id} id={`${labTabsId}-panel-${lab.id}`} role="tabpanel" aria-labelledby={`${labTabsId}-tab-${lab.id}`} hidden={!isActive}>
                {(isActive || mountedLabs.has(lab.id)) && <Lab />}
              </div>
            );
          })}
        </div>
      </section>

      <section className="roadmap-section section-space">
        <div className="page-width">
          <div className="section-heading section-heading--split">
            <div><span className="eyebrow">{c.roadmapKicker}</span><h2 style={{ whiteSpace: 'pre-line' }}>{c.roadmapTitle}</h2></div>
            <p>{c.roadmapText}</p>
          </div>
          <div className="track-list">
            {tracks.map((track) => (
              <article key={track.name} className="track-row">
                <div className="track-row__intro"><span>{track.label}</span><p>{track.description}</p></div>
                <div className="track-row__chapters">
                  {track.chapters.map((number) => {
                    const chapter = chapters[number - 1];
                    const meta = chapterMeta[number];
                    return (
                      <a key={number} href={routeHref({ page: 'chapter', chapter: number })} className={`chapter-mini-card accent-${meta.accent}`}>
                        <span className="chapter-mini-card__symbol">{meta.symbol}</span>
                        <small>{c.chapter} {chapter.roman}</small>
                        <strong>{meta.shortTitle}</strong>
                        <em>{chapter.sections.length} §</em>
                      </a>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
          <a className="catalog-link" href={routeHref({ page: 'catalog' })}>{c.allTopicsA} {bookStats.topics} {c.allTopicsB} <ArrowRight size={18} /></a>
        </div>
      </section>

      <section className="knowledge-section section-space page-width">
        <div className="knowledge-card">
          <div className="knowledge-card__copy">
            <span className="eyebrow">{c.knowledgeKicker}</span>
            <h2 style={{ whiteSpace: 'pre-line' }}>{c.knowledgeTitle}</h2>
            <p>{c.knowledgeText}</p>
            <div className="knowledge-points">
              {c.knowledgePoints.map((point) => <span key={point}><CheckCircle2 size={16} /> {point}</span>)}
            </div>
            <a className="knowledge-download" href="./continuum-obsidian-vault.zip" download><Download size={17} /> {c.download}</a>
          </div>
          <div className="knowledge-graph" aria-hidden="true">
            <svg viewBox="0 0 440 320">
              <g className="graph-links">
                <line x1="220" y1="155" x2="98" y2="75" /><line x1="220" y1="155" x2="344" y2="72" />
                <line x1="220" y1="155" x2="355" y2="240" /><line x1="220" y1="155" x2="87" y2="245" />
                <line x1="98" y1="75" x2="50" y2="155" /><line x1="344" y1="72" x2="398" y2="153" />
                <line x1="87" y1="245" x2="50" y2="155" /><line x1="355" y1="240" x2="398" y2="153" />
              </g>
              <g className="graph-node graph-node--main"><circle cx="220" cy="155" r="48" /><text x="220" y="161">{c.graphLimit}</text></g>
              <g className="graph-node"><circle cx="98" cy="75" r="31" /><text x="98" y="80">{c.graphFunction}</text></g>
              <g className="graph-node"><circle cx="344" cy="72" r="35" /><text x="344" y="77">{c.graphContinuity}</text></g>
              <g className="graph-node"><circle cx="355" cy="240" r="35" /><text x="355" y="245">{c.graphDerivative}</text></g>
              <g className="graph-node"><circle cx="87" cy="245" r="31" /><text x="87" y="250">{c.graphSmall}</text></g>
              <circle className="graph-dot" cx="50" cy="155" r="8" /><circle className="graph-dot" cx="398" cy="153" r="8" />
            </svg>
          </div>
        </div>
      </section>

      <section className="final-cta page-width">
        <span className="final-cta__formula">lim <sub>x→a</sub> f(x)</span>
        <div><span className="eyebrow">{c.finalKicker}</span><h2>{c.finalTitle}</h2><p>{c.finalText}</p></div>
        <a className="button button--light" href={routeHref({ page: 'section', section: 1 })}>{c.finalButton} <ArrowRight size={18} /></a>
      </section>
    </main>
  );
}
