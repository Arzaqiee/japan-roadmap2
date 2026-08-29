/**
 * Lightweight SM-2-style spaced repetition. Kept intentionally simple:
 * grade 0 = "Forgot", 1 = "Remember". Items graded "Forgot" resurface
 * sooner, so words the user misses appear more often — as requested.
 */
export interface SrsState {
  intervalDays: number;
  easeFactor: number;
  repetitions: number;
}

export const initialSrsState: SrsState = {
  intervalDays: 0,
  easeFactor: 2.5,
  repetitions: 0,
};

export function schedule(state: SrsState, grade: 0 | 1): { next: SrsState; dueAt: string } {
  let { intervalDays, easeFactor, repetitions } = state;

  if (grade === 0) {
    repetitions = 0;
    intervalDays = 0.3; // ~ resurfaces same session / within hours
    easeFactor = Math.max(1.3, easeFactor - 0.2);
  } else {
    repetitions += 1;
    easeFactor = Math.min(2.8, easeFactor + 0.05);
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 3;
    else intervalDays = Math.round(intervalDays * easeFactor);
  }

  const dueAt = new Date(Date.now() + intervalDays * 24 * 60 * 60 * 1000).toISOString();
  return { next: { intervalDays, easeFactor, repetitions }, dueAt };
}
