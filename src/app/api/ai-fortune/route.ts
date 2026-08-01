import { NextResponse } from "next/server";

const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL ?? "openai/gpt-4o-mini";

export async function POST(request: Request) {
  const { variant } = await request.json();

  const tone =
    variant === "night"
      ? "차분하고 다정한, 하루를 마무리하는 밤의 말투"
      : "밝고 활기찬, 하루를 시작하는 아침의 말투";

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENROUTER_API_KEY가 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "X-Title": "Daily Fortune",
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          messages: [
            {
              role: "system",
              content:
                "너는 한국어로 짧은 오늘의 운세 문구를 창작하는 작가야. 매번 새롭고 구체적인 운세를 한두 문장으로 만들어줘. 이모지, 따옴표, 부가 설명 없이 운세 문장만 출력해.",
            },
            {
              role: "user",
              content: `${tone}로 오늘의 운세 한 줄을 새로 만들어줘.`,
            },
          ],
          max_tokens: 120,
          temperature: 1,
        }),
      },
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenRouter error:", response.status, errText);
      return NextResponse.json(
        { error: "AI 운세 생성에 실패했습니다." },
        { status: 502 },
      );
    }

    const data = await response.json();
    const fortune: string | undefined = data.choices?.[0]?.message?.content
      ?.trim()
      .replace(/^["'"]|["'"]$/g, "");

    if (!fortune) {
      return NextResponse.json(
        { error: "AI 응답이 비어 있습니다." },
        { status: 502 },
      );
    }

    return NextResponse.json({ fortune });
  } catch (err) {
    console.error("OpenRouter request failed:", err);
    return NextResponse.json(
      { error: "AI 운세 생성 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
