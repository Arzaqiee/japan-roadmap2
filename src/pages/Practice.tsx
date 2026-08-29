import { Screen } from "@/components/layout/Screen";
import { Card } from "@/components/ui/primitives";
import type { PracticeGameId } from "@/types";

const games: { id: PracticeGameId; title: string; emoji: string; xp: number }[] = [
  { id: "guess-hiragana", title: "Tebak Hiragana", emoji: "あ", xp: 10 },
  { id: "guess-katakana", title: "Tebak Katakana", emoji: "ア", xp: 10 },
  { id: "guess-meaning", title: "Tebak Arti", emoji: "💭", xp: 10 },
  { id: "jp-to-id", title: "Japanese → Indonesian", emoji: "🇯🇵", xp: 10 },
  { id: "id-to-jp", title: "Indonesian → Japanese", emoji: "🇮🇩", xp: 10 },
  { id: "listening-quiz", title: "Listening Quiz", emoji: "🎧", xp: 15 },
  { id: "sentence-order", title: "Susun Kalimat", emoji: "🧩", xp: 15 },
  { id: "guess-kanji", title: "Tebak Kanji", emoji: "漢", xp: 15 },
  { id: "flashcard", title: "Flashcard", emoji: "🗂️", xp: 5 },
  { id: "speed-quiz", title: "Speed Quiz", emoji: "⚡", xp: 20 },
  { id: "memory-card", title: "Memory Card", emoji: "🃏", xp: 15 },
  { id: "boss-battle", title: "Boss Battle", emoji: "⚔️", xp: 50 },
];

export default function Practice() {
  return (
    <Screen>
      <header className="pt-1">
        <h1 className="font-display text-2xl font-bold">Practice</h1>
        <p className="text-sm text-ink-400">Setiap game memberikan XP</p>
      </header>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {games.map((game) => (
          <Card
            key={game.id}
            className="flex flex-col items-start gap-2 p-4 active:scale-[0.97]"
            role="button"
            tabIndex={0}
          >
            <span className="text-2xl">{game.emoji}</span>
            <p className="text-sm font-semibold leading-tight">{game.title}</p>
            <span className="text-[11px] font-medium text-ink-400">+{game.xp} XP</span>
          </Card>
        ))}
      </div>
    </Screen>
  );
}
