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
          className="rounded-full bg-neutral-900 px-8 py-3 text-base font-semibold text-white shadow-md transition hover:scale-105 hover:bg-neutral-700 active:scale-95 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          다시 뽑기
        </button>
      ) : (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          낮과 밤, 마음이 끌리는 카드를 골라보세요
        </p>
      )}
    </div>
  );
}
