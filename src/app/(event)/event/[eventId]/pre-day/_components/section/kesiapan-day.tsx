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

import FormKesiapanMengikutiDay from "../form/form-kesiapan-mengikuti-day";

export default async function KesiapanDay({
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
            {`CEK KESIAPAN MENGIKUTI ${event?.title.toUpperCase()}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Halo, semua! <br />
            Apakah kalian sudah siap untuk mengikuti rangkaian acara{" "}
            {event?.title}? <br />
            Langsung jawab pertanyaan-pertanyaan berikut dengan sejujur-jujurnya
            ya...
          </CardDescription>
        </CardContent>
      </Card>

      <FormKesiapanMengikutiDay title={event?.title} />
    </>
  );
}
