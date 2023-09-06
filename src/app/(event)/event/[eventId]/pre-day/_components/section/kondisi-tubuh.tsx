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

import FormKondisiTubuh from "../form/form-kondisi-tubuh";

export default async function KondisiTubuh({
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
            {`CEK KONDISI KESEHATAN & RIWAYAT PENYAKIT PRA-${event?.title.toUpperCase()}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Untuk mengetahui kondisi kalian, harap isi form ini dengan
            sebenar-benarnya ya untuk mengantisipasi hal-hal yang tidak
            diinginkan selama keberjalanan day.
          </CardDescription>
        </CardContent>
      </Card>

      <FormKondisiTubuh title={event?.title} />
    </>
  );
}
