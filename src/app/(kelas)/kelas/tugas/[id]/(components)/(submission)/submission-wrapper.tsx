import { getServerSession } from "next-auth";
import React from "react";

import Unauthenticated from "@/components/template/unauthenticated";
import SubmissionDetailsProvider from "@/context/submission-details-provider";
import { getTugasSubmission } from "@/lib/server-fetch";

import SubmissionSection from "./submission-section";

export default async function SubmissionWrapper({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession();
  if (!session) return <Unauthenticated />;

  const tugasSubmission = await getTugasSubmission(session.user.id, params.id);
  return (
    <SubmissionDetailsProvider submission={tugasSubmission ?? undefined}>
      <SubmissionSection />
    </SubmissionDetailsProvider>
  );
}
