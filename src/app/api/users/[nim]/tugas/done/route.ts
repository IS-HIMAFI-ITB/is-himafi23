import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
  console.log(req.url);

  const tugas = await prisma.tugas
    .findMany({
      where: {
        submissions: {
          some: {
            user: {
              nim: params.nim,
            },
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    })
    .catch((err) => {
      throw new Error(err);
    });

  return NextResponse.json(tugas, { status: 200 });
}
