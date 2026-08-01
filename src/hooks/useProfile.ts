"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function useProfile(userId: string | null) {
  const [birthdate, setBirthdateState] = useState<string | null | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!userId) {
      setBirthdateState(null);
      return;
    }

    setBirthdateState(undefined);
    supabase
      .from("profiles")
      .select("birthdate")
      .eq("user_id", userId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) {
          console.error("Failed to load profile:", error.message);
          setBirthdateState(null);
          return;
        }
        setBirthdateState(data?.birthdate ?? null);
      });
  }, [userId]);

  const saveBirthdate = useCallback(
    async (value: string) => {
      if (!userId) return;

      const { error } = await supabase
        .from("profiles")
        .upsert({ user_id: userId, birthdate: value });

      if (error) {
        console.error("Failed to save profile:", error.message);
        return;
      }
      setBirthdateState(value);
    },
    [userId],
  );

  return { birthdate, saveBirthdate };
}
