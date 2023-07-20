import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const tugas = await prisma.tugas
    .findUnique({
      where: { id: Number(params.id) },
    })
    .catch((err) => {
      throw new Error(err);
    });

  return NextResponse.json(tugas, { status: 200 });
}
