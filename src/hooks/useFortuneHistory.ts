"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export type HistoryEntry = {
  id: number;
  timestamp: number;
  fortune: string;
};

export function useFortuneHistory(name: string | null) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    if (!name) {
      setHistory([]);
      return;
    }

    supabase
      .from("fortunes")
      .select("id, fortune, date")
      .eq("name", name)
      .order("date", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error("Failed to load fortune history:", error.message);
          return;
        }
        setHistory(
          (data ?? []).map((row) => ({
            id: row.id,
            timestamp: new Date(row.date).getTime(),
            fortune: row.fortune,
          })),
        );
      });
  }, [name]);

  const addEntry = useCallback(
    async (fortune: string) => {
      if (!name) return;

      const { data, error } = await supabase
        .from("fortunes")
        .insert({ name, fortune })
        .select("id, fortune, date")
        .single();

      if (error || !data) {
        console.error("Failed to save fortune:", error?.message);
        return;
      }

      setHistory((prev) => [
        {
          id: data.id,
          timestamp: new Date(data.date).getTime(),
          fortune: data.fortune,
        },
        ...prev,
      ]);
    },
    [name],
  );

  return { history, addEntry };
}
