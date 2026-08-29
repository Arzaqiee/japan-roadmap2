import type { RoadmapStage } from "@/types";

export const roadmapStages: RoadmapStage[] = [
  { id: "hiragana", order: 1, key: "hiragana", title: "Hiragana", description: "46 karakter dasar + dakuten, handakuten, yōon", emoji: "あ", lessonCount: 18, xpReward: 400, requiredStageId: null },
  { id: "katakana", order: 2, key: "katakana", title: "Katakana", description: "46 karakter dasar + kombinasi & kata serapan", emoji: "ア", lessonCount: 18, xpReward: 400, requiredStageId: "hiragana" },
  { id: "basic", order: 3, key: "basic", title: "Basic Japanese", description: "Salam, perkenalan, angka, waktu, kalimat dasar", emoji: "基", lessonCount: 24, xpReward: 600, requiredStageId: "katakana" },
  { id: "n5", order: 4, key: "n5", title: "JLPT N5", description: "Vocabulary, kanji, grammar, reading, listening N5", emoji: "五", lessonCount: 40, xpReward: 1000, requiredStageId: "basic" },
  { id: "n4", order: 5, key: "n4", title: "JLPT N4", description: "Naik level dari N5, pola kalimat lebih kompleks", emoji: "四", lessonCount: 40, xpReward: 1200, requiredStageId: "n5" },
  { id: "n3", order: 6, key: "n3", title: "JLPT N3", description: "Bahasa Jepang menengah, mulai baca artikel pendek", emoji: "三", lessonCount: 45, xpReward: 1500, requiredStageId: "n4" },
  { id: "n2", order: 7, key: "n2", title: "JLPT N2", description: "Menengah-atas, kanji dan grammar semakin luas", emoji: "二", lessonCount: 50, xpReward: 1800, requiredStageId: "n3" },
  { id: "n1", order: 8, key: "n1", title: "JLPT N1", description: "Level mahir, siap untuk konteks profesional", emoji: "一", lessonCount: 55, xpReward: 2200, requiredStageId: "n2" },
  { id: "japan-ready", order: 9, key: "japan-ready", title: "Japan Ready", description: "Interview kerja, keigo, kehidupan sehari-hari di Jepang", emoji: "㊗", lessonCount: 30, xpReward: 2000, requiredStageId: "n1" },
];
