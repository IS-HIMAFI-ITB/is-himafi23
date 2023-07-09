import { NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET() {
  const userCount = await prisma.user.count().catch((e: Error) => e.message);
  const postCount = await prisma.contents
    .count()
    .catch((e: Error) => e.message);

  return NextResponse.json(
    { userCount: userCount, postCount: postCount },
    { status: 200 }
  );
}
