import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string; tugasId: string } }
) {
  const submissions = await prisma.submission
    .findMany({
      where: {
        userId: params.userId,
        tugasId: Number(params.tugasId),
      },
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return NextResponse.json(submissions, { status: 200 });
}
