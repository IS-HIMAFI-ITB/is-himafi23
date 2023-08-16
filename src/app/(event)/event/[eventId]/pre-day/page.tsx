import { notFound } from "next/navigation";

import Container from "@/components/layout/container";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/prisma";

import FormProvider from "./_components/form-provider";
import FormIdentitas from "./_components/form/form-identitas";
import EkspektasiDay from "./_components/section/ekspektasi-day";
import KesiapanDay from "./_components/section/kesiapan-day";
import KondisiTubuh from "./_components/section/kondisi-tubuh";
import UserInfo from "./_components/user-info";

export async function generateStaticParams() {
  const events = await prisma.event.findMany();

  return events.map((event) => ({
    eventId: event.id.toString(),
  }));
}

export default async function FormPage({
  params,
}: {
  params: { eventId: string };
}) {
  //(TW: panjang) ** udah ga HAHAHA
  const event = await prisma.event.findUnique({
    where: { id: params.eventId },
    select: { title: true },
  });

  if (!event) return notFound();

  return (
    <Container className="flex flex-col gap-4">
      <Card className="bg-background/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>
            CHECK & RE-CHECK PRA-DAY {event.title.toUpperCase()}
          </CardTitle>

          <CardDescription>{`Halo, massa Fisika'22 ^^`}</CardDescription>

          <CardDescription>
            Bagaimana kabar kalian selama liburan kuliah ini? <br /> Siap untuk
            menghadapi kehidupan di jurusan? <br /> Semoga selalu sehat dan
            selalu semangat mengikuti rangkaian kegiatan Intellektuelle Schule
            2023 ini yaaa...
          </CardDescription>

          <CardDescription>
            Narahubung: <br />
            (kontak 1) <br />
            (kontak 2) <br />
          </CardDescription>

          <Separator />

          <UserInfo />
        </CardHeader>
      </Card>

      <FormProvider>
        <FormIdentitas />

        <KondisiTubuh params={{ eventId: params.eventId }} />

        <KesiapanDay params={{ eventId: params.eventId }} />

        <EkspektasiDay params={{ eventId: params.eventId }} />
      </FormProvider>
    </Container>
  );
}
