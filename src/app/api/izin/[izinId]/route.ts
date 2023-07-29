import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";
import { TipeIzin } from "@prisma/client";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { izinId: string } }
) {
  const izin = await prisma.izin.deleteMany({
    where: {
      id: Number(params.izinId),
    },
  });

  return NextResponse.json(izin);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { izinId: string } }
) {
  const { keterangan, tipe, bukti } = (await req.json()) as {
    keterangan: string | undefined;
    tipe: TipeIzin | undefined;
    bukti: string | undefined;
  };
  const izin = await prisma.izin.update({
    where: {
      id: Number(params.izinId),
    },
    data: {
      keterangan,
      tipe,
      bukti,
    },
  });

  return NextResponse.json(izin);
}
