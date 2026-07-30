"use client";

import { useCallback, useEffect, useState } from "react";

export type HistoryEntry = {
  timestamp: number;
  fortune: string;
};

const STORAGE_KEY = "fortune-history";

export function useFortuneHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      setHistory([]);
    }
  }, []);

  const addEntry = useCallback((fortune: string) => {
    setHistory((prev) => {
      const next = [{ timestamp: Date.now(), fortune }, ...prev];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { history, addEntry };
}
