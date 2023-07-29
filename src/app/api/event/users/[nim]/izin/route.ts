import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";
import { TipeIzin } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
  const events = await prisma.event.findMany({
    where: {
      disabled: false,
      izin: {
        some: {
          user: {
            nim: params.nim,
          },
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
  const { eventId, keterangan, tipe, bukti } = (await req.json()) as {
    eventId: string;
    keterangan: string;
    tipe: TipeIzin;
    bukti: string;
  };

  const event = await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      izin: {
        create: {
          user: {
            connect: {
              nim: params.nim,
            },
          },
          keterangan,
          tipe,
          bukti,
        },
      },
    },
  });

  return NextResponse.json(event);
}
