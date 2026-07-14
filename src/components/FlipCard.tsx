"use client";

import type { FortuneResult } from "@/data/fortunes";

export type CardVariant = "day" | "night";

const VARIANT_STYLES: Record<
  CardVariant,
  { emoji: string; label: string; gradient: string; textClass: string }
> = {
  day: {
    emoji: "☀️",
    label: "낮의 카드",
    gradient: "from-sky-300 via-amber-200 to-orange-300",
    textClass: "text-neutral-800",
  },
  night: {
    emoji: "🌙",
    label: "밤의 카드",
    gradient: "from-indigo-950 via-purple-900 to-slate-900",
    textClass: "text-white",
  },
};

type FlipCardProps = {
  variant: CardVariant;
  flipped: boolean;
  disabled: boolean;
  result: FortuneResult | null;
  onClick: () => void;
};

export default function FlipCard({
  variant,
  flipped,
  disabled,
  result,
  onClick,
}: FlipCardProps) {
  const style = VARIANT_STYLES[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={style.label}
      className={`perspective-1000 h-72 w-56 shrink-0 transition-opacity duration-300 sm:h-96 sm:w-64 ${
        disabled ? "cursor-default opacity-40" : "cursor-pointer"
      }`}
    >
      <div
        className={`flip-card-inner relative h-full w-full transition-transform duration-700 ease-out ${
          flipped ? "flipped" : ""
        }`}
      >
        <div
          className={`backface-hidden absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br shadow-xl ${style.gradient}`}
        >
          <span className="text-6xl">{style.emoji}</span>
          <p className={`text-lg font-semibold ${style.textClass}`}>
            {style.label}
          </p>
        </div>

        <div className="backface-hidden flip-card-back absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl bg-white p-6 text-center shadow-xl dark:bg-neutral-900">
          {result && (
            <>
              <span className="text-4xl">✨</span>
              <p className="text-base font-medium leading-relaxed text-neutral-800 dark:text-neutral-100">
                {result.fortune}
              </p>
              <div className="mt-2 flex flex-col gap-1 text-sm text-neutral-500 dark:text-neutral-400">
                <p>
                  🍀 행운의 아이템:{" "}
                  <span className="font-semibold text-neutral-700 dark:text-neutral-200">
                    {result.luckyItem}
                  </span>
                </p>
                <p>
                  🎨 행운의 색상:{" "}
                  <span className="font-semibold text-neutral-700 dark:text-neutral-200">
                    {result.luckyColor}
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </button>
  );
}
