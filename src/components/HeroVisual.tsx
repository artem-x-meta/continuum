import { useMemo, useState } from 'react';
import { useLocale } from '../i18n/LocaleContext';

const size = 480;
const center = size / 2;

function orbitPath(radius: number, wave: number, phase: number) {
  return Array.from({ length: 181 }, (_, index) => {
    const angle = (index / 180) * Math.PI * 2;
    const modulation = 1 + 0.12 * Math.sin(wave * angle + phase);
    const x = center + Math.cos(angle) * radius * modulation;
    const y = center + Math.sin(angle) * radius * modulation * 0.72;
    return `${index ? 'L' : 'M'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ');
}

export function HeroVisual() {
  const { copy } = useLocale();
  const c = copy.heroVisual;
  const [lambda, setLambda] = useState(1.4);
  const paths = useMemo(() => [78, 114, 151, 188].map((radius, index) => orbitPath(radius, index + 2, lambda * (index + 1))), [lambda]);
  const pointAngle = lambda * 1.6;
  const point = {
    x: center + Math.cos(pointAngle) * 151 * (1 + 0.12 * Math.sin(4 * pointAngle + lambda * 3)),
    y: center + Math.sin(pointAngle) * 151 * (1 + 0.12 * Math.sin(4 * pointAngle + lambda * 3)) * 0.72,
  };

  return (
    <div className="hero-visual">
      <div className="hero-visual__label"><span /> {c.live}</div>
      <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label={c.family}>
        <defs>
          <radialGradient id="hero-glow">
            <stop offset="0" stopColor="var(--gold)" stopOpacity=".3" />
            <stop offset="1" stopColor="var(--gold)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={center} cy={center} r="205" fill="url(#hero-glow)" />
        <line x1="30" x2="450" y1={center} y2={center} className="hero-axis" />
        <line x1={center} x2={center} y1="55" y2="425" className="hero-axis" />
        {paths.map((path, index) => <path key={index} d={path} className={`hero-orbit hero-orbit--${index + 1}`} />)}
        <circle cx={point.x} cy={point.y} r="7" className="hero-point" />
        <circle cx={point.x} cy={point.y} r="16" className="hero-point-ring" />
        <text x="433" y={center - 9}>x</text>
        <text x={center + 10} y="67">y</text>
      </svg>
      <div className="hero-formula">
        <span>{c.family}</span>
        <strong>r(φ) = 1 + 0.12 sin(kφ + λ)</strong>
      </div>
      <label className="hero-slider">
        <span>λ</span>
        <input type="range" min="0" max="6.28" step="0.02" value={lambda} onChange={(event) => setLambda(Number(event.target.value))} />
        <strong>{lambda.toFixed(2)}</strong>
      </label>
    </div>
  );
}
