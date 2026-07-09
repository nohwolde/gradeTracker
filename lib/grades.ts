export interface TestResult {
  id: number;
  title: string;
  date: string;
  grade: number;
  numCorrect: number;
  totalQuestions: number;
}

export interface LetterGrade {
  letter: string;
  color: string;
}

/**
 * Overall grade = simple average of every exam's grade out of 100.
 * Each exam carries equal weight (e.g. 5 exams => each worth 20%).
 */
export function calculateOverallGrade(results: TestResult[]): number {
  if (results.length === 0) return 0;
  const total = results.reduce((sum, r) => sum + r.grade, 0);
  return total / results.length;
}

/** Convert a 0–100 numeric grade into a letter grade + a Tailwind text color. */
export function toLetterGrade(grade: number): LetterGrade {
  if (grade >= 93) return { letter: "A", color: "text-emerald-500" };
  if (grade >= 90) return { letter: "A-", color: "text-emerald-500" };
  if (grade >= 87) return { letter: "B+", color: "text-sky-500" };
  if (grade >= 83) return { letter: "B", color: "text-sky-500" };
  if (grade >= 80) return { letter: "B-", color: "text-sky-500" };
  if (grade >= 77) return { letter: "C+", color: "text-amber-500" };
  if (grade >= 73) return { letter: "C", color: "text-amber-500" };
  if (grade >= 70) return { letter: "C-", color: "text-amber-500" };
  if (grade >= 60) return { letter: "D", color: "text-orange-500" };
  return { letter: "F", color: "text-red-500" };
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
