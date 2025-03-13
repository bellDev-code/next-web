import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 유저 존재 여부 확인
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "존재하지 않는 이메일입니다." },
        { status: 400 }
      );
    }

    // 비밀번호 검증 (bcrypt 없음, 단순 비교)
    if (user.password !== password) {
      return NextResponse.json(
        { error: "비밀번호가 일치하지 않습니다." },
        { status: 400 }
      );
    }

    // 로그인 성공 시 유저 정보 반환 (비밀번호 제외)
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "로그인 실패" }, { status: 500 });
  }
}
