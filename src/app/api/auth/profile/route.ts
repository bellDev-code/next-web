import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;

  if (!sessionToken) {
    return NextResponse.json({ error: "세션 없음" }, { status: 401 });
  }

  // Prisma에서 `session_token`을 `userId`로 사용하는 경우
  const session = await prisma.session.findUnique({
    where: { token: sessionToken },
    select: { userId: true },
  });

  if (!session) {
    return NextResponse.json(
      { error: "세션이 유효하지 않음" },
      { status: 401 }
    );
  }

  // `userId`를 사용해 사용자 정보 조회
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      email: true,
      gender: true,
      height: true,
      weight: true,
      createdAt: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "사용자를 찾을 수 없음" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}
