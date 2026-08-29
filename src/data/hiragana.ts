export type HiraganaType = "base" | "dakuten" | "handakuten" | "yoon";

export interface HiraganaChar {
  char: string;
  romaji: string;
  row: string;
  type: HiraganaType;
}

function row(rowName: string, type: HiraganaType, pairs: [string, string][]): HiraganaChar[] {
  return pairs.map(([char, romaji]) => ({ char, romaji, row: rowName, type }));
}

export const hiraganaChars: HiraganaChar[] = [
  // Base gojūon (46)
  ...row("a", "base", [["あ", "a"], ["い", "i"], ["う", "u"], ["え", "e"], ["お", "o"]]),
  ...row("ka", "base", [["か", "ka"], ["き", "ki"], ["く", "ku"], ["け", "ke"], ["こ", "ko"]]),
  ...row("sa", "base", [["さ", "sa"], ["し", "shi"], ["す", "su"], ["せ", "se"], ["そ", "so"]]),
  ...row("ta", "base", [["た", "ta"], ["ち", "chi"], ["つ", "tsu"], ["て", "te"], ["と", "to"]]),
  ...row("na", "base", [["な", "na"], ["に", "ni"], ["ぬ", "nu"], ["ね", "ne"], ["の", "no"]]),
  ...row("ha", "base", [["は", "ha"], ["ひ", "hi"], ["ふ", "fu"], ["へ", "he"], ["ほ", "ho"]]),
  ...row("ma", "base", [["ま", "ma"], ["み", "mi"], ["む", "mu"], ["め", "me"], ["も", "mo"]]),
  ...row("ya", "base", [["や", "ya"], ["ゆ", "yu"], ["よ", "yo"]]),
  ...row("ra", "base", [["ら", "ra"], ["り", "ri"], ["る", "ru"], ["れ", "re"], ["ろ", "ro"]]),
  ...row("wa", "base", [["わ", "wa"], ["を", "wo"], ["ん", "n"]]),

  // Dakuten (20)
  ...row("ga", "dakuten", [["が", "ga"], ["ぎ", "gi"], ["ぐ", "gu"], ["げ", "ge"], ["ご", "go"]]),
  ...row("za", "dakuten", [["ざ", "za"], ["じ", "ji"], ["ず", "zu"], ["ぜ", "ze"], ["ぞ", "zo"]]),
  ...row("da", "dakuten", [["だ", "da"], ["ぢ", "ji"], ["づ", "zu"], ["で", "de"], ["ど", "do"]]),
  ...row("ba", "dakuten", [["ば", "ba"], ["び", "bi"], ["ぶ", "bu"], ["べ", "be"], ["ぼ", "bo"]]),

  // Handakuten (5)
  ...row("pa", "handakuten", [["ぱ", "pa"], ["ぴ", "pi"], ["ぷ", "pu"], ["ぺ", "pe"], ["ぽ", "po"]]),

  // Yōon (33)
  ...row("kya", "yoon", [["きゃ", "kya"], ["きゅ", "kyu"], ["きょ", "kyo"]]),
  ...row("sha", "yoon", [["しゃ", "sha"], ["しゅ", "shu"], ["しょ", "sho"]]),
  ...row("cha", "yoon", [["ちゃ", "cha"], ["ちゅ", "chu"], ["ちょ", "cho"]]),
  ...row("nya", "yoon", [["にゃ", "nya"], ["にゅ", "nyu"], ["にょ", "nyo"]]),
  ...row("hya", "yoon", [["ひゃ", "hya"], ["ひゅ", "hyu"], ["ひょ", "hyo"]]),
  ...row("mya", "yoon", [["みゃ", "mya"], ["みゅ", "myu"], ["みょ", "myo"]]),
  ...row("rya", "yoon", [["りゃ", "rya"], ["りゅ", "ryu"], ["りょ", "ryo"]]),
  ...row("gya", "yoon", [["ぎゃ", "gya"], ["ぎゅ", "gyu"], ["ぎょ", "gyo"]]),
  ...row("ja", "yoon", [["じゃ", "ja"], ["じゅ", "ju"], ["じょ", "jo"]]),
  ...row("bya", "yoon", [["びゃ", "bya"], ["びゅ", "byu"], ["びょ", "byo"]]),
  ...row("pya", "yoon", [["ぴゃ", "pya"], ["ぴゅ", "pyu"], ["ぴょ", "pyo"]]),
];

export function findChar(char: string): HiraganaChar | undefined {
  return hiraganaChars.find((c) => c.char === char);
}
