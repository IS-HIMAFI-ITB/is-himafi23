import { notFound } from "next/navigation";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/prisma";

import FormEkspektasiDay from "../(form)/form-ekspektasi-day";

export default async function EkspektasiDay({
  params,
}: {
  params: { eventId: string };
}) {
  const event = await prisma.event.findUnique({
    where: { id: params.eventId },
    select: { title: true },
  });

  if (!event) return notFound();

  return (
    <>
      <Card className="bg-background/80 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-primary text-black p-2 px-6 mb-4">
          <CardTitle className="text-lg">
            {`EKSPEKTASI TERHADAP ${event?.title.toUpperCase()}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Halo haloo. Terakhiran nih, jawab pertanyaan-pertanyaan di bawah ini
            dengan ekspektasi kalian terhadap {event?.title} yang akan
            dilaksanakan yaaa..
          </CardDescription>
        </CardContent>
      </Card>

      <FormEkspektasiDay title={event?.title} />
    </>
  );
}
