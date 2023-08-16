import { getServerSession } from "next-auth";
import React from "react";

import Unauthenticated from "@/components/template/unauthenticated";
import { prisma } from "@/prisma";
import { Role } from "@prisma/client";

import EditTugas from "./_components/edit-tugas";

export async function generateStaticParams() {
  const tugas = await prisma.tugas.findMany();

  return tugas.map((tugas) => ({
    id: tugas.id.toString(),
  }));
}

export default async function EditTugasPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession();
  const tugas = await prisma.tugas
    .findUnique({
      where: { id: Number(params.id) },
    })
    .catch((err) => {
      throw new Error(err);
    });

  if (!session || session.user.role === Role.PESERTA) {
    return <Unauthenticated />;
  }

  return <EditTugas initialData={tugas} />;
}
