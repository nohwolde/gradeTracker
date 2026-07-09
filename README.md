# Grade Tracker

A clean, single-page grade portal for **Sosuna Woldeyesus** in **Intermediate Algebra**, taught by **Prof. Noh Woldeyesus**.

The portal shows the student's current overall grade plus a full history of every exam. All exam data is hardcoded in [`data/testResults.json`](data/testResults.json).

## How the grade is calculated

Every exam carries **equal weight**. The overall grade is the simple average of each exam's score out of 100:

```
overall = (exam₁ + exam₂ + … + examₙ) / n
```

So with 5 exams, each exam is worth 20% of the final grade. The logic lives in [`lib/grades.ts`](lib/grades.ts).

## Data shape

Each entry in `testResults.json`:

```json
{
  "id": 1,
  "title": "Exam 1 — Linear Equations & Inequalities",
  "date": "2026-01-22",
  "grade": 88,
  "numCorrect": 44,
  "totalQuestions": 50
}
```

| Field           | Meaning                          |
| --------------- | -------------------------------- |
| `date`          | Date the exam was taken (ISO)    |
| `grade`         | Score out of 100                 |
| `numCorrect`    | Questions answered correctly     |
| `totalQuestions`| Total questions on the exam      |

## Tech stack

- **Next.js 14** (App Router) + **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Geist** font — Vercel design aesthetic

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy

Optimized for [Vercel](https://vercel.com) — import the repo and deploy with zero configuration.
