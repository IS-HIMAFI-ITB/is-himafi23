import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const submissions = await prisma.submission
    .findMany({
      where: {
        userId: params.userId,
      },
    })
    .catch((err) => {
      throw new Error(err.message);
    });

  return NextResponse.json(submissions, { status: 200 });
}
