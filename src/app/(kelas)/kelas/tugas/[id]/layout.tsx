import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

import Unauthenticated from "@/components/template/unauthenticated";
import SubmissionDetailsProvider from "@/context/submission-details-provider";
import TugasDetailsProvider from "@/context/tugas-details-provider";
import { getTugasById, getTugasSubmission } from "@/lib/server-fetch";

export default async function TugasLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const session = await getServerSession();
  if (!session) return <Unauthenticated />;

  const tugas = await getTugasById(params.id);
  const tugasSubmission = await getTugasSubmission(session.user.id, params.id);

  if (!tugas) return notFound();

  return (
    <TugasDetailsProvider tugas={tugas}>
      <SubmissionDetailsProvider submission={tugasSubmission ?? undefined}>
        {children}
      </SubmissionDetailsProvider>
    </TugasDetailsProvider>
  );
}
