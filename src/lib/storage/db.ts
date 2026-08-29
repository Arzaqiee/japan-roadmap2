import Dexie, { type Table } from "dexie";
import type { UserProgress, VocabItem, ReviewQueueItem } from "@/types";

/**
 * Local-first storage. This is the source of truth for the UI at all times;
 * Firebase is a sync target, not a read path. Every screen reads from here,
 * so the app works fully offline once content has been loaded once.
 */
export interface SyncOp {
  id?: number;
  entity: "progress" | "vocab" | "achievement";
  payload: unknown;
  createdAt: number;
  synced: boolean;
}

class JapanRoadmapDB extends Dexie {
  progress!: Table<UserProgress, string>;
  vocab!: Table<VocabItem, string>;
  reviewQueue!: Table<ReviewQueueItem, string>;
  syncQueue!: Table<SyncOp, number>;

  constructor() {
    super("japan-roadmap-db");
    this.version(1).stores({
      progress: "uid",
      vocab: "id, category, difficulty, dueAt",
      reviewQueue: "id, kind, dueAt",
      syncQueue: "++id, entity, synced",
    });
  }
}

export const db = new JapanRoadmapDB();

export async function queueSync(entity: SyncOp["entity"], payload: unknown) {
  await db.syncQueue.add({ entity, payload, createdAt: Date.now(), synced: false });
}

/** Called when connectivity returns; pushes queued local changes to Firestore. */
export async function flushSyncQueue(pushFn: (op: SyncOp) => Promise<void>) {
  const pending = (await db.syncQueue.toArray()).filter((op) => !op.synced);
  for (const op of pending) {
    try {
      await pushFn(op);
      if (op.id !== undefined) await db.syncQueue.update(op.id, { synced: true });
    } catch {
      // leave unsynced, retry on next flush
    }
  }
}
