import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { buildAnalyzePrompt } from "@/lib/prompts";

const MODEL = "gemini-3.5-flash-lite";

function stripCodeFences(text: string): string {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```[a-zA-Z]*\n?/, "").replace(/```$/, "");
  }
  return cleaned.trim();
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "No Gemini API key configured on the server." },
      { status: 500 }
    );
  }

  const { rawText, language } = await request.json();
  if (!rawText || !rawText.trim()) {
    return NextResponse.json({ error: "Paste in some questions first." }, { status: 400 });
  }

  const client = new GoogleGenAI({ apiKey });

  let response;
  try {
    response = await client.models.generateContent({
      model: MODEL,
      contents: buildAnalyzePrompt(rawText, language || "English"),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    const lower = message.toLowerCase();
    if (
      lower.includes("429") ||
      lower.includes("rate limit") ||
      lower.includes("quota") ||
      lower.includes("resource_exhausted")
    ) {
      return NextResponse.json(
        { error: "We've hit the free-tier rate limit for the moment. Wait a minute or two and try again." },
        { status: 429 }
      );
    }
    return NextResponse.json(
      { error: `Something went wrong talking to the AI: ${message}` },
      { status: 502 }
    );
  }

  const usage = response.usageMetadata;
  console.log(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      model: MODEL,
      language,
      promptTokens: usage?.promptTokenCount,
      outputTokens: usage?.candidatesTokenCount,
      totalTokens: usage?.totalTokenCount,
    })
  );

  const text = response.text ?? "";
  const cleaned = stripCodeFences(text);

  try {
    const parsed = JSON.parse(cleaned);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(
      { error: "Couldn't parse the AI's response as JSON.", raw: text },
      { status: 502 }
    );
  }
}
