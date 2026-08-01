export const luckyItems: string[] = [
  "우산",
  "손목시계",
  "노란색 머그컵",
  "향초",
  "책 한 권",
  "선글라스",
  "동전 지갑",
  "귀걸이",
  "볼펜",
  "식물 화분",
  "이어폰",
  "손거울",
  "머플러",
  "키링",
  "스티커",
  "커피 원두",
  "양말",
  "노트",
];

export const luckyColors: string[] = [
  "빨강",
  "주황",
  "노랑",
  "초록",
  "파랑",
  "남색",
  "보라",
  "분홍",
  "하양",
  "검정",
  "은색",
  "금색",
];

export type FortuneResult = {
  fortune: string;
  luckyItem: string;
  luckyColor: string;
};

export function pickLuckyExtras(): Pick<
  FortuneResult,
  "luckyItem" | "luckyColor"
> {
  const luckyItem = luckyItems[Math.floor(Math.random() * luckyItems.length)];
  const luckyColor =
    luckyColors[Math.floor(Math.random() * luckyColors.length)];
  return { luckyItem, luckyColor };
}
