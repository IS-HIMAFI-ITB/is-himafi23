import "moment/locale/id";

import moment from "moment";
import React from "react";

import Container from "@/components/layout/container";
import Unauthenticated from "@/components/template/unauthenticated";
import TugasDetailsProvider from "@/context/tugas-details-provider";
import { prisma } from "@/prisma";

import TugasSection from "./(components)/(tugas)/tugas-section";
import SubmissionSection from "./(components)/submission-section";

export async function generateStaticParams() {
  const tugas = await prisma.tugas.findMany();

  return tugas.map((tugas) => ({
    id: tugas.id.toString(),
  }));
}

export default async function TugasPage() {
  moment.locale("id");

  return (
    <Container className="pt-12 pb-24 grid gap-x-24 gap-y-12 lg:grid-cols-[65%_25%] grid-cols-1">
      <TugasSection />

      <SubmissionSection />
    </Container>
  );
}
