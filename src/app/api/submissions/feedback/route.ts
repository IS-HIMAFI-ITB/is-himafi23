import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";
import { Role } from "@prisma/client";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.content || !body.submissionId || !body.authorId)
    return NextResponse.error();

  const submission = await prisma.submission.findUnique({
    where: {
      id: body.submissionId,
    },
  });

  if (!submission) return NextResponse.error();

  const result = await prisma.post.create({
    data: {
      content: body.content,
      authorId: body.authorId,
      submissionId: body.submissionId,
      type: "FEEDBACK",
    },
  });

  // Send notifications
  if (result) {
    const user = await prisma.user.findUnique({
      where: {
        id: body.authorId,
      },
    });

    if (!user) return NextResponse.error();

    // if (user.role === Role.PESERTA) {
    //   const panitia = await prisma.user.findMany({
    //     where: {
    //       role: {
    //         not: Role.PESERTA,
    //       },
    //     },
    //   });

    //   Promise.all(
    //     panitia.map((panit) =>
    //       prisma.notification.create({
    //         data: {
    //           description:
    //             "Anda mendapatkan balasan terhadap feedback yang Anda berikan",
    //           title: `Balasan Feedback Tugas ${submission?.tugasId}`,
    //           type: "FEEDBACK",
    //           receiver: {
    //             connect: {
    //               id: panit.id,
    //             },
    //           },
    //         },
    //       })
    //     )
    //   );

    //   return;
    // } else {
    if (!submission.userId) return NextResponse.error();

    if (user.role === Role.PESERTA) return;

    await prisma.notification.create({
      data: {
        description: `Anda mendapatkan feedback dari ${user.name}`,
        title: `Feedback Tugas ${submission?.tugasId}`,
        type: "FEEDBACK",
        receiver: {
          connect: {
            id: submission.userId,
          },
        },
      },
    });

    return;
    // }
  }

  return NextResponse.json(result);
}
