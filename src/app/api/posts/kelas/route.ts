import { NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET() {
  const posts = await prisma.post
    .findMany({
      where: {
        type: {
          equals: "KELAS",
        },
      },
      include: {
        author: true,
      },
    })
    .catch((err) => {
      throw new Error(err);
    });

  return NextResponse.json(posts);
}
