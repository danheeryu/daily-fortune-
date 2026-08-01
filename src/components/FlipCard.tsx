"use client";

import type { FortuneResult } from "@/data/fortunes";
import FortuneIllustration from "@/components/FortuneIllustration";

export type CardVariant = "day" | "night";

const VARIANT_STYLES: Record<
  CardVariant,
  { emoji: string; label: string; gradient: string; textClass: string }
> = {
  day: {
    emoji: "☀️",
    label: "낮의 카드",
    gradient: "from-[#d9b877] via-[#a97c3f] to-[#6b4423]",
    textClass: "text-[#2b1b0d]",
  },
  night: {
    emoji: "🌙",
    label: "밤의 카드",
    gradient: "from-[#3b2712] via-[#241407] to-[#120a03]",
    textClass: "text-[#e8d9b5]",
  },
};

type FlipCardProps = {
  variant: CardVariant;
  flipped: boolean;
  disabled: boolean;
  result: FortuneResult | null;
  loading: boolean;
  error: string | null;
  onClick: () => void;
};

export default function FlipCard({
  variant,
  flipped,
  disabled,
  result,
  loading,
  error,
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

        <div className="backface-hidden flip-card-back absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl bg-[#f5ead2] p-6 text-center shadow-xl dark:bg-[#241407]">
          {loading && (
            <>
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#a97c3f] border-t-transparent" />
              <p className="text-sm text-[#6b4423] dark:text-[#c9a66b]">
                AI가 운세를 만드는 중...
              </p>
            </>
          )}

          {!loading && error && (
            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
          )}

          {!loading && !error && result && (
            <>
              <FortuneIllustration fortune={result.fortune} />
              <p className="text-base font-medium leading-relaxed text-[#3b2712] dark:text-[#e8d9b5]">
                {result.fortune}
              </p>
              <div className="mt-2 flex flex-col gap-1 text-sm text-[#8b5e34] dark:text-[#c9a66b]">
                <p>
                  🍀 행운의 아이템:{" "}
                  <span className="font-semibold text-[#4a2f12] dark:text-[#e8d9b5]">
                    {result.luckyItem}
                  </span>
                </p>
                <p>
                  🎨 행운의 색상:{" "}
                  <span className="font-semibold text-[#4a2f12] dark:text-[#e8d9b5]">
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
