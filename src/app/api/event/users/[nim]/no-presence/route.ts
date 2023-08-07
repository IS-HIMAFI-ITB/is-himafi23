import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
  const events = await prisma.event
    .findMany({
      where: {
        disabled: false,
        hadir: {
          none: {
            nim: params.nim,
          },
        },
        OR: [
          {
            izin: {
              some: {
                AND: [
                  {
                    user: {
                      nim: params.nim,
                    },
                  },
                  {
                    status: "DITOLAK",
                  },
                ],
              },
            },
          },
          {
            izin: {
              none: {
                user: {
                  nim: params.nim,
                },
              },
            },
          },
        ],
      },
      include: {
        hadir: {
          where: {
            nim: params.nim,
          },
        },
        izin: {
          orderBy: {
            createdAt: "desc",
          },
          where: {
            user: {
              nim: params.nim,
            },
          },
        },
      },
    })
    .catch((error) => {
      throw new Error(error);
    });

  return NextResponse.json(events);
}
