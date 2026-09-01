import { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { determinant, transformPoint, type Matrix2 } from '../../lib/math';
import { useLocale } from '../../i18n/LocaleContext';

const size = 360;
const scale = 58;
const center = size / 2;
const screen = (point: { x: number; y: number }) => `${center + point.x * scale},${center - point.y * scale}`;

export function MatrixLab() {
  const { copy } = useLocale();
  const c = copy.labs;
  const presets: Array<{ label: string; value: Matrix2 }> = [
    { label: c.identity, value: [1, 0, 0, 1] },
    { label: c.shear, value: [1, 1, 0, 1] },
    { label: c.rotation, value: [0, -1, 1, 0] },
    { label: c.reflection, value: [-1, 0, 0, 1] },
  ];
  const [matrix, setMatrix] = useState<Matrix2>([1, 0.6, 0.2, 1]);
  const [draft, setDraft] = useState<string[]>(['1', '0.6', '0.2', '1']);
  const validDraft = draft.every((value) => {
    const parsed = Number(value);
    return value.trim() !== '' && Number.isFinite(parsed) && parsed >= -2 && parsed <= 2;
  });
  const det = determinant(matrix);
  const determinantScale = Math.max(1, Math.abs(matrix[0] * matrix[3]), Math.abs(matrix[1] * matrix[2]));
  const collapsed = Math.abs(det) <= Number.EPSILON * determinantScale * 8;
  const nearlyCollapsed = !collapsed && Math.abs(det) < 0.001;
  const polygon = useMemo(
    () => [
      transformPoint(matrix, 0, 0),
      transformPoint(matrix, 1, 0),
      transformPoint(matrix, 1, 1),
      transformPoint(matrix, 0, 1),
    ],
    [matrix],
  );
  const e1 = transformPoint(matrix, 1, 0);
  const e2 = transformPoint(matrix, 0, 1);

  const setMatrixValue = (value: Matrix2) => {
    setMatrix(value);
    setDraft(value.map(String));
  };

  const update = (index: number, value: string) => {
    setDraft((current) => current.map((item, itemIndex) => itemIndex === index ? value : item));
    const parsed = Number(value);
    if (value.trim() === '' || !Number.isFinite(parsed) || parsed < -2 || parsed > 2) return;
    setMatrix((current) => current.map((item, itemIndex) => itemIndex === index ? parsed : item) as Matrix2);
  };

  return (
    <section className="lab lab--matrix" aria-labelledby="matrix-lab-title">
      <div className="lab__heading">
        <div>
          <span className="eyebrow">{c.lab} 01</span>
          <h3 id="matrix-lab-title">{c.matrixTitle}</h3>
        </div>
        <button className="icon-button" type="button" onClick={() => setMatrixValue([1, 0.6, 0.2, 1])} aria-label={c.reset}>
          <RotateCcw size={17} />
        </button>
      </div>

      <div className="matrix-lab__body">
        <div className="matrix-lab__visual">
          <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${c.matrixTitle}; ${c.determinant} ${validDraft ? det.toFixed(2) : c.invalid}`}>
            <defs>
              <pattern id="matrix-grid" width={scale} height={scale} patternUnits="userSpaceOnUse">
                <path d={`M ${scale} 0 L 0 0 0 ${scale}`} fill="none" stroke="currentColor" strokeOpacity=".09" strokeWidth="1" />
              </pattern>
              <marker id="matrix-arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--blue)" />
              </marker>
              <marker id="matrix-arrow-coral" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--coral)" />
              </marker>
            </defs>
            <rect width={size} height={size} fill="url(#matrix-grid)" />
            <line x1="0" x2={size} y1={center} y2={center} className="lab-axis" />
            <line x1={center} x2={center} y1="0" y2={size} className="lab-axis" />
            <polygon points={`${screen({ x: 0, y: 0 })} ${screen({ x: 1, y: 0 })} ${screen({ x: 1, y: 1 })} ${screen({ x: 0, y: 1 })}`} className="matrix-unit-square" />
            <polygon points={polygon.map(screen).join(' ')} className="matrix-result-square" />
            <line x1={center} y1={center} x2={center + e1.x * scale} y2={center - e1.y * scale} className="matrix-vector matrix-vector--one" markerEnd="url(#matrix-arrow-blue)" />
            <line x1={center} y1={center} x2={center + e2.x * scale} y2={center - e2.y * scale} className="matrix-vector matrix-vector--two" markerEnd="url(#matrix-arrow-coral)" />
            <text x={center + e1.x * scale + 9} y={center - e1.y * scale - 8} className="matrix-label matrix-label--one">Ae₁</text>
            <text x={center + e2.x * scale + 9} y={center - e2.y * scale - 8} className="matrix-label matrix-label--two">Ae₂</text>
          </svg>
        </div>

        <div className="matrix-lab__panel">
          <div className="matrix-input" aria-label={c.matrixInput}>
            <span className="matrix-bracket">[</span>
            <div className="matrix-input__grid">
              {draft.map((value, index) => (
                <label key={index}>
                  <span>{['a₁₁', 'a₁₂', 'a₂₁', 'a₂₂'][index]}</span>
                  <input type="number" min="-2" max="2" step="0.1" value={value} aria-invalid={value.trim() === '' || !Number.isFinite(Number(value)) || Number(value) < -2 || Number(value) > 2} aria-describedby={!validDraft ? 'matrix-input-error' : undefined} onChange={(event) => update(index, event.target.value)} />
                </label>
              ))}
            </div>
            <span className="matrix-bracket">]</span>
          </div>
          {!validDraft && <p id="matrix-input-error" className="matrix-input__error" role="alert">{c.invalid}</p>}

          <div className="preset-row">
            {presets.map((preset) => (
              <button key={preset.label} type="button" onClick={() => setMatrixValue(preset.value)}>{preset.label}</button>
            ))}
          </div>

          <div className="lab-readout" aria-live="polite">
            <div><span>{c.determinant}</span><strong>{validDraft ? det.toFixed(2) : '—'}</strong></div>
            <div><span>{c.area}</span><strong>{validDraft ? Math.abs(det).toFixed(2) : '—'}</strong></div>
            <div><span>{c.orientation}</span><strong>{!validDraft ? c.invalid : collapsed ? c.collapsed : nearlyCollapsed ? c.nearCollapsed : det > 0 ? c.preserved : c.reversed}</strong></div>
          </div>
          <p className="lab-hint">{c.matrixHint}</p>
        </div>
      </div>
    </section>
  );
}
