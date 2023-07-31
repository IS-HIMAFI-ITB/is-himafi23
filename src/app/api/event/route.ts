import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET() {
  const events = await prisma.event
    .findMany({
      where: {
        disabled: false,
      },
      include: {
        hadir: true,
        izin: true,
      },
    })
    .catch((error) => {
      throw new Error(error);
    });

  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  const {
    title,
    description,
    date,
    presensiQuestionAnswer,
    checkRecheckForm,
    disabled,
    enablePresensi,
  } = (await req.json()) as {
    title: string;
    description: string;
    date: string;
    presensiQuestionAnswer: string;
    checkRecheckForm: string;
    disabled: boolean;
    enablePresensi: boolean;
  };

  const event = await prisma.event
    .create({
      data: {
        title,
        description,
        date: new Date(date),
        presensiQuestionAnswer,
        checkRecheckForm,
        disabled,
        enablePresensi,
      },
    })
    .catch((error) => {
      throw new Error(error);
    });

  return NextResponse.json(event);
}
