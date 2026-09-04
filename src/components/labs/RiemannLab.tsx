import { useMemo, useState } from 'react';
import { midpointRiemann, riemannExact, riemannFunction } from '../../lib/math';
import { useLocale } from '../../i18n/LocaleContext';

const width = 640;
const height = 320;
const sx = (x: number) => 48 + (x / 4) * (width - 76);
const sy = (y: number) => height - 35 - (y / 5) * (height - 60);

export function RiemannLab() {
  const { copy } = useLocale();
  const c = copy.labs;
  const [n, setN] = useState(7);
  const rectangles = midpointRiemann(n);
  const approximate = rectangles.reduce((sum, rectangle) => sum + rectangle.width * rectangle.height, 0);
  const exact = riemannExact();
  const curve = useMemo(() => Array.from({ length: 121 }, (_, index) => {
    const x = (index / 120) * 4;
    return `${index ? 'L' : 'M'} ${sx(x)} ${sy(riemannFunction(x))}`;
  }).join(' '), []);

  return (
    <section className="lab lab--riemann" aria-labelledby="riemann-lab-title">
      <div className="lab__heading">
        <div>
          <span className="eyebrow">{c.lab} 03</span>
          <h3 id="riemann-lab-title">{c.riemannTitle}</h3>
        </div>
        <div className="lab-chip">f(x) = x²/4 + 1/2</div>
      </div>

      <div className="graph-frame">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${c.riemannTitle}: ${n}`}>
          <line x1={sx(0)} x2={sx(4) + 10} y1={sy(0)} y2={sy(0)} className="lab-axis" />
          <line x1={sx(0)} x2={sx(0)} y1="14" y2={sy(0)} className="lab-axis" />
          {rectangles.map((rectangle, index) => (
            <rect
              key={index}
              x={sx(rectangle.left)}
              y={sy(rectangle.height)}
              width={sx(rectangle.left + rectangle.width) - sx(rectangle.left)}
              height={sy(0) - sy(rectangle.height)}
              className="riemann-rect"
            />
          ))}
          <path d={curve} className="graph-curve" />
          {[0, 1, 2, 3, 4].map((tick) => <text key={tick} x={sx(tick)} y={sy(0) + 20} className="axis-label">{tick}</text>)}
        </svg>
      </div>

      <div className="lab-controls">
        <label>
          <span>{c.rectangles} <strong>{n}</strong></span>
          <input type="range" min="2" max="36" step="1" value={n} onChange={(event) => setN(Number(event.target.value))} />
        </label>
      </div>
      <div className="lab-readout lab-readout--wide" aria-live="polite" aria-atomic="true">
        <div><span>{c.sum}</span><strong>{approximate.toFixed(4)}</strong></div>
        <div><span>{c.exact}</span><strong>{exact.toFixed(4)}</strong></div>
        <div><span>{c.error}</span><strong>{Math.abs(approximate - exact).toFixed(4)}</strong></div>
      </div>
      <p className="lab-hint">{c.riemannHint}</p>
    </section>
  );
}
