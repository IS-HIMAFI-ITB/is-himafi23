import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET() {
  const result = await prisma.tugas
    .findMany({
      orderBy: {
        dueDate: "desc",
      },
    })
    .catch((err: Error) => {
      throw new Error(err.message);
    });

  return NextResponse.json(result, { status: 200 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = await prisma.tugas
    .create({
      data: body,
    })
    .catch((err: Error) => {
      throw new Error(err.message);
    });

  // Send notification to all peserta, if it errors then it's okay
  // const allPesertaid = await prisma.user
  //   .findMany({
  //     where: {
  //       role: Role.PESERTA,
  //     },
  //     select: {
  //       id: true,
  //     },
  //   })
  //   .then((res) => {
  //     return res.map((user) => user.id);
  //   });

  // Index pertama create dulu, upsert ngebug ga jelas.
  const time = new Date().getTime();
  // const firstIndex = await prisma.notification
  //   .create({
  //     data: {
  //       title: `Tugas ${result.id} baru saja ditambahkan.`,
  //       description: `Kamu memiliki tugas baru dengan judul ${result.title}.`,
  //       type: "TUGAS",
  //       createdAt: new Date(),
  //       receiver: {
  //         connect: {
  //           id: allPesertaid[0],
  //         },
  //       },
  //     },
  //   })
  //   .then((res) => res.id);

  // Promise.all(
  //   allPesertaid.slice(1).map((id) => {
  //     return prisma.notification
  //       .update({
  //         where: {
  //           id: firstIndex,
  //         },
  //         data: {
  //           receiver: {
  //             connect: {
  //               id: id,
  //             },
  //           },
  //         },
  //       })
  //       .catch((err: Error) => {
  //         console.log(err);
  //       });
  //   })
  // );

  return NextResponse.json(result, { status: 200 });
}
