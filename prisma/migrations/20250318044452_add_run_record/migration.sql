-- CreateEnum
CREATE TYPE "RunType" AS ENUM ('FIVE_K', 'TEN_K', 'HALF', 'FULL');

-- CreateTable
CREATE TABLE "RunRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "distance" "RunType" NOT NULL,
    "time" INTEGER NOT NULL,
    "memo" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RunRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RunRecord" ADD CONSTRAINT "RunRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
