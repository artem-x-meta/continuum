import { useMemo, useState } from 'react';
import { derivativeFunction, exactDerivative, secantSlope } from '../../lib/math';
import { useLocale } from '../../i18n/LocaleContext';
import { LabTask } from './LabTask';

const width = 640;
const height = 330;
const xRange: [number, number] = [-3.2, 3.2];
const yRange: [number, number] = [-5.4, 5.4];
const sx = (x: number) => ((x - xRange[0]) / (xRange[1] - xRange[0])) * width;
const sy = (y: number) => height - ((y - yRange[0]) / (yRange[1] - yRange[0])) * height;

function linePath(slope: number, x0: number, y0: number) {
  const leftY = y0 + slope * (xRange[0] - x0);
  const rightY = y0 + slope * (xRange[1] - x0);
  return `M ${sx(xRange[0])} ${sy(leftY)} L ${sx(xRange[1])} ${sy(rightY)}`;
}

export function DerivativeLab() {
  const { copy } = useLocale();
  const c = copy.labs;
  const [x0, setX0] = useState(-0.8);
  const [h, setH] = useState(1.4);
  const maxH = Math.min(2.4, xRange[1] - x0);
  const slope = secantSlope(x0, h);
  const tangent = exactDerivative(x0);
  const curve = useMemo(() => Array.from({ length: 161 }, (_, index) => {
    const x = xRange[0] + (index / 160) * (xRange[1] - xRange[0]);
    return `${index ? 'L' : 'M'} ${sx(x)} ${sy(derivativeFunction(x))}`;
  }).join(' '), []);

  return (
    <section className="lab lab--derivative" aria-labelledby="derivative-lab-title">
      <div className="lab__heading">
        <div>
          <span className="eyebrow">{c.lab} 02</span>
          <h3 id="derivative-lab-title">{c.derivativeTitle}</h3>
        </div>
        <div className="lab-chip">f(x) = ¼x³ − x</div>
      </div>

      <div className="graph-frame">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={c.derivativeTitle}>
          <defs>
            <pattern id="derivative-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeOpacity=".08" />
            </pattern>
          </defs>
          <rect width={width} height={height} fill="url(#derivative-grid)" />
          <line x1="0" x2={width} y1={sy(0)} y2={sy(0)} className="lab-axis" />
          <line x1={sx(0)} x2={sx(0)} y1="0" y2={height} className="lab-axis" />
          <path d={curve} className="graph-curve" />
          <path d={linePath(tangent, x0, derivativeFunction(x0))} className="graph-tangent" />
          <path d={linePath(slope, x0, derivativeFunction(x0))} className="graph-secant" />
          <circle cx={sx(x0)} cy={sy(derivativeFunction(x0))} r="6" className="graph-point graph-point--a" />
          <circle cx={sx(x0 + h)} cy={sy(derivativeFunction(x0 + h))} r="6" className="graph-point graph-point--b" />
        </svg>
        <div className="graph-legend" aria-hidden="true">
          <span><i className="legend-secant" /> {c.secant}</span>
          <span><i className="legend-tangent" /> {c.tangent}</span>
        </div>
      </div>

      <div className="lab-controls lab-controls--two">
        <label>
          <span>{c.point} x₀ <strong>{x0.toFixed(2)}</strong></span>
          <input type="range" min="-2.2" max="2.2" step="0.05" value={x0} onChange={(event) => {
            const nextX = Number(event.target.value);
            setX0(nextX);
            setH((current) => Math.min(current, xRange[1] - nextX));
          }} />
        </label>
        <label>
          <span>{c.step} h <strong>{h.toFixed(2)}</strong></span>
          <input type="range" min="0.05" max={maxH} step="0.05" value={Math.min(h, maxH)} onChange={(event) => setH(Number(event.target.value))} />
        </label>
      </div>

      <div className="lab-readout lab-readout--wide" aria-live="polite" aria-atomic="true">
        <div><span>{c.secantSlope}</span><strong>{slope.toFixed(3)}</strong></div>
        <div><span>{c.derivative} f′(x₀)</span><strong>{tangent.toFixed(3)}</strong></div>
        <div><span>{c.error}</span><strong>{Math.abs(slope - tangent).toFixed(3)}</strong></div>
      </div>
      <p className="lab-hint">{c.derivativeHint}</p>
      <LabTask text={c.derivativeTask} done={Math.abs(slope - tangent) < 0.05} />
    </section>
  );
}
