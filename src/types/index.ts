export type LevelStatus = "locked" | "available" | "completed";

export interface RoadmapStage {
  id: string;
  order: number;
  key: string;
  title: string;
  description: string;
  emoji: string;
  lessonCount: number;
  xpReward: number;
  requiredStageId: string | null;
}

export interface UserProgress {
  uid: string;
  displayName: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streakDays: number;
  lastStudyDate: string | null;
  dailyGoalMinutes: number;
  minutesStudiedToday: number;
  stageProgress: Record<string, number>; // stageId -> percent 0-100
  completedStageIds: string[];
  favoriteVocabIds: string[];
  achievementIds: string[];
}

export interface VocabItem {
  id: string;
  category: string;
  japanese: string;
  romaji: string;
  meaningId: string;
  exampleJapanese?: string;
  exampleMeaningId?: string;
  difficulty: "easy" | "medium" | "hard";
  masteryPercent: number;
  dueAt?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export type PracticeGameId =
  | "guess-hiragana"
  | "guess-katakana"
  | "guess-meaning"
  | "jp-to-id"
  | "id-to-jp"
  | "listening-quiz"
  | "sentence-order"
  | "guess-kanji"
  | "flashcard"
  | "speed-quiz"
  | "memory-card"
  | "boss-battle";

export interface ReviewQueueItem {
  id: string;
  kind: "vocab" | "kanji" | "grammar";
  refId: string;
  dueAt: string;
}
