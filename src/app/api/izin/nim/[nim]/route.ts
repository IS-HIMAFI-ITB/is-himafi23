import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
  const izin = await prisma.izin.findMany({
    where: {
      user: {
        nim: params.nim,
      },
    },
    include: {
      event: true,
    },
  });

  return NextResponse.json(izin);
}
