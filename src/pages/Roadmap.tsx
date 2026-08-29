import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Screen } from "@/components/layout/Screen";
import { StageCard } from "@/components/roadmap/StageCard";
import { roadmapStages } from "@/data/roadmapStages";
import { useProgressStore } from "@/hooks/useProgressStore";

export default function Roadmap() {
  const navigate = useNavigate();
  const { progress, loading, hydrate, stageStatus } = useProgressStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <Screen>
      <header className="pt-1">
        <h1 className="font-display text-2xl font-bold">Roadmap</h1>
        <p className="text-sm text-ink-400">START → HIRAGANA → ... → JAPAN READY</p>
      </header>

      {loading || !progress ? (
        <div className="mt-6 space-y-3">
          {roadmapStages.map((s) => (
            <div key={s.id} className="h-24 animate-pulse rounded-card bg-ink-950/5" />
          ))}
        </div>
      ) : (
        <ol className="relative mt-6 space-y-4 pl-4">
          <span
            aria-hidden
            className="absolute bottom-4 left-[7px] top-4 w-px bg-ink-950/10"
          />
          {roadmapStages.map((stage) => (
            <li key={stage.id} className="relative">
              <span
                aria-hidden
                className="absolute -left-4 top-8 h-2 w-2 -translate-x-1/2 rounded-full bg-ink-950/30"
              />
              <StageCard
                stage={stage}
                status={stageStatus(stage.id)}
                percent={progress.stageProgress[stage.id] ?? 0}
                onOpen={() => navigate(`/roadmap/${stage.id}`)}
              />
            </li>
          ))}
        </ol>
      )}
    </Screen>
  );
}
