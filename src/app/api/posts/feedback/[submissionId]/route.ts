import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { submissionId: string } }
) {
  const url = req.url;

  const posts = await prisma.post.findMany({
    where: {
      submissionId: params.submissionId,
      type: "FEEDBACK",
    },
  });

  return NextResponse.json(posts);
}
