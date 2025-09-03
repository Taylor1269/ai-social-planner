// app/api/posts/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Temporary stub so Vercel build doesn’t need Prisma.
  return NextResponse.json({ posts: [] });
}

export async function POST() {
  // Stub create – returns 501 until we wire DB
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}