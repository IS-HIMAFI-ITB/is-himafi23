import { notFound } from "next/navigation";
import React from "react";

import TugasDetailsProvider from "@/context/tugas-details-provider";
import { getTugasById } from "@/lib/server-fetch";
import { prisma } from "@/prisma";

export async function staticParams() {
  const tugas = await prisma.tugas.findMany();

  return tugas.map((tugas) => ({
    id: tugas.id.toString(),
  }));
}

export const generateStaticParams =
  process.env.NODE_ENV === "production" ? staticParams : undefined;
export const dynamic =
  process.env.NODE_ENV === "production" ? "auto" : "force-dynamic";

export default async function TugasLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const tugas = await getTugasById(params.id);

  if (!tugas) return notFound();

  return <TugasDetailsProvider tugas={tugas}>{children}</TugasDetailsProvider>;
}
