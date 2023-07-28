"use client";

import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

import Container from "@/components/layout/container";
import Unauthenticated from "@/components/template/unauthenticated";
import { H3 } from "@/components/typography";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Role } from "@prisma/client";

import DayInfoCard from "./(components)/day-info";
import TugasCard from "./(components)/tugas-card";
import TugasSectionPanitia from "./(components)/tugas-section-panitia";
import TugasSectionPeserta from "./(components)/tugas-section-peserta";

export default function KelasPage() {
  const session = useSession();
  const [viewAs, setViewAs] = useState<string>(Role.PESERTA);

  if (session.status === "unauthenticated") return <Unauthenticated />;

  return (
    <Container className="py-12">
      <section className="flex flex-col flex-wrap md:flex-row gap-y-8 gap-x-12 justify-between items-start mb-12">
        <div>
          <p className="before:md:drop-shadow-glow text-accent font-black tracking-tight text-[2.7rem] leading-[1] xs:text-5xl sm:text-6xl lg:text-7xl before:content-['Ruang_Kelas'] before:absolute before:ml-[2px] before:mt-[2px] before:sm:ml-1 before:sm:mt-1 before:text-foreground">
            Ruang Kelas
          </p>
        </div>

        <Card className="p-4 flex flex-row gap-4 justify-center items-center">
          <Avatar className="md:w-12 md:h-12">
            <AvatarFallback>
              {session.data?.user.name?.split(" ")[0][0] ?? (
                <Loader2Icon className="animate-spin" size={16} />
              )}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2">
            {session.status === "loading" && <Skeleton className="w-24 h-4" />}
            {!(session.status === "loading") && (
              <p className="line-clamp-1 font-semibold">
                {session.data?.user.name}
              </p>
            )}

            <div className="flex flex-row flex-wrap-reverse w-full items-center gap-x-4 gap-y-2">
              <Badge>
                {session.status === "loading" && (
                  <Loader2Icon className="animate-spin" size={16} />
                )}{" "}
                {!(session.status === "loading") &&
                  (session.data?.user.role === Role.PESERTA ? (
                    <p>{session.data.user.role}</p>
                  ) : (
                    <Select defaultValue={viewAs} onValueChange={setViewAs}>
                      <SelectTrigger className="text-sm flex flex-row gap-1 focus:ring-offset-0 w-fit h-fit px-0 py-px border-none ring-0 focus:ring-0">
                        <SelectValue placeholder={viewAs} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={Role.PESERTA}>
                          {Role.PESERTA}
                        </SelectItem>
                        <SelectItem value={session.data?.user.role!}>
                          {session.data?.user.role}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ))}
              </Badge>
              {session.status === "loading" && (
                <Skeleton className="w-24 h-4" />
              )}
              {!(session.status === "loading") && (
                <p className="line-clamp-1">{session.data?.user.nim}</p>
              )}
            </div>
          </div>
        </Card>
      </section>

      <section className="flex flex-col gap-4 my-12">
        <Alert className="px-12 py-8 bg-card/30 border-primary/10 backdrop-blur">
          <AlertTitle>
            <H3>Halooo, Afi 👋</H3>
          </AlertTitle>
          <div className="prose prose-invert prose-sm lg:prose-base">
            <p>
              Ada pengumuman penting yang harus kalian ketahui! akan
              dilaksanakan{" "}
              <strong>Wawancara Peserta Intellektuelle Schule 2023</strong>{" "}
              pada:
              <br />
              <br />
              <strong>📆 Tanggal: </strong>29 Juli 2023
              <br />
              <strong>🕘 Jam: </strong>08.00 WIB - 17.00 WIB
              <br />
              <br />
              Teknis pelaksanaan dapat dilihat lebih lengkap pada SOP peserta
              wawancara yang dapat diunduh pada link{" "}
              <Link
                href="https://uploadthing.com/f/331cb7e9-298a-401c-8f01-e1ff3a2e28f4_SOP%20PESERTA%20WAWANCARA.pdf"
                target="_blank"
              >
                berikut ini
              </Link>
              .
            </p>
          </div>
        </Alert>
      </section>

      {/* Disabled sampai full release */}

      {/* <section className="flex flex-col gap-6 my-24">
        <motion.div
          className="flex flex-row flex-wrap gap-x-12 gap-y-4 items-center justify-between"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <H2 className="border-none">Informasi Kehadiran</H2>

          <div className="flex flex-row gap-2 items-center">
            <p>Persen kehadiran</p>
            <Badge variant={"destructive"}>50%</Badge>
          </div>
        </motion.div>

        <motion.div
          className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 min-h-[16rem] h-max"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <DayInfoCard
            className="border-primary md:drop-shadow-glow hover:scale-105 transition"
            day="1"
            date="12/12/2023"
            time="07.00 WIB - 09.00 WIB"
            location="Ciwalk"
            desc="Lorem ipsum dolor sit amet, ini judul day."
          />
          <DayInfoCard
            className="md:flex hidden hover:scale-105 transition"
            unknown
          />
          <DayInfoCard
            className="xl:flex hidden hover:scale-105 transition"
            unknown
          />
          <DayInfoCard
            className="xl:flex hidden hover:scale-105 transition"
            unknown
          />
        </motion.div>
      </section> */}

      {session.data?.user.role === "PESERTA" && <TugasSectionPeserta />}
      {!(session.data?.user.role === "PESERTA") &&
        (viewAs === "PESERTA" ? (
          <TugasSectionPeserta />
        ) : (
          <TugasSectionPanitia />
        ))}
    </Container>
  );
}
