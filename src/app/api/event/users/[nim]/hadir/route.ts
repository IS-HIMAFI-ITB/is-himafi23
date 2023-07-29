import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
  const events = await prisma.event.findMany({
    where: {
      disabled: false,
      hadir: {
        some: {
          nim: params.nim,
        },
      },
    },
    include: {
      hadir: {
        where: {
          nim: params.nim,
        },
      },
      izin: {
        where: {
          user: {
            nim: params.nim,
          },
        },
      },
    },
  });
  return NextResponse.json(events);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
  const { eventId } = (await req.json()) as {
    eventId: string;
  };

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
