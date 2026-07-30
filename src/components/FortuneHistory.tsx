"use client";

import type { HistoryEntry } from "@/hooks/useFortuneHistory";

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function FortuneHistory({
  history,
}: {
  history: HistoryEntry[];
}) {
  const sorted = [...history].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="w-full max-w-xl">
      <h2 className="mb-3 text-lg font-semibold text-[#3b2712] dark:text-[#e8d9b5]">
        내 운세 기록
      </h2>
      {sorted.length === 0 ? (
        <p className="text-sm text-[#6b4423] dark:text-[#c9a66b]">
          아직 뽑은 운세가 없어요.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#a97c3f]/40">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-[#d9b877]/40 dark:bg-[#3b2712]/60">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-[#3b2712] dark:text-[#e8d9b5]">
                  시각
                </th>
                <th className="px-4 py-2 font-semibold text-[#3b2712] dark:text-[#e8d9b5]">
                  운세
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((entry, index) => (
                <tr
                  key={`${entry.timestamp}-${index}`}
                  className="border-t border-[#a97c3f]/20"
                >
                  <td className="whitespace-nowrap px-4 py-2 align-top text-[#6b4423] dark:text-[#c9a66b]">
                    {formatTime(entry.timestamp)}
                  </td>
                  <td className="px-4 py-2 text-[#3b2712] dark:text-[#e8d9b5]">
                    {entry.fortune}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
