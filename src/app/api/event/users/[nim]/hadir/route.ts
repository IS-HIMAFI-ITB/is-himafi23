import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
  const events = await prisma.event.findMany({
    where: {
      disabled: false,
      AND: [
        {
          hadir: {
            some: {
              nim: params.nim,
            },
          },
        },
        {
          OR: [
            {
              izin: {
                none: {
                  user: {
                    nim: params.nim,
                  },
                },
              },
            },
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
          ],
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
  });
  console.log("hadir", events);
  return NextResponse.json(events);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
  const { eventId } = (await req.json()) as {
    eventId: string;
  };

  if (!params.nim) return NextResponse.error();

  const event = await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      hadir: {
        connect: {
          nim: params.nim,
        },
      },
    },
  });

  return NextResponse.json(event);
}
