import { getServerSession } from "next-auth";
import React from "react";

import { authOptions } from "@/app/api/auth/auth-options";
import Unauthenticated from "@/components/template/unauthenticated";
import { Role } from "@prisma/client";

import CreateTugas from "./_components/create-tugas";

export default async function CreateTugasPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role === Role.PESERTA) {
    return <Unauthenticated />;
  }

  return <CreateTugas />;
}
