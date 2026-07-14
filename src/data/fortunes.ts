export const fortunes: string[] = [
  "오늘은 뜻밖의 좋은 소식이 들려올 거예요.",
  "작은 용기가 큰 기회로 이어지는 하루입니다.",
  "주변 사람에게 먼저 웃어주면 행운이 배로 돌아와요.",
  "미뤄뒀던 일을 시작하기에 완벽한 날이에요.",
  "돈이 들어올 운이 좋으니 지갑을 잘 챙기세요.",
  "새로운 인연이 시작될 조짐이 보입니다.",
  "고민하던 문제의 답이 오늘 떠오를 거예요.",
  "건강운이 상승하니 가벼운 산책을 해보세요.",
  "평소보다 말을 아끼면 오해를 피할 수 있어요.",
  "오늘 내린 결정이 훗날 큰 도움이 됩니다.",
  "예상치 못한 곳에서 칭찬을 받을 수 있어요.",
  "느긋하게 하루를 보내면 좋은 아이디어가 떠올라요.",
  "귀인이 나타나 든든한 조언을 해줄 거예요.",
  "지금까지의 노력이 서서히 결실을 맺기 시작해요.",
  "감정을 솔직히 표현하면 관계가 더 깊어져요.",
  "작은 실수는 있어도 결국 좋은 결과로 마무리돼요.",
  "오랜만에 연락 온 사람과 반가운 대화를 나눠요.",
  "재물운이 트이니 갖고 싶던 것을 살펴보세요.",
  "여유를 가지면 생각지도 못한 행운이 찾아와요.",
  "오늘 하루, 당신의 선택이 최고의 결과를 만들어요.",
];

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

export function drawFortune(): FortuneResult {
  const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  const luckyItem = luckyItems[Math.floor(Math.random() * luckyItems.length)];
  const luckyColor = luckyColors[Math.floor(Math.random() * luckyColors.length)];
  return { fortune, luckyItem, luckyColor };
}
