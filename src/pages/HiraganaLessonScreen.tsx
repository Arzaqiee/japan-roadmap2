import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Trophy, RotateCcw } from "lucide-react";
import { Screen } from "@/components/layout/Screen";
import { Card, Button, SealBadge } from "@/components/ui/primitives";
import { FlashcardDeck } from "@/features/hiragana/FlashcardDeck";
import { HiraganaQuiz } from "@/features/hiragana/HiraganaQuiz";
import { hiraganaLessons } from "@/data/hiraganaLessons";
import { hiraganaChars } from "@/data/hiragana";
import { useProgressStore } from "@/hooks/useProgressStore";
import { db } from "@/lib/storage/db";

type Phase = "flashcards" | "quiz" | "result";

const HIRAGANA_ACHIEVEMENT = "Hiragana Master";

export default function HiraganaLessonScreen() {
  const { lessonNumber } = useParams<{ lessonNumber: string }>();
  const navigate = useNavigate();
  const { progress, addXp, setStageProgress, touchStreak } = useProgressStore();

  const lesson = hiraganaLessons.find((l) => l.number === Number(lessonNumber));
  const chars = useMemo(
    () => (lesson ? hiraganaChars.filter((c) => lesson.chars.includes(c.char)) : []),
    [lesson]
  );

  const [phase, setPhase] = useState<Phase>(lesson?.mode === "review" ? "quiz" : "flashcards");
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);

  if (!lesson) {
    return (
      <Screen>
        <p className="mt-10 text-center text-sm text-ink-400">Lesson tidak ditemukan.</p>
      </Screen>
    );
  }

  async function handleQuizFinish(score: number, total: number) {
    setResult({ score, total });
    setPhase("result");

    const passed = score / total >= 0.6;
    if (!passed || !progress) return;

    const totalLessons = 18;
    const newPercent = Math.max(
      progress.stageProgress["hiragana"] ?? 0,
      Math.round((lesson!.number / totalLessons) * 100)
    );
    await setStageProgress("hiragana", newPercent);
    await addXp(20 + score * 5);
    await touchStreak();

    if (lesson!.number === totalLessons && !progress.achievementIds.includes(HIRAGANA_ACHIEVEMENT)) {
      const updated = { ...progress, achievementIds: [...progress.achievementIds, HIRAGANA_ACHIEVEMENT] };
      await db.progress.put(updated);
    }
  }

  return (
    <Screen>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-ink-400"
        aria-label="Kembali"
      >
        <ChevronLeft size={16} /> Hiragana
      </button>

      <h1 className="mt-2 font-display text-xl font-bold">
        Lesson {lesson.number}: {lesson.title}
      </h1>

      <div className="mt-5">
        {phase === "flashcards" && (
          <FlashcardDeck chars={chars} onDone={() => setPhase("quiz")} />
        )}

        {phase === "quiz" && <HiraganaQuiz chars={chars} onFinish={handleQuizFinish} />}

        {phase === "result" && result && (
          <Card className="flex flex-col items-center gap-3 p-6 text-center">
            <Trophy size={32} className={result.score / result.total >= 0.6 ? "text-accent-soul" : "text-ink-400"} />
            <p className="font-display text-3xl font-black">
              {result.score}/{result.total}
            </p>
            {result.score / result.total >= 0.6 ? (
              <SealBadge>+{20 + result.score * 5} XP</SealBadge>
            ) : (
              <p className="text-sm text-ink-400">Minimal 60% benar untuk lulus lesson ini. Coba lagi ya!</p>
            )}

            <div className="mt-3 flex w-full gap-3">
              <Button
                variant="secondary"
                className="flex flex-1 items-center justify-center gap-1"
                onClick={() => {
                  setResult(null);
                  setPhase(lesson.mode === "review" ? "quiz" : "flashcards");
                }}
              >
                <RotateCcw size={15} /> Ulangi
              </Button>
              <Button className="flex-1" onClick={() => navigate("/roadmap/hiragana")}>
                Selesai
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Screen>
  );
}
