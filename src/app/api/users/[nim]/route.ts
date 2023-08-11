import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
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
        lastPasswordChange: data.lastPasswordChange,
      },
    })
    .catch((err) => {
      throw new Error(err);
    });

  return NextResponse.json(user, { status: 200 });
}
