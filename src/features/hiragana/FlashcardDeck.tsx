import { useState } from "react";
import { ChevronLeft as Prev, ChevronRight as Next } from "lucide-react";
import { Card, Button, ProgressBar } from "@/components/ui/primitives";
import type { HiraganaChar } from "@/data/hiragana";

export function FlashcardDeck({
  chars,
  onDone,
}: {
  chars: HiraganaChar[];
  onDone: () => void;
}) {
  const [index, setIndex] = useState(0);
  const current = chars[index];
  const isLast = index === chars.length - 1;

  return (
    <div className="flex flex-col items-center">
      <p className="mb-3 text-xs text-ink-400">
        Kartu {index + 1} dari {chars.length}
      </p>
      <ProgressBar percent={((index + 1) / chars.length) * 100} className="mb-6 w-full" />

      <Card className="flex h-56 w-full flex-col items-center justify-center gap-3">
        <p className="font-jp text-7xl">{current.char}</p>
        <p className="text-lg font-semibold text-ink-400">{current.romaji}</p>
      </Card>

      <div className="mt-6 flex w-full gap-3">
        <Button
          variant="secondary"
          className="flex flex-1 items-center justify-center gap-1"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
        >
          <Prev size={16} /> Sebelumnya
        </Button>
        <Button
          className="flex flex-1 items-center justify-center gap-1"
          onClick={() => (isLast ? onDone() : setIndex((i) => i + 1))}
        >
          {isLast ? "Mulai Quiz" : "Selanjutnya"} {!isLast && <Next size={16} />}
        </Button>
      </div>
    </div>
  );
}
