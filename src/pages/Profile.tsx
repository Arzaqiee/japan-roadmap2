import { useEffect } from "react";
import { Screen } from "@/components/layout/Screen";
import { Card, SealBadge } from "@/components/ui/primitives";
import { useProgressStore } from "@/hooks/useProgressStore";

const achievementCatalog = [
  "Hiragana Master",
  "Katakana Master",
  "100 Words",
  "7 Day Streak",
  "30 Day Streak",
  "N5 Complete",
  "N4 Complete",
  "Japan Ready",
];

export default function Profile() {
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

  const stats = [
    { label: "Total Study Time", value: "0 jam" },
    { label: "Vocabulary Mastered", value: "0" },
    { label: "Kanji Mastered", value: "0" },
    { label: "Grammar Completed", value: "0" },
  ];

  return (
    <Screen>
      <header className="flex flex-col items-center pt-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ink-950 font-display text-3xl font-black text-paper-50">
          {progress.displayName.slice(0, 1).toUpperCase()}
        </div>
        <h1 className="mt-3 font-display text-xl font-bold">{progress.displayName}</h1>
        <p className="text-xs text-ink-400">
          Level {progress.level} · {progress.xp.toLocaleString("id-ID")} XP
        </p>
      </header>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <p className="text-xs text-ink-400">{s.label}</p>
            <p className="mt-1 font-display text-xl font-bold">{s.value}</p>
          </Card>
        ))}
      </div>

      <section className="mt-6">
        <h2 className="mb-2 text-sm font-semibold text-ink-400">Achievement</h2>
        <div className="flex flex-wrap gap-2">
          {achievementCatalog.map((title) => {
            const unlocked = progress.achievementIds.includes(title);
            return (
              <SealBadge
                key={title}
                className={!unlocked ? "border-ink-950/10 bg-ink-950/5 text-ink-400" : ""}
              >
                {title}
              </SealBadge>
            );
          })}
        </div>
      </section>
    </Screen>
  );
}
