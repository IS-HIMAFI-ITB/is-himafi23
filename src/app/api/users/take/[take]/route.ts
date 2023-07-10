import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { take: number } }
) {
  const user = await prisma.user
    .findMany({
      take: Number(params.take),
    })
    .catch((err) => {
      return NextResponse.json(err, { status: 500 });
    });

  return NextResponse.json(user, { status: 200 });
}
