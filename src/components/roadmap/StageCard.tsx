import { Lock, Check, Play } from "lucide-react";
import clsx from "clsx";
import { Card, ProgressBar } from "@/components/ui/primitives";
import type { RoadmapStage, LevelStatus } from "@/types";

export function StageCard({
  stage,
  status,
  percent,
  onOpen,
}: {
  stage: RoadmapStage;
  status: LevelStatus;
  percent: number;
  onOpen: () => void;
}) {
  const locked = status === "locked";
  const completed = status === "completed";

  return (
    <Card
      className={clsx(
        "flex items-center gap-4 p-4",
        locked && "opacity-50",
        !locked && "hover-lift"
      )}
    >
      <div
        className={clsx(
          "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl font-jp text-3xl",
          completed ? "bg-accent-soul text-paper-50" : "bg-ink-950 text-paper-50"
        )}
      >
        {locked ? <Lock size={22} /> : stage.emoji}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-display font-bold">{stage.title}</p>
          {completed && <Check size={14} className="text-accent-soul" />}
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs text-ink-400">{stage.description}</p>
        <div className="mt-2 flex items-center gap-2 text-[11px] text-ink-400">
          <span>{stage.lessonCount} lesson</span>
          <span>·</span>
          <span>{stage.xpReward} XP</span>
        </div>
        {!locked && <ProgressBar percent={percent} className="mt-2" />}
      </div>

      <button
        disabled={locked}
        onClick={onOpen}
        aria-label={`Start ${stage.title}`}
        className={clsx(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
          locked ? "bg-ink-950/5 text-ink-400" : "bg-ink-950 text-paper-50 active:scale-90"
        )}
      >
        <Play size={16} fill="currentColor" />
      </button>
    </Card>
  );
}
