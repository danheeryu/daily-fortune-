"use client";

import FortuneCard from "@/components/FortuneCard";
import FortuneHistory from "@/components/FortuneHistory";
import LoginGate from "@/components/LoginGate";
import { useAuth } from "@/hooks/useAuth";
import { useFortuneHistory } from "@/hooks/useFortuneHistory";
import { useTodayFortuneCount } from "@/hooks/useTodayFortuneCount";
import { supabase } from "@/lib/supabaseClient";

export default function FortunePage() {
  const session = useAuth();
  const user = session?.user ?? null;
  const { history, addEntry } = useFortuneHistory(
    user?.id ?? null,
    user?.email ?? null,
  );
  const { count, refresh } = useTodayFortuneCount();

  return (
    <>
      <p className="text-sm text-[#6b4423] dark:text-[#c9a66b]">
        {count === null
          ? "오늘 운세를 뽑은 사람 수를 불러오는 중..."
          : `오늘 운세를 뽑은 사람: ${count}명`}
      </p>

      {session === undefined ? null : !session ? (
        <LoginGate />
      ) : (
        <>
          <div className="flex items-center gap-3 text-sm text-[#6b4423] dark:text-[#c9a66b]">
            <span>{user?.email}님 환영합니다</span>
            <button
              onClick={() => supabase.auth.signOut()}
              className="underline underline-offset-2 hover:text-[#3b2712] dark:hover:text-[#e8d9b5]"
            >
              로그아웃
            </button>
          </div>
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
