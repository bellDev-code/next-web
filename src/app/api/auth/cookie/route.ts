import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;

  if (!sessionToken) {
    return NextResponse.json({ error: "세션 없음" }, { status: 401 });
  }

  const session = await prisma.session.findUnique({
    where: { token: sessionToken },
    include: { user: true },
  });

  if (!session || new Date(session.expiresAt) < new Date()) {
    return NextResponse.json({ error: "세션 만료" }, { status: 401 });
  }

  return NextResponse.json({
    user: { id: session.user.id, email: session.user.email },
  });
}
