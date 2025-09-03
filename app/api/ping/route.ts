import { NextResponse } from "next/server";

export const runtime = "nodejs";       // <= force Node (not Edge)
export const dynamic = "force-dynamic"; // <= don't try to pre-render

export async function GET() {
  return NextResponse.json({ ok: true });
}