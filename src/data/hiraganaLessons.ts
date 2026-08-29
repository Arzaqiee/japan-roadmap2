export type LessonMode = "learn" | "review";

export interface HiraganaLesson {
  number: number;
  title: string;
  mode: LessonMode;
  chars: string[]; // hiragana characters covered/tested in this lesson
}

const aKa = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ"];
const saTa = ["さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と"];
const naHa = ["な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ"];
const maYa = ["ま", "み", "む", "め", "も", "や", "ゆ", "よ"];
const raWa = ["ら", "り", "る", "れ", "ろ", "わ", "を", "ん"];
const allBase = [...aKa, ...saTa, ...naHa, ...maYa, ...raWa];

const gaZa = ["が", "ぎ", "ぐ", "げ", "ご", "ざ", "じ", "ず", "ぜ", "ぞ"];
const daBa = ["だ", "ぢ", "づ", "で", "ど", "ば", "び", "ぶ", "べ", "ぼ"];
const pa = ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"];
const allDakuten = [...gaZa, ...daBa, ...pa];

const yoon1 = ["きゃ", "きゅ", "きょ", "しゃ", "しゅ", "しょ", "ちゃ", "ちゅ", "ちょ"];
const yoon2 = ["にゃ", "にゅ", "にょ", "ひゃ", "ひゅ", "ひょ", "みゃ", "みゅ", "みょ"];
const yoon3 = ["りゃ", "りゅ", "りょ", "ぎゃ", "ぎゅ", "ぎょ", "じゃ", "じゅ", "じょ"];
const yoon4 = ["びゃ", "びゅ", "びょ", "ぴゃ", "ぴゅ", "ぴょ"];
const allYoon = [...yoon1, ...yoon2, ...yoon3, ...yoon4];

export const hiraganaLessons: HiraganaLesson[] = [
  { number: 1, title: "A, Ka", mode: "learn", chars: aKa },
  { number: 2, title: "Sa, Ta", mode: "learn", chars: saTa },
  { number: 3, title: "Na, Ha", mode: "learn", chars: naHa },
  { number: 4, title: "Ma, Ya", mode: "learn", chars: maYa },
  { number: 5, title: "Ra, Wa, N", mode: "learn", chars: raWa },
  { number: 6, title: "Review Gojūon", mode: "review", chars: allBase },
  { number: 7, title: "Dakuten: Ga, Za", mode: "learn", chars: gaZa },
  { number: 8, title: "Dakuten: Da, Ba", mode: "learn", chars: daBa },
  { number: 9, title: "Handakuten: Pa", mode: "learn", chars: pa },
  { number: 10, title: "Review Dakuten", mode: "review", chars: allDakuten },
  { number: 11, title: "Yōon: Kya, Sha, Cha", mode: "learn", chars: yoon1 },
  { number: 12, title: "Yōon: Nya, Hya, Mya", mode: "learn", chars: yoon2 },
  { number: 13, title: "Yōon: Rya, Gya, Ja", mode: "learn", chars: yoon3 },
  { number: 14, title: "Yōon: Bya, Pya", mode: "learn", chars: yoon4 },
  { number: 15, title: "Review Yōon", mode: "review", chars: allYoon },
  { number: 16, title: "Latihan Membaca", mode: "review", chars: [...allBase, ...allDakuten] },
  { number: 17, title: "Latihan Campuran", mode: "review", chars: [...allBase, ...allDakuten, ...allYoon] },
  { number: 18, title: "Ujian Akhir: Hiragana Master", mode: "review", chars: [...allBase, ...allDakuten, ...allYoon] },
];
