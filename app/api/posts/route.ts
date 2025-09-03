import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const { content } = await req.json();

  if (!content) {
    return NextResponse.json({ error: "Missing content" }, { status: 400 });
  }

  // If user is signed in, save to DB
  if (session?.user?.email) {
    const user = await prisma.user.upsert({
      where: { email: session.user.email },
      update: {},
      create: { email: session.user.email, name: session.user.name ?? "" },
    });

    const post = await prisma.post.create({
      data: { content, userId: user.id },
    });

    return NextResponse.json({ saved: true, post });
  }

  // If no user → just return success but don’t save
  return NextResponse.json({ saved: false, post: { content } });
}
