import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

import { authOptions } from "../../auth/auth-options";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const submissions = await prisma.submission
    .findMany({
      where: {
        userId: params.userId,
      },
    })
    .catch((err) => {
      throw new Error(err.message);
    });

  return NextResponse.json(submissions, { status: 200 });
}
