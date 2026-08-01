"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

function getTodayRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
}

export function useTodayFortuneCount() {
  const [count, setCount] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    const { start, end } = getTodayRange();

    const { data, error } = await supabase.rpc("count_fortunes_between", {
      start_ts: start.toISOString(),
      end_ts: end.toISOString(),
    });

    if (error) {
      console.error("Failed to load today's fortune count:", error.message);
      return;
    }
    setCount(data ?? 0);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { count, refresh };
}
