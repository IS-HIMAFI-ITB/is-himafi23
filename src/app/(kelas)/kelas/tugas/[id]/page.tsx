import "moment/locale/id";

import moment from "moment";
import { getServerSession } from "next-auth";
import React from "react";

import Container from "@/components/layout/container";
import Unauthenticated from "@/components/template/unauthenticated";
import SubmissionDetailsProvider from "@/context/submission-details-provider";
import { getTugasSubmission } from "@/lib/server-fetch";

import SubmissionSection from "./(components)/(submission)/submission-section";
import TugasSection from "./(components)/(tugas)/tugas-section";

export default async function TugasPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession();
  if (!session) return <Unauthenticated />;

  const tugasSubmission = await getTugasSubmission(session.user.nim, params.id);
  moment.locale("id");

  return (
    <SubmissionDetailsProvider submission={tugasSubmission ?? undefined}>
      <Container className="pt-12 pb-24 grid gap-x-24 gap-y-12 lg:grid-cols-[65%_25%] grid-cols-1">
        <TugasSection />

        <SubmissionSection />
      </Container>
    </SubmissionDetailsProvider>
  );
}
