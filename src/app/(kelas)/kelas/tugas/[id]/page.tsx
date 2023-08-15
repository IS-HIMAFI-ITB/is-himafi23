import "moment/locale/id";

import moment from "moment";
import React from "react";

import Container from "@/components/layout/container";

import SubmissionSection from "./(components)/(submission)/submission-section";
import TugasSection from "./(components)/(tugas)/tugas-section";

export default async function TugasPage({
  params,
}: {
  params: { id: string };
}) {
  moment.locale("id");

  return (
    <Container className="pt-12 pb-24 grid gap-x-24 gap-y-12 lg:grid-cols-[65%_25%] grid-cols-1">
      <TugasSection params={{ id: params.id }} />

      <SubmissionSection />
    </Container>
  );
}
