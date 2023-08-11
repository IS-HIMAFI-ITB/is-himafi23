import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { tugasId: string } }
) {
  const body = await req.json();

  if (!body.content || !body.tugasId || !body.authorId)
    return NextResponse.error();

  const result = await prisma.post.create({
    data: {
      content: body.content,
      authorId: body.authorId,
      tugasId: Number(body.tugasId),
      type: "TUGASCOMMENT",
    },
  });

  return NextResponse.json(result);
}
