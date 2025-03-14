import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "이메일 또는 비밀번호가 일치하지 않습니다." },
        { status: 400 }
      );
    }

    await prisma.session.deleteMany({ where: { userId: user.id } });

    const sessionToken = randomUUID();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 12);

    await prisma.session.create({
      data: { userId: user.id, token: sessionToken, expiresAt },
    });

    const cookieStore = await cookies();
    cookieStore.set("session_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    return NextResponse.json({ user: { id: user.id, email: user.email } });
  } catch (error) {
    return NextResponse.json({ error: "로그인 실패" }, { status: 500 });
  }
}
