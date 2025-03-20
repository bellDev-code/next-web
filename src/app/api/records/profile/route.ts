import { PrismaClient } from "@prisma/client/extension";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// 기록 요청
export async function POST(req: Request) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;

  if (!sessionToken) {
    return NextResponse.json({ error: "세션 없음" }, { status: 401 });
  }

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

  const userId = session.userId;
  const records = await req.json();

  if (!Array.isArray(records) || records.length === 0) {
    return NextResponse.json({ error: "잘못된 요청 데이터" }, { status: 400 });
  }

  // 여러 개의 기록을 저장
  const createdRecords = await prisma.$transaction(
    records.map((record) =>
      prisma.runRecord.create({
        data: {
          userId,
          distance: record.distance, // "FIVE_K" | "TEN_K" | "HALF" | "FULL"
          time: record.time, // 초 단위 기록
          memo: record.memo || [], // 메모 (없으면 빈 배열)
        },
      })
    )
  );

  return NextResponse.json({
    message: "기록 저장 완료",
    records: createdRecords,
  });
}
