export type LessonDetail = {
  hook: string;
  explanation: [string, string];
  terms: Array<{
    term: string;
    definition: string;
  }>;
  example: {
    title: string;
    problem: string;
    steps: string[];
    answer: string;
  };
  pitfall: string;
  practice: {
    question: string;
    answer: string;
  };
};
