import "moment/locale/id";

import moment from "moment";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

import { authOptions } from "@/app/api/auth/auth-options";
import Container from "@/components/layout/container";

import SubmissionSection from "./(components)/submission-nilai-section";
import TugasSection from "./(components)/tugas-nilai-section";

export default async function TugasPage() {
  moment.locale("id");
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  if (session.user.role === "PESERTA") redirect("/unauthorized");

  return (
    <Container className="pt-12 pb-24 grid gap-x-24 gap-y-12 lg:grid-cols-[65%_25%] grid-cols-1">
      <TugasSection />

      <SubmissionSection />
    </Container>
  );
}
