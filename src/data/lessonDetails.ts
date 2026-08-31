import type { LessonDetail } from './lessonDetailTypes';
import { lessonDetails1 } from './details-1';
import { lessonDetails2 } from './details-2';
import { lessonDetails3 } from './details-3';

export const lessonDetails: Record<number, LessonDetail> = {
  ...lessonDetails1,
  ...lessonDetails2,
  ...lessonDetails3,
};
