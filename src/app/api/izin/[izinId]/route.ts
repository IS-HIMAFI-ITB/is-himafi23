import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";
import { StatusIzin, TipeIzin } from "@prisma/client";

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
  const { keterangan, tipe, bukti, status } = (await req.json()) as {
    keterangan: string | undefined;
    tipe: TipeIzin | undefined;
    bukti: string | undefined;
    status: StatusIzin | undefined;
  };
  const izin = await prisma.izin.update({
    where: {
      id: Number(params.izinId),
    },
    data: {
      keterangan,
      tipe,
      bukti,
      status,
    },
  });

  return NextResponse.json(izin);
}
