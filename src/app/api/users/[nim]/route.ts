import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
  const user = await prisma.user
    .findMany({
      where: {
        nim: params.nim,
      },
    })
    .catch((err) => {
      return NextResponse.json(err, { status: 500 });
    });

  return NextResponse.json(user, { status: 200 });
}
