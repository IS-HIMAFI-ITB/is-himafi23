import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

import { authOptions } from "../../auth/auth-options";

export async function GET(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const user = await prisma.user
    .findMany({
      where: {
        nim: params.nim,
      },
    })
    .catch((err) => {
      return NextResponse.json(err, { status: 500 });
    });

  return NextResponse.json(user, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
  const data = await req.json();

  const user = await prisma.user
    .update({
      where: {
        nim: params.nim,
      },
      data: {
        nim: data.nim.toString(),
        password: data.password,
        phoneNumber: data.phoneNumber,
      },
    })
    .catch((err) => {
      throw new Error(err);
    });

  return NextResponse.json(user, { status: 200 });
}
