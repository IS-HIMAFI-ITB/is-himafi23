import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";
import { Role } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { args: string } }
) {
  const url = req.url;
  if (params.args === "peserta") {
    const pesertaCount = await prisma.user.count({
      where: {
        role: Role.PESERTA,
      },
    });

    return NextResponse.json(pesertaCount);
  }

  return NextResponse.json(
    { message: "Please provide a params" },
    { status: 404 }
  );
}
