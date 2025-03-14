import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token");

    if (!sessionToken) {
      return NextResponse.json({ message: "이미 로그아웃됨" }, { status: 200 });
    }

    // DB에서 세션 삭제
    await prisma.session.deleteMany({
      where: { token: sessionToken.value },
    });

    // 쿠키 삭제
    cookieStore.set("session_token", "", { maxAge: -1 });

    return NextResponse.json({ message: "로그아웃 성공" }, { status: 200 });
  } catch (error) {
    console.error("로그아웃 오류:", error);
    return NextResponse.json({ error: "로그아웃 실패" }, { status: 500 });
  }
}
