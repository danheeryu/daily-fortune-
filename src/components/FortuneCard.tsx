"use client";

import { useState } from "react";
import { drawFortune, type FortuneResult } from "@/data/fortunes";
import FlipCard, { type CardVariant } from "@/components/FlipCard";

export default function FortuneCard() {
  const [picked, setPicked] = useState<CardVariant | null>(null);
  const [result, setResult] = useState<FortuneResult | null>(null);

  const handlePick = (variant: CardVariant) => {
    if (picked) return;
    setResult(drawFortune());
    setPicked(variant);
  };

  const handleReset = () => {
    setPicked(null);
    window.setTimeout(() => setResult(null), 300);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
        <FlipCard
          variant="day"
          flipped={picked === "day"}
          disabled={picked !== null && picked !== "day"}
          result={picked === "day" ? result : null}
          onClick={() => handlePick("day")}
        />
        <FlipCard
          variant="night"
          flipped={picked === "night"}
          disabled={picked !== null && picked !== "night"}
          result={picked === "night" ? result : null}
          onClick={() => handlePick("night")}
        />
      </div>

      {picked ? (
        <button
          onClick={handleReset}
          className="rounded-full bg-[#4a2f12] px-8 py-3 text-base font-semibold text-[#f5ead2] shadow-md transition hover:scale-105 hover:bg-[#6b4423] active:scale-95 dark:bg-[#c9a66b] dark:text-[#241407] dark:hover:bg-[#a97c3f]"
        >
          다시 뽑기
        </button>
      ) : (
        <p className="text-sm text-[#6b4423] dark:text-[#c9a66b]">
          낮과 밤, 마음이 끌리는 카드를 골라보세요
        </p>
      )}
    </div>
  );
}
