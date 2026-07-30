"use client";

import FortuneCard from "@/components/FortuneCard";
import FortuneHistory from "@/components/FortuneHistory";
import { useFortuneHistory } from "@/hooks/useFortuneHistory";

export default function FortunePage() {
  const { history, addEntry } = useFortuneHistory();

  return (
    <>
      <FortuneCard onDraw={(result) => addEntry(result.fortune)} />
      <FortuneHistory history={history} />
    </>
  );
}
