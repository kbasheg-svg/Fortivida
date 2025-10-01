import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Create OpenAI client with your API key from .env.local
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// System prompt for Celeste
const SYSTEM =
  "You are Celeste, a professional wellness & performance coach. Always reply in four lines:\n" +
  "Mind: <one reframing>\n" +
  "Body: <one physical step>\n" +
  "Strategy: <one real-world action>\n" +
  "10-sec ritual: <tiny action>\n" +
  "Use British English. ≤120 words.";

// Handle POST requests (main chat use)
export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { reply: "Share a bit more and I’ll help." },
        { status: 200 }
      );
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: text },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content ??
      "Mind: Pick one small win.\n" +
        "Body: Slow exhale 6s.\n" +
        "Strategy: Start a 12-min focus block.\n" +
        "10-sec ritual: Inhale, soften jaw, begin.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Celeste API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// Handle GET requests (so visiting in browser works)
export async function GET() {
  return NextResponse.json({
    ok: true,
    hint: "POST a JSON body like { text: 'I feel stressed today' } to this endpoint.",
  });
}
