import { useEffect, useState } from "react";
import { Screen } from "@/components/layout/Screen";
import { Card, Button } from "@/components/ui/primitives";
import { db } from "@/lib/storage/db";
import type { ReviewQueueItem } from "@/types";

export default function Review() {
  const [dueItems, setDueItems] = useState<ReviewQueueItem[] | null>(null);

  useEffect(() => {
    (async () => {
      const now = new Date().toISOString();
      const items = await db.reviewQueue.where("dueAt").belowOrEqual(now).toArray();
      setDueItems(items);
    })();
  }, []);

  const vocabCount = dueItems?.filter((i) => i.kind === "vocab").length ?? 0;
  const kanjiCount = dueItems?.filter((i) => i.kind === "kanji").length ?? 0;
  const grammarCount = dueItems?.filter((i) => i.kind === "grammar").length ?? 0;

  return (
    <Screen>
      <header className="pt-1">
        <h1 className="font-display text-2xl font-bold">Review Hari Ini</h1>
        <p className="text-sm text-ink-400">
          Kosakata yang sering salah akan lebih sering muncul (spaced repetition)
        </p>
      </header>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <Card className="p-4 text-center">
          <p className="font-display text-2xl font-black">{vocabCount}</p>
          <p className="text-xs text-ink-400">Vocabulary</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="font-display text-2xl font-black">{kanjiCount}</p>
          <p className="text-xs text-ink-400">Kanji</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="font-display text-2xl font-black">{grammarCount}</p>
          <p className="text-xs text-ink-400">Grammar</p>
        </Card>
      </div>

      {dueItems === null ? (
        <div className="mt-5 h-24 animate-pulse rounded-card bg-ink-950/5" />
      ) : dueItems.length === 0 ? (
        <Card className="mt-5 p-6 text-center">
          <p className="text-sm font-semibold">Semua review sudah selesai 🎉</p>
          <p className="mt-1 text-xs text-ink-400">
            Kembali lagi nanti — item baru akan jatuh tempo sesuai jadwalnya.
          </p>
        </Card>
      ) : (
        <Button className="mt-5 w-full">Mulai Review ({dueItems.length} item)</Button>
      )}
    </Screen>
  );
}
