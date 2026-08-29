/**
 * Firestore collection layout (documented here so the shape stays consistent
 * as features are added — no runtime code, just the contract).
 *
 * users/{uid}
 *   displayName, email, avatarUrl, createdAt
 *
 * users/{uid}/progress/summary          (mirrors local UserProgress)
 *   level, xp, xpToNextLevel, streakDays, lastStudyDate,
 *   dailyGoalMinutes, stageProgress{}, completedStageIds[]
 *
 * users/{uid}/vocabProgress/{vocabId}
 *   masteryPercent, srsInterval, srsEase, srsReps, dueAt, favorite
 *
 * users/{uid}/kanjiProgress/{kanjiId}   (same SRS shape as vocabProgress)
 * users/{uid}/grammarProgress/{grammarId}
 *
 * users/{uid}/achievements/{achievementId}
 *   unlockedAt
 *
 * content/hiragana/items/{id}           (published learning content — admin-managed)
 * content/katakana/items/{id}
 * content/vocabulary/{category}/items/{id}
 * content/kanji/{jlptLevel}/items/{id}
 * content/grammar/{jlptLevel}/items/{id}
 * content/roadmapStages/{stageId}
 * content/achievements/{achievementId}
 *
 * Scaling notes:
 * - Content is split from user progress so content can be cached/CDN'd and
 *   read once, then stored in IndexedDB for offline use.
 * - Per-category/per-JLPT-level subcollections keep any single collection
 *   from growing unbounded and keep reads scoped to what a screen needs.
 * - Admin panel writes only to `content/*`; it never touches `users/*`.
 */
export {};
