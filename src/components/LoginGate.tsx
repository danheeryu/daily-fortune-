"use client";

import { useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginGate() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setStatus("sending");
    const { error } = await supabase.auth.signInWithOtp({
      email: trimmed,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setStatus("error");
      return;
    }
    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <p className="text-sm text-[#6b4423] dark:text-[#c9a66b]">
        {email}로 로그인 링크를 보냈어요. 메일함을 확인해주세요.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xs flex-col items-center gap-3"
    >
      <label className="text-sm text-[#6b4423] dark:text-[#c9a66b]">
        이메일로 받은 로그인 링크로 시작해보세요
      </label>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        required
        className="w-full rounded-full border border-[#a97c3f]/50 bg-[#f5ead2] px-4 py-2 text-center text-[#3b2712] outline-none focus:border-[#a97c3f] dark:bg-[#241407] dark:text-[#e8d9b5]"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-[#4a2f12] px-8 py-2 text-sm font-semibold text-[#f5ead2] shadow-md transition hover:scale-105 hover:bg-[#6b4423] active:scale-95 disabled:opacity-60 dark:bg-[#c9a66b] dark:text-[#241407] dark:hover:bg-[#a97c3f]"
      >
        {status === "sending" ? "보내는 중..." : "로그인 링크 보내기"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-700 dark:text-red-400">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
