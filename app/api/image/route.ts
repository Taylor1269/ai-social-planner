import { NextRequest, NextResponse } from "next/server";

type ImageBody = {
  prompt?: string;
  size?: "512x512" | "768x768" | "1024x1024";
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ImageBody;
    const prompt = (body.prompt ?? "").trim();
    const size = body.size ?? "1024x1024";

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    // Placeholder image (so the build succeeds). Replace with Replicate/OpenAI call later.
    // You could return a data URL or a static placeholder path.
    const placeholder = `https://picsum.photos/seed/${encodeURIComponent(
      prompt
    )}/${size.split("x")[0]}/${size.split("x")[1]}`;

    return NextResponse.json({ imageUrl: placeholder, size });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}