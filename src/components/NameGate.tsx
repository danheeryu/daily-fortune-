"use client";

import { useState, type FormEvent } from "react";

export default function NameGate({
  onSubmit,
}: {
  onSubmit: (name: string) => void;
}) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xs flex-col items-center gap-3"
    >
      <label className="text-sm text-[#6b4423] dark:text-[#c9a66b]">
        운세 기록에 사용할 이름을 입력해주세요
      </label>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="이름"
        className="w-full rounded-full border border-[#a97c3f]/50 bg-[#f5ead2] px-4 py-2 text-center text-[#3b2712] outline-none focus:border-[#a97c3f] dark:bg-[#241407] dark:text-[#e8d9b5]"
      />
      <button
        type="submit"
        className="rounded-full bg-[#4a2f12] px-8 py-2 text-sm font-semibold text-[#f5ead2] shadow-md transition hover:scale-105 hover:bg-[#6b4423] active:scale-95 dark:bg-[#c9a66b] dark:text-[#241407] dark:hover:bg-[#a97c3f]"
      >
        시작하기
      </button>
    </form>
  );
}
