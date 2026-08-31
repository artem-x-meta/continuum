import { sectionGuides1 } from './guides-1';
import { sectionGuides2 } from './guides-2';
import { sectionGuides3 } from './guides-3';

export type SectionGuide = {
  summary: string;
  keyIdea: string;
  formula: string;
  question: string;
};

export const sectionGuides: Record<number, SectionGuide> = {
  ...sectionGuides1,
  ...sectionGuides2,
  ...sectionGuides3,
};
