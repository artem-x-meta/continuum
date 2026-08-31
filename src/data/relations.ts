import { findSection } from './book';

const relationGroups = [
  [1, 2, 3, 4],
  [5, 6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 74, 75, 76, 77],
  [29, 30, 31, 32, 33, 34],
  [35, 36, 37, 38, 39, 40, 41, 42],
  [43, 44, 45, 46, 53, 54],
  [47, 48, 49, 50, 51, 52, 80],
  [55, 56, 57, 58, 69, 70, 71, 72, 73],
  [59, 60, 61, 62, 63, 64, 65],
  [62, 63, 64, 65, 66, 67, 68],
  [78, 79, 80, 47, 49, 50, 51],
] as const;

const bridges: Record<number, number[]> = {
  1: [5, 12],
  4: [47],
  8: [12, 58],
  16: [20, 35],
  20: [25, 26, 37],
  26: [64],
  35: [37, 42, 53],
  37: [20, 39],
  44: [70],
  54: [58],
  58: [71],
  64: [67, 76],
  68: [78],
  71: [58],
  77: [40],
  80: [47, 51],
};

export function getRelatedSections(sectionNumber: number, limit = 4) {
  const candidates = new Set<number>(bridges[sectionNumber] ?? []);
  for (const group of relationGroups) {
    if (group.some((number) => number === sectionNumber)) {
      [...group]
        .filter((number) => number !== sectionNumber)
        .sort((a, b) => Math.abs(a - sectionNumber) - Math.abs(b - sectionNumber))
        .forEach((number) => candidates.add(number));
    }
  }
  return [...candidates].slice(0, limit).map((number) => findSection(number)).filter((item) => item !== undefined);
}

export function getRelatedSectionNumbers(sectionNumber: number, limit = 4) {
  const candidates = new Set<number>(bridges[sectionNumber] ?? []);
  for (const group of relationGroups) {
    if (group.some((number) => number === sectionNumber)) {
      [...group]
        .filter((number) => number !== sectionNumber)
        .sort((a, b) => Math.abs(a - sectionNumber) - Math.abs(b - sectionNumber))
        .forEach((number) => candidates.add(number));
    }
  }
  return [...candidates].slice(0, limit);
}
