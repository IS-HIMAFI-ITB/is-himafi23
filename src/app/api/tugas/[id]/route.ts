import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

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

  return NextResponse.json(tugas, { status: 200 });
}
