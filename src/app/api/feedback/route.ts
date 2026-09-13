import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { topic, questionPreview, rating, comment } = await request.json();

  console.log(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      topic,
      questionPreview,
      rating,
      comment,
    })
  );

  return NextResponse.json({ ok: true });
}
