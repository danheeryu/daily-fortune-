export async function generateAiFortune(
  variant: "day" | "night",
  birthdate: string,
): Promise<string> {
  const response = await fetch("/api/ai-fortune", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ variant, birthdate }),
  });

  if (!response.ok) {
    throw new Error("AI 운세를 만드는 데 실패했어요. 잠시 후 다시 시도해주세요.");
  }

  const data = await response.json();
  return data.fortune as string;
}
