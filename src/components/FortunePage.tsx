"use client";

import { useEffect, useState } from "react";
import FortuneCard from "@/components/FortuneCard";
import FortuneHistory from "@/components/FortuneHistory";
import NameGate from "@/components/NameGate";
import { useFortuneHistory } from "@/hooks/useFortuneHistory";
import { useTodayFortuneCount } from "@/hooks/useTodayFortuneCount";
import { getStoredUserName, setStoredUserName } from "@/lib/userName";

export default function FortunePage() {
  const [name, setName] = useState<string | null | undefined>(undefined);
  const { history, addEntry } = useFortuneHistory(name ?? null);
  const { count, refresh } = useTodayFortuneCount();

  useEffect(() => {
    setName(getStoredUserName());
  }, []);

  return (
    <>
      <p className="text-sm text-[#6b4423] dark:text-[#c9a66b]">
        {count === null
          ? "오늘 운세를 뽑은 사람 수를 불러오는 중..."
          : `오늘 운세를 뽑은 사람: ${count}명`}
      </p>

      {name === undefined ? null : !name ? (
        <NameGate
          onSubmit={(value) => {
            setStoredUserName(value);
            setName(value);
          }}
        />
      ) : (
        <>
          <FortuneCard
            onDraw={async (result) => {
              await addEntry(result.fortune);
              refresh();
            }}
          />
          <FortuneHistory history={history} />
        </>
      )}
    </>
  );
}
