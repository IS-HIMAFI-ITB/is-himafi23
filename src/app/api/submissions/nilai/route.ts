import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function PATCH(req: NextRequest) {
  const body = await req.json();

  if (!body.score) return NextResponse.error();

  const result = await prisma.submission.update({
    where: {
      id: body.id,
    },
    data: {
      score: body.score,
    },
  });

  if (result) {
    if (!result.userId) return;

    await prisma.notification.create({
      data: {
        receiver: {
          connect: {
            id: result.userId,
          },
        },
        title: `Tugas ${result.tugasId} baru saja dinilai`,
        description: `Silakan cek nilai tugas kamu di halaman tugas yang bersangkutan.`,
        type: "TUGAS",
      },
    });
  }

  return NextResponse.json(result, { status: 200 });
}
