import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Screen } from "@/components/layout/Screen";
import { Card, ProgressBar, Button } from "@/components/ui/primitives";
import { roadmapStages } from "@/data/roadmapStages";
import { useProgressStore } from "@/hooks/useProgressStore";

export default function StageDetail() {
  const { stageId } = useParams<{ stageId: string }>();
  const navigate = useNavigate();
  const { progress, hydrate, setStageProgress } = useProgressStore();
  const stage = roadmapStages.find((s) => s.id === stageId);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!stage) {
    return (
      <Screen>
        <p className="mt-10 text-center text-sm text-ink-400">Stage tidak ditemukan.</p>
      </Screen>
    );
  }

  const percent = progress?.stageProgress[stage.id] ?? 0;
  const lessons = Array.from({ length: stage.lessonCount }, (_, i) => i + 1);

  return (
    <Screen>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-ink-400"
        aria-label="Kembali"
      >
        <ChevronLeft size={16} /> Roadmap
      </button>

      <header className="mt-3 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-950 font-jp text-3xl text-paper-50">
          {stage.emoji}
        </div>
        <div>
          <h1 className="font-display text-xl font-bold">{stage.title}</h1>
          <p className="text-xs text-ink-400">{stage.description}</p>
        </div>
      </header>

      <Card className="mt-4 p-4">
        <div className="flex justify-between text-xs text-ink-400">
          <span>Progress</span>
          <span>{percent}%</span>
        </div>
        <ProgressBar percent={percent} className="mt-2" />
      </Card>

      <section className="mt-5">
        <h2 className="mb-2 text-sm font-semibold text-ink-400">Lessons</h2>
        <div className="grid grid-cols-4 gap-2">
          {lessons.map((n) => {
            const unlocked = percent >= ((n - 1) / lessons.length) * 100;
            return (
              <button
                key={n}
                disabled={!unlocked}
                onClick={() =>
                  setStageProgress(stage.id, Math.min(100, Math.round((n / lessons.length) * 100)))
                }
                className="flex aspect-square items-center justify-center rounded-2xl border border-ink-950/10 bg-paper-50 text-sm font-semibold shadow-card disabled:opacity-30"
              >
                {n}
              </button>
            );
          })}
        </div>
      </section>

      <Button className="mt-6 w-full" onClick={() => navigate(`/practice`)}>
        Latihan {stage.title}
      </Button>
    </Screen>
  );
}
