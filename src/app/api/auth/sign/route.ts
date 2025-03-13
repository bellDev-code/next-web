import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, gender, height, weight, password } = await req.json();

    // 기존 유저 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "이미 가입된 이메일입니다." },
        { status: 400 }
      );
    }

    // 유저 생성
    const newUser = await prisma.user.create({
      data: {
        email,
        gender,
        height,
        weight,
        password, // 보안을 위해 나중에 bcrypt 적용 필요!
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "회원가입 실패" }, { status: 500 });
  }
}
