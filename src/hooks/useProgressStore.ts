import { create } from "zustand";
import { db, queueSync } from "@/lib/storage/db";
import { roadmapStages } from "@/data/roadmapStages";
import type { UserProgress, LevelStatus } from "@/types";

const LOCAL_UID = "local-user";

function xpForLevel(level: number) {
  return 500 + (level - 1) * 250;
}

function defaultProgress(): UserProgress {
  return {
    uid: LOCAL_UID,
    displayName: "Pelajar",
    level: 1,
    xp: 0,
    xpToNextLevel: xpForLevel(1),
    streakDays: 0,
    lastStudyDate: null,
    dailyGoalMinutes: 15,
    minutesStudiedToday: 0,
    stageProgress: {},
    completedStageIds: [],
    favoriteVocabIds: [],
    achievementIds: [],
  };
}

interface ProgressStoreState {
  progress: UserProgress | null;
  loading: boolean;
  hydrate: () => Promise<void>;
  addXp: (amount: number) => Promise<void>;
  touchStreak: () => Promise<void>;
  setStageProgress: (stageId: string, percent: number) => Promise<void>;
  stageStatus: (stageId: string) => LevelStatus;
}

export const useProgressStore = create<ProgressStoreState>((set, get) => ({
  progress: null,
  loading: true,

  hydrate: async () => {
    let existing = await db.progress.get(LOCAL_UID);
    if (!existing) {
      existing = defaultProgress();
      await db.progress.put(existing);
    }
    set({ progress: existing, loading: false });
  },

  addXp: async (amount: number) => {
    const current = get().progress ?? defaultProgress();
    let { level, xp, xpToNextLevel } = current;
    xp += amount;
    while (xp >= xpToNextLevel) {
      xp -= xpToNextLevel;
      level += 1;
      xpToNextLevel = xpForLevel(level);
    }
    const updated: UserProgress = { ...current, level, xp, xpToNextLevel };
    await db.progress.put(updated);
    await queueSync("progress", updated);
    set({ progress: updated });
  },

  touchStreak: async () => {
    const current = get().progress ?? defaultProgress();
    const today = new Date().toISOString().slice(0, 10);
    if (current.lastStudyDate === today) return;

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const streakDays = current.lastStudyDate === yesterday ? current.streakDays + 1 : 1;

    const updated: UserProgress = { ...current, streakDays, lastStudyDate: today, minutesStudiedToday: 0 };
    await db.progress.put(updated);
    await queueSync("progress", updated);
    set({ progress: updated });
  },

  setStageProgress: async (stageId: string, percent: number) => {
    const current = get().progress ?? defaultProgress();
    const stageProgress = { ...current.stageProgress, [stageId]: percent };
    const completedStageIds =
      percent >= 100 && !current.completedStageIds.includes(stageId)
        ? [...current.completedStageIds, stageId]
        : current.completedStageIds;

    const updated: UserProgress = { ...current, stageProgress, completedStageIds };
    await db.progress.put(updated);
    await queueSync("progress", updated);
    set({ progress: updated });
  },

  stageStatus: (stageId: string): LevelStatus => {
    const current = get().progress;
    if (!current) return "locked";
    if (current.completedStageIds.includes(stageId)) return "completed";
    const stage = roadmapStages.find((s) => s.id === stageId);
    if (!stage) return "locked";
    if (stage.requiredStageId === null) return "available";
    return current.completedStageIds.includes(stage.requiredStageId) ? "available" : "locked";
  },
}));
