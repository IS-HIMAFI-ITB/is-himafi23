import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
  const url = req.url;

  const tugas = await prisma.tugas.findMany({
    where: {
      NOT: {
        submissions: {
          some: {
            user: {
              nim: params.nim,
            },
          },
        },
      },
    },
    orderBy: {
      dueDate: "asc",
    },
  });

  return NextResponse.json(tugas, { status: 200 });
}
