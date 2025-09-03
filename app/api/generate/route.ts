import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { brand, tone, platform } = body;

    const prompt = `Generate 3 social media posts for ${platform}.
    Brand: ${brand}
    Tone: ${tone}
    Each post must be <= 280 characters and include relevant hashtags.`;

    // Use a broadly available model for now
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const text = completion.choices?.[0]?.message?.content ?? "No response";
    return NextResponse.json({ text });
  } catch (err: any) {
    console.error("OpenAI API Error:", err?.message || err);
    return NextResponse.json({ text: "Error: " + (err?.message || "Unknown error") }, { status: 500 });
  }
}

// Optional GET so visiting /api/generate in the browser still shows it's alive
export async function GET() {
  return NextResponse.json({ status: "ok", expects: "POST with { brand, tone, platform }" });
}