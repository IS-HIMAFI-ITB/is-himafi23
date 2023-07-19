import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

import { authOptions } from "../../../auth/auth-options";

export async function GET(
  req: NextRequest,
  { params }: { params: { take: number } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const user = await prisma.user
    .findMany({
      take: Number(params.take),
    })
    .catch((err) => {
      return NextResponse.json(err, { status: 500 });
    });

  return NextResponse.json(user, { status: 200 });
}
