import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

    async function genWithRetry(maxTries = 3) {
      let attempt = 0;
      let delay = 800; // ms
      while (attempt < maxTries) {
        try {
          const r = await client.images.generate({
            model: "gpt-image-1",
            prompt,
            size: "1024x1024", // valid sizes: 1024x1024, 1024x1536, 1536x1024, or "auto"
          });

          // Accept either base64 or URL
          const b64 = r.data?.[0]?.b64_json as string | undefined;
          const directUrl = r.data?.[0]?.url as string | undefined;

          if (b64) {
            const dataUrl = `data:image/png;base64,${b64}`;
            return dataUrl;
          }
          if (directUrl) {
            return directUrl;
          }

          throw new Error("No image data from OpenAI");
        } catch (e: any) {
          const msg = String(e?.message || e);
          if (msg.includes("429") || msg.toLowerCase().includes("rate limit")) {
            await new Promise((res) => setTimeout(res, delay));
            delay *= 2;
            attempt++;
          } else {
            throw e;
          }
        }
      }
      throw new Error("OpenAI rate limit. Please try again in a moment.");
    }

    const url = await genWithRetry();
    return NextResponse.json({ url, provider: "openai" });
  } catch (e: any) {
    console.error("Image gen error:", e);
    return NextResponse.json({ error: e?.message || "Image generation failed" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", expects: "POST { prompt }" });
}