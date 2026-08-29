import type { ReactNode } from "react";
import { ProgressBar, Button, SealBadge } from "@/components/ui/primitives";

export function AnimeCard({
  illustration,
  eyebrow,
  title,
  subtitleJp,
  tags,
  progress,
  actionLabel = "CONTINUE",
  onAction,
  completed = false,
}: {
  illustration: ReactNode;
  eyebrow?: string;
  title: string;
  subtitleJp?: string;
  tags?: string[];
  progress: number;
  actionLabel?: string;
  onAction?: () => void;
  completed?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-card border border-ink-950/12 bg-paper-50 shadow-card animate-pop-in">
      <div className="relative flex h-32 items-center justify-center bg-ink-950 p-6 text-paper-50">
        <div className="h-full w-24 opacity-90">{illustration}</div>
        {completed && (
          <SealBadge className="absolute right-3 top-3 border-accent-soul/40 bg-paper-50/10 text-paper-50">
            Selesai
          </SealBadge>
        )}
      </div>

      <div className="p-4">
        {eyebrow && <p className="text-[11px] font-bold tracking-widest text-ink-400">{eyebrow}</p>}
        <div className="mt-0.5 flex items-baseline gap-2">
          <h3 className="font-display text-lg font-black leading-tight">{title}</h3>
          {subtitleJp && <span className="font-jp text-sm text-ink-400">{subtitleJp}</span>}
        </div>

        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-ink-950/10 bg-ink-950/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-ink-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between text-xs text-ink-400">
          <span>Progress</span>
          <span className="font-semibold text-ink-950">{progress}%</span>
        </div>
        <ProgressBar percent={progress} className="mt-1.5" />

        {onAction && (
          <Button className="mt-4 w-full" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
