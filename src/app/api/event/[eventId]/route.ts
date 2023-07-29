import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
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
  const { title, description, date, disabled } = (await req.json()) as {
    eventId: string;
    title: string | undefined;
    description: string | undefined;
    date: Date | undefined;
    disabled: boolean | undefined;
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
    },
  });

  return NextResponse.json(event);
}
