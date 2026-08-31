import { describe, expect, it } from 'vitest';
import {
  determinant,
  exactDerivative,
  fourierSquare,
  midpointRiemann,
  riemannExact,
  secantSlope,
  transformPoint,
} from '../src/lib/math';

describe('математическая логика лабораторий', () => {
  it('считает определитель и линейное преобразование', () => {
    expect(determinant([2, 1, -1, 3])).toBe(7);
    expect(transformPoint([2, 1, -1, 3], 2, -1)).toEqual({ x: 3, y: -5 });
  });

  it('секущая стремится к производной', () => {
    const x = 1.25;
    expect(secantSlope(x, 1e-5)).toBeCloseTo(exactDerivative(x), 4);
  });

  it('суммы Римана приближают точный интеграл', () => {
    const approximate = midpointRiemann(1000).reduce((sum, rectangle) => sum + rectangle.width * rectangle.height, 0);
    expect(approximate).toBeCloseTo(riemannExact(), 5);
  });

  it('ряд Фурье для меандра приближается к единице вдали от скачка', () => {
    expect(fourierSquare(Math.PI / 2, 30)).toBeCloseTo(1, 1);
  });
});
