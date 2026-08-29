import { useMemo, useState } from "react";
import clsx from "clsx";
import { Card, Button, ProgressBar } from "@/components/ui/primitives";
import { hiraganaChars, type HiraganaChar } from "@/data/hiragana";

interface Question {
  prompt: string; // what's shown big (either the char or the romaji)
  isCharPrompt: boolean;
  correct: string;
  options: string[];
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildQuestions(chars: HiraganaChar[]): Question[] {
  // Cap at 12 questions so long review lessons stay a reasonable length.
  const pool = shuffle(chars).slice(0, Math.min(12, chars.length));

  return pool.map((c) => {
    const isCharPrompt = Math.random() > 0.5;
    const correct = isCharPrompt ? c.romaji : c.char;

    const distractorSource = hiraganaChars.filter((o) => o.char !== c.char);
    const distractors = shuffle(distractorSource)
      .slice(0, 3)
      .map((o) => (isCharPrompt ? o.romaji : o.char));

    return {
      prompt: isCharPrompt ? c.char : c.romaji,
      isCharPrompt,
      correct,
      options: shuffle([correct, ...distractors]),
    };
  });
}

export function HiraganaQuiz({
  chars,
  onFinish,
}: {
  chars: HiraganaChar[];
  onFinish: (score: number, total: number) => void;
}) {
  const questions = useMemo(() => buildQuestions(chars), [chars]);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const question = questions[qIndex];
  const isLast = qIndex === questions.length - 1;

  function choose(option: string) {
    if (selected) return;
    setSelected(option);
    if (option === question.correct) setScore((s) => s + 1);
  }

  function next() {
    if (isLast) {
      onFinish(score, questions.length);
      return;
    }
    setQIndex((i) => i + 1);
    setSelected(null);
  }

  return (
    <div>
      <p className="mb-3 text-xs text-ink-400">
        Soal {qIndex + 1} dari {questions.length}
      </p>
      <ProgressBar percent={((qIndex + 1) / questions.length) * 100} className="mb-6" />

      <Card className="flex h-40 flex-col items-center justify-center">
        <p className={clsx("font-jp", question.isCharPrompt ? "text-6xl" : "text-3xl font-bold")}>
          {question.prompt}
        </p>
      </Card>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {question.options.map((opt) => {
          const isCorrect = opt === question.correct;
          const isChosen = opt === selected;
          return (
            <button
              key={opt}
              onClick={() => choose(opt)}
              className={clsx(
                "flex h-16 items-center justify-center rounded-2xl border font-jp text-xl font-semibold transition-colors",
                !selected && "border-ink-950/10 bg-paper-50 active:scale-95",
                selected && isCorrect && "border-accent-soul bg-accent-soul/10 text-accent-soul",
                selected && isChosen && !isCorrect && "border-ink-950/20 bg-ink-950/5 text-ink-400 line-through",
                selected && !isChosen && !isCorrect && "border-ink-950/10 bg-paper-50 opacity-40"
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <Button className="mt-6 w-full" disabled={!selected} onClick={next}>
        {isLast ? "Selesai" : "Lanjut"}
      </Button>
    </div>
  );
}
