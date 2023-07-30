import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  if (params.eventId === "all") {
    const events = await prisma.event.findMany({
      include: {
        hadir: true,
        izin: true,
      },
    });

    return NextResponse.json(events);
  }

  const event = await prisma.event.findUnique({
    where: {
      id: params.eventId,
    },
    include: {
      hadir: true,
      izin: true,
    },
  });

  return NextResponse.json(event);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  const {
    title,
    description,
    date,
    disabled,
    enablePresensi,
    presensiQuestion,
    presensiQuestionAnswer,
  } = (await req.json()) as {
    title: string | undefined;
    description: string | undefined;
    date: Date | undefined;
    disabled: boolean | undefined;
    enablePresensi: boolean | undefined;
    presensiQuestion: string | undefined;
    presensiQuestionAnswer: string | undefined;
  };

  const event = await prisma.event.update({
    where: {
      id: params.eventId,
    },
    data: {
      title,
      description,
      date,
      disabled,
      enablePresensi,
      presensiQuestion,
      presensiQuestionAnswer,
    },
  });

  return NextResponse.json(event);
}
