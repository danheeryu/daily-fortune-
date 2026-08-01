const CHINESE_ZODIAC = [
  "쥐",
  "소",
  "호랑이",
  "토끼",
  "용",
  "뱀",
  "말",
  "양",
  "원숭이",
  "닭",
  "개",
  "돼지",
];

export function getChineseZodiac(birthdate: string): string {
  const year = new Date(birthdate).getFullYear();
  const index = (((year - 4) % 12) + 12) % 12;
  return CHINESE_ZODIAC[index];
}

const WESTERN_ZODIAC: {
  name: string;
  start: [number, number];
  end: [number, number];
}[] = [
  { name: "물병자리", start: [1, 20], end: [2, 18] },
  { name: "물고기자리", start: [2, 19], end: [3, 20] },
  { name: "양자리", start: [3, 21], end: [4, 19] },
  { name: "황소자리", start: [4, 20], end: [5, 20] },
  { name: "쌍둥이자리", start: [5, 21], end: [6, 21] },
  { name: "게자리", start: [6, 22], end: [7, 22] },
  { name: "사자자리", start: [7, 23], end: [8, 22] },
  { name: "처녀자리", start: [8, 23], end: [9, 22] },
  { name: "천칭자리", start: [9, 23], end: [10, 22] },
  { name: "전갈자리", start: [10, 23], end: [11, 22] },
  { name: "사수자리", start: [11, 23], end: [12, 21] },
  { name: "염소자리", start: [12, 22], end: [1, 19] },
];

export function getWesternZodiac(birthdate: string): string {
  const date = new Date(birthdate);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const match = WESTERN_ZODIAC.find(({ start, end }) => {
    const [startMonth, startDay] = start;
    const [endMonth, endDay] = end;

    if (startMonth === endMonth) {
      return month === startMonth && day >= startDay && day <= endDay;
    }
    if (startMonth < endMonth) {
      return (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay) ||
        (month > startMonth && month < endMonth)
      );
    }
    return (month === startMonth && day >= startDay) || (month === endMonth && day <= endDay);
  });

  return match?.name ?? "염소자리";
}

export function getZodiacInfo(birthdate: string) {
  return {
    chineseZodiac: getChineseZodiac(birthdate),
    westernZodiac: getWesternZodiac(birthdate),
  };
}
