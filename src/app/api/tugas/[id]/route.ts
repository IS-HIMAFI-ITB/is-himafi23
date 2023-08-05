import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";
import { Role } from "@prisma/client";

import { authOptions } from "../../auth/auth-options";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const tugas = await prisma.tugas
    .findUnique({
      where: { id: Number(params.id) },
    })
    .catch((err) => {
      throw new Error(err);
    });

  return NextResponse.json(tugas, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const tugas = await prisma.tugas
    .delete({
      where: { id: Number(params.id) },
    })
    .catch((err) => {
      throw new Error(err);
    });

  return NextResponse.json(tugas, { status: 200 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const body = await req.json();

  const tugas = await prisma.tugas
    .update({
      where: { id: Number(params.id) },
      data: body,
    })
    .catch((err) => {
      throw new Error(err);
    });

  // Send notification to all peserta, if it errors then it's okay
  const allPesertaid = await prisma.user
    .findMany({
      where: {
        role: Role.PESERTA,
      },
      select: {
        id: true,
      },
    })
    .then((res) => {
      return res.map((user) => user.id);
    });

  // Index pertama create dulu, upsert ngebug ga jelas.
  const time = new Date().getTime();
  const firstIndex = await prisma.notification
    .create({
      data: {
        title: `Tugas ${tugas.id} baru saja diperbarui.`,
        description: `Silakan cek detail tugas terbaru di halaman tugas yang bersangkutan.`,
        type: "TUGAS",
        createdAt: new Date(),
        receiver: {
          connect: {
            id: allPesertaid[0],
          },
        },
      },
    })
    .then((res) => res.id);

  await Promise.all(
    allPesertaid.slice(1).map((id, i) => {
      return prisma.notification.update({
        where: {
          id: firstIndex,
        },
        data: {
          receiver: {
            connect: {
              id: id,
            },
          },
        },
      });
    })
  );

  return NextResponse.json(tugas, { status: 200 });
}
