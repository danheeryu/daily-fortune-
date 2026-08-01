export type FortuneMood =
  | "love"
  | "money"
  | "health"
  | "achievement"
  | "calm"
  | "adventure"
  | "default";

const MOOD_KEYWORDS: Record<Exclude<FortuneMood, "default">, string[]> = {
  love: ["사랑", "인연", "고백", "연인", "썸", "마음을 나누"],
  money: ["재물", "돈", "지갑", "금전", "수익", "소비"],
  health: ["건강", "산책", "컨디션", "몸"],
  achievement: ["성취", "노력", "결실", "성공", "목표", "기회", "도움"],
  calm: ["평온", "여유", "차분", "안정"],
  adventure: ["도전", "시작", "용기", "변화", "모험", "소식"],
};

export function detectFortuneMood(fortune: string): FortuneMood {
  const moods = Object.keys(MOOD_KEYWORDS) as Exclude<
    FortuneMood,
    "default"
  >[];

  for (const mood of moods) {
    if (MOOD_KEYWORDS[mood].some((keyword) => fortune.includes(keyword))) {
      return mood;
    }
  }
  return "default";
}
