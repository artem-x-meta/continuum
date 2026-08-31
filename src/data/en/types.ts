import type { LessonDetail } from '../lessonDetailTypes';
import type { SectionGuide } from '../sectionGuides';

export type EnglishSectionBundle = {
  title: string;
  topics: string[];
  guide: SectionGuide;
  detail: LessonDetail;
};
