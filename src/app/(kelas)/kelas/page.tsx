"use client";

import "./info-card-style.css";

import { motion } from "framer-motion";
import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

import Container from "@/components/layout/container";
import Unauthenticated from "@/components/template/unauthenticated";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Role } from "@prisma/client";

import DayInfoCard from "./(components)/day-info";
import KehadiranSection from "./(components)/kehadiran-section";
import KehadiranSectionPanitia from "./(components)/kehadiran-section-panitia";
import PapanInformasiSection from "./(components)/papan-informasi-section";
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

      {session.data?.user.role === "PESERTA" && (
        <>
          <motion.section
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0, 0.71, 0.2, 1.01],
              delay: 0,
            }}
            className="grid grid-cols-1 gap-6 max-h-full my-12"
          >
            <PapanInformasiSection />
          </motion.section>
          <motion.section
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "130px" }}
            transition={{
              duration: 0.8,
              ease: [0, 0.71, 0.2, 1.01],
              delay: 0,
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-full my-12"
          >
            <KehadiranSection />
          </motion.section>
          <TugasSectionPeserta />
        </>
      )}
      {!(session.data?.user.role === "PESERTA") &&
        (viewAs === "PESERTA" ? (
          <>
            <motion.section
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0, 0.71, 0.2, 1.01],
                delay: 0,
              }}
              className="grid grid-cols-1 gap-6 max-h-full my-12"
            >
              <PapanInformasiSection />
            </motion.section>
            <motion.section
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "130px" }}
              transition={{
                duration: 0.8,
                ease: [0, 0.71, 0.2, 1.01],
                delay: 0,
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-full my-12"
            >
              <KehadiranSection />
            </motion.section>
            <TugasSectionPeserta />
          </>
        ) : (
          <Tabs defaultValue="tugas" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="tugas" className="w-full">
                Tugas
              </TabsTrigger>
              <TabsTrigger value="acara" className="w-full">
                Acara
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tugas">
              <TugasSectionPanitia />
            </TabsContent>
            <TabsContent value="acara">
              <KehadiranSectionPanitia />
            </TabsContent>
          </Tabs>
        ))}
    </Container>
  );
}
