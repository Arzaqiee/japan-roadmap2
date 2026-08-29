import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flame, ChevronRight } from "lucide-react";
import { Screen } from "@/components/layout/Screen";
import { Card, ProgressBar, Button, SealBadge } from "@/components/ui/primitives";
import { useProgressStore } from "@/hooks/useProgressStore";
import { roadmapStages } from "@/data/roadmapStages";

export default function Home() {
  const navigate = useNavigate();
  const { progress, loading, hydrate } = useProgressStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (loading || !progress) {
    return (
      <Screen>
        <div className="mt-10 h-40 animate-pulse rounded-card bg-ink-950/5" />
      </Screen>
    );
  }

  const nextStage =
    roadmapStages.find((s) => !progress.completedStageIds.includes(s.id)) ?? roadmapStages[0];
  const dailyPercent = Math.min(
    100,
    Math.round((progress.minutesStudiedToday / progress.dailyGoalMinutes) * 100)
  );

  return (
    <Screen>
      <header className="flex items-start justify-between">
        <div>
          <p className="text-sm text-ink-400">Selamat datang kembali,</p>
          <h1 className="font-display text-2xl font-bold">{progress.displayName}</h1>
        </div>
        {progress.streakDays > 0 && (
          <SealBadge className="animate-flicker">
            <Flame size={14} /> {progress.streakDays} hari
          </SealBadge>
        )}
      </header>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Card className="p-4">
          <p className="text-xs text-ink-400">Level</p>
          <p className="font-display text-3xl font-black">{progress.level}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-ink-400">Total XP</p>
          <p className="font-display text-3xl font-black">{progress.xp.toLocaleString("id-ID")}</p>
        </Card>
      </div>

      <Card className="mt-3 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Daily Goal</p>
          <p className="text-xs text-ink-400">
            {progress.minutesStudiedToday}/{progress.dailyGoalMinutes} menit
          </p>
        </div>
        <ProgressBar percent={dailyPercent} className="mt-2" />
      </Card>

      <section className="mt-6">
        <h2 className="mb-2 text-sm font-semibold text-ink-400">Continue Learning</h2>
        <Card className="flex items-center gap-4 p-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-950 font-jp text-2xl text-paper-50">
            {nextStage.emoji}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold">{nextStage.title}</p>
            <p className="truncate text-xs text-ink-400">{nextStage.description}</p>
            <ProgressBar percent={progress.stageProgress[nextStage.id] ?? 0} className="mt-2" />
          </div>
        </Card>
        <Button className="mt-3 w-full" onClick={() => navigate(`/roadmap/${nextStage.id}`)}>
          Continue Learning
        </Button>
      </section>

      <section className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink-400">Today's Review</h2>
          <button
            className="flex items-center text-xs font-semibold text-ink-950"
            onClick={() => navigate("/review")}
          >
            Lihat semua <ChevronRight size={14} />
          </button>
        </div>
        <Card className="p-4">
          <p className="text-sm">
            Kamu punya kosakata & kanji yang jatuh tempo untuk direview hari ini.
          </p>
          <Button variant="secondary" className="mt-3 w-full" onClick={() => navigate("/review")}>
            Mulai Review
          </Button>
        </Card>
      </section>

      <section className="mt-6">
        <h2 className="mb-2 text-sm font-semibold text-ink-400">Achievement Terbaru</h2>
        {progress.achievementIds.length === 0 ? (
          <Card className="p-4 text-sm text-ink-400">
            Belum ada achievement — mulai lesson pertamamu untuk mendapatkan yang pertama.
          </Card>
        ) : (
          <div className="flex gap-2 overflow-x-auto">
            {progress.achievementIds.map((id) => (
              <SealBadge key={id}>{id}</SealBadge>
            ))}
          </div>
        )}
      </section>
    </Screen>
  );
}
