import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { prisma } from "@/prisma";

import { authOptions } from "../auth/auth-options";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const userCount = await prisma.user.count().catch((e: Error) => e.message);
  const postCount = await prisma.contents
    .count()
    .catch((e: Error) => e.message);

  return NextResponse.json(
    { userCount: userCount, postCount: postCount },
    { status: 200 }
  );
}
