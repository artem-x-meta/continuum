import { describe, expect, it } from 'vitest';
import { parseNumberSet } from '../src/App';

describe('persisted UI state', () => {
  it('accepts only unique integer section numbers from 1 through 80', () => {
    expect([...parseNumberSet('[1, 1, 2, 80, 0, 81, -3, 2.5, "4", null]')]).toEqual([1, 2, 80]);
  });

  it('recovers from malformed and non-array storage values', () => {
    expect([...parseNumberSet('{broken')]).toEqual([]);
    expect([...parseNumberSet('{"section": 1}')]).toEqual([]);
    expect([...parseNumberSet(null)]).toEqual([]);
  });

  it('rejects non-finite JSON numbers', () => {
    expect([...parseNumberSet('[1e309, -1e309, 20]')]).toEqual([20]);
  });
});
