import { NextRequest, NextResponse } from "next/server";

const models = [
  "openai/gpt-oss-120b:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "arcee-ai/trinity-large-preview:free",
  "stepfun/step-3.5-flash:free",
  "z-ai/glm-4.5-air:free",
  "nvidia/nemotron-nano-9b-v2:free",
];
export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API key missing." }, { status: 500 });
    }

    for (const modelId of models) {
      try {
        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "http://localhost:3000",
              "X-Title": "Leyanne Mayo Finance Tracker",
            },
            body: JSON.stringify({
              model: modelId,
              messages: [{ role: "user", content: prompt }],
            }),
          },
        );

        const data = await response.json();
        console.log(`Model ${modelId} response:`, JSON.stringify(data));

        if (data.choices?.[0]?.message?.content) {
          return NextResponse.json({ result: data.choices[0].message.content });
        }
      } catch (err) {
        console.error(`Error with ${modelId}:`, err);
      }
    }

    return NextResponse.json({ error: "All models failed." }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
