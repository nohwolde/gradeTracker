import testResults from "@/data/testResults.json";
import {
  calculateOverallGrade,
  toLetterGrade,
  formatDate,
  type TestResult,
} from "@/lib/grades";

const STUDENT = "Sosuna Woldeyesus";
const COURSE = "Intermediate Algebra";
const PROFESSOR = "Prof. Noh Woldeyesus";

export default function Home() {
  const results = testResults as TestResult[];
  const sorted = [...results].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const overall = calculateOverallGrade(results);
  const { letter, color } = toLetterGrade(overall);
  const weightPerExam = results.length ? 100 / results.length : 0;

  const best = sorted.reduce((m, r) => (r.grade > m.grade ? r : m), sorted[0]);
  const totalCorrect = results.reduce((s, r) => s + r.numCorrect, 0);
  const totalQuestions = results.reduce((s, r) => s + r.totalQuestions, 0);

  return (
    <main className="grid-backdrop min-h-screen w-full">
      <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:py-20">
        {/* Header */}
        <header className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs font-medium text-neutral-500 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-neutral-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Grade Portal
          </div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {STUDENT}
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {COURSE} · {PROFESSOR}
          </p>
        </header>

        {/* Overall grade hero */}
        <section className="mb-6 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-950">
          <div className="grid grid-cols-1 sm:grid-cols-[1.4fr_1fr]">
            <div className="flex flex-col justify-center border-b border-black/10 p-7 sm:border-b-0 sm:border-r dark:border-white/10">
              <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                Current Grade
              </span>
              <div className="mt-2 flex items-end gap-3">
                <span className="font-mono text-6xl font-semibold leading-none tracking-tight">
                  {overall.toFixed(1)}
                  <span className="text-3xl text-neutral-400">%</span>
                </span>
                <span className={`mb-1 text-4xl font-semibold ${color}`}>
                  {letter}
                </span>
              </div>
              <div className="mt-5">
                <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all"
                    style={{ width: `${Math.min(overall, 100)}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                  Averaged across {results.length} exams · each weighted{" "}
                  {weightPerExam.toFixed(0)}%
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-1">
              <Stat
                label="Exams Taken"
                value={String(results.length)}
                border
              />
              <Stat
                label="Best Exam"
                value={`${best.grade}%`}
                border
              />
              <Stat
                label="Questions Correct"
                value={`${totalCorrect}/${totalQuestions}`}
              />
            </div>
          </div>
        </section>

        {/* Exam list */}
        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Exam History
            </h2>
            <span className="text-xs text-neutral-400">
              {results.length} results
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-neutral-950">
            {sorted.map((exam, i) => {
              const lg = toLetterGrade(exam.grade);
              return (
                <div
                  key={exam.id}
                  className={`flex items-center gap-4 px-5 py-4 ${
                    i !== sorted.length - 1
                      ? "border-b border-black/5 dark:border-white/5"
                      : ""
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-100 font-mono text-sm font-semibold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                    {i + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{exam.title}</p>
                    <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                      {formatDate(exam.date)} · {exam.numCorrect}/
                      {exam.totalQuestions} correct
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-neutral-100 sm:block dark:bg-neutral-800">
                      <div
                        className="h-full rounded-full bg-neutral-800 dark:bg-neutral-200"
                        style={{ width: `${exam.grade}%` }}
                      />
                    </div>
                    <span className="w-12 text-right font-mono text-sm font-semibold tabular-nums">
                      {exam.grade}%
                    </span>
                    <span
                      className={`w-8 text-right text-sm font-semibold ${lg.color}`}
                    >
                      {lg.letter}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <footer className="mt-10 text-center text-xs text-neutral-400">
          Grades are final as recorded. Questions? Contact {PROFESSOR}.
        </footer>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  border,
}: {
  label: string;
  value: string;
  border?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-center p-5 ${
        border ? "border-b border-black/10 dark:border-white/10" : ""
      }`}
    >
      <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
        {label}
      </span>
      <span className="mt-1 font-mono text-xl font-semibold tabular-nums">
        {value}
      </span>
    </div>
  );
}
