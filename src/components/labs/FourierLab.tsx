import { useMemo, useState } from 'react';
import { fourierSquare } from '../../lib/math';
import { useLocale } from '../../i18n/LocaleContext';
import { LabTask } from './LabTask';

const width = 640;
const height = 290;
const sx = (x: number) => ((x + Math.PI) / (2 * Math.PI)) * width;
const sy = (y: number) => height / 2 - y * 90;

export function FourierLab() {
  const { copy } = useLocale();
  const c = copy.labs;
  const [harmonics, setHarmonics] = useState(3);
  // Максимум |f(x) − 1| на плато, в стороне от скачков: показывает, как сумма
  // сходится там, где эффект Гиббса ни при чём.
  const deviation = useMemo(() => {
    let worst = 0;
    for (let index = 0; index <= 200; index += 1) {
      const x = 0.6 + ((Math.PI - 1.2) * index) / 200;
      worst = Math.max(worst, Math.abs(fourierSquare(x, harmonics) - 1));
    }
    return worst;
  }, [harmonics]);
  const path = useMemo(() => Array.from({ length: 401 }, (_, index) => {
    const x = -Math.PI + (index / 400) * 2 * Math.PI;
    return `${index ? 'L' : 'M'} ${sx(x)} ${sy(fourierSquare(x, harmonics))}`;
  }).join(' '), [harmonics]);

  return (
    <section className="lab lab--fourier" aria-labelledby="fourier-lab-title">
      <div className="lab__heading">
        <div>
          <span className="eyebrow">{c.lab} 04</span>
          <h3 id="fourier-lab-title">{c.fourierTitle}</h3>
        </div>
        <div className="lab-chip">{c.odd}</div>
      </div>
      <div className="graph-frame">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${c.fourierTitle}: ${harmonics}`}>
          <line x1="0" x2={width} y1={sy(0)} y2={sy(0)} className="lab-axis" />
          <line x1={sx(0)} x2={sx(0)} y1="0" y2={height} className="lab-axis" />
          <path d={`M 0 ${sy(-1)} L ${sx(0)} ${sy(-1)} L ${sx(0)} ${sy(1)} L ${width} ${sy(1)}`} className="fourier-target" />
          <path d={path} className="graph-curve graph-curve--violet" />
          <text x="12" y={sy(1) - 10} className="axis-label">{c.target}</text>
        </svg>
      </div>
      <div className="lab-controls">
        <label>
          <span>{c.harmonics} <strong>{harmonics}</strong></span>
          <input type="range" min="1" max="18" step="1" value={harmonics} onChange={(event) => setHarmonics(Number(event.target.value))} />
        </label>
      </div>
      <div className="lab-readout" aria-live="polite" aria-atomic="true">
        <div><span>{c.deviation}</span><strong>{deviation.toFixed(3)}</strong></div>
      </div>
      <p className="lab-hint">{c.fourierHint}</p>
      <LabTask text={c.fourierTask} done={deviation < 0.05} />
    </section>
  );
}
