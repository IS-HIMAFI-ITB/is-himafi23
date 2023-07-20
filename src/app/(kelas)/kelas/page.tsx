"use client";

import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

import Container from "@/components/layout/container";
import { H2 } from "@/components/typography";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import DayInfoCard from "./(components)/day-info";
import TugasCard from "./(components)/tugas-card";

export default function KelasPage() {
  const session = useSession();
  return (
    <Container className="py-12">
      <section className="flex flex-row flex-wrap gap-y-8 gap-x-12 justify-between items-start mb-12">
        <p className="before:drop-shadow-glow text-accent font-black tracking-tight text-5xl sm:text-6xl lg:text-7xl before:content-['Ruang_Kelas'] before:absolute before:ml-[2px] before:mt-[2px] before:sm:ml-1 before:sm:mt-1 before:text-foreground">
          Ruang Kelas
        </p>

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

            <div className="flex flex-row w-full items-center gap-2">
              <Badge>
                {session.status === "loading" && (
                  <Loader2Icon className="animate-spin" size={16} />
                )}{" "}
                {!(session.status === "loading") && session.data?.user.role}
              </Badge>
              {" · "}
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

      <section className="flex flex-col gap-6">
        <div className="flex flex-row flex-wrap gap-x-12 gap-y-4 items-center justify-between">
          <H2 className="border-none">Informasi Kehadiran</H2>

          <motion.div
            className="flex flex-row gap-2 items-center"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <p>Persen kehadiran</p>
            <Badge variant={"destructive"}>50%</Badge>
          </motion.div>
        </div>

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
      </section>

      <motion.section
        className="flex flex-col gap-4 my-24"
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
          delay: 0,
        }}
      >
        <div className="flex flex-row flex-wrap gap-x-12 gap-y-4 items-center justify-between">
          <H2 className="border-none">Tugas Kamu</H2>
          <div className="flex flex-row gap-2 items-center">
            <p>Tugas selesai</p>
            <Badge>80%</Badge>
          </div>
        </div>

        <Tabs defaultValue="assigned" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assigned">
              Ditugaskan{" "}
              <span className="xs:inline hidden">
                🕒 <b>(2/10)</b>
              </span>
            </TabsTrigger>

            <TabsTrigger value="done">
              Selesai{" "}
              <span className="xs:inline hidden">
                ✅ <b>(8/10)</b>
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assigned">
            <TugasCard
              id="1"
              title="Kontrak Belajar Intellektuelle Schule 2023"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
        possimus reiciendis dolorum nisi ipsam doloremque deserunt deleniti
        dignissimos eum accusantium eos eius pariatur. Iste quidem reiciendis
        sequi placeat exercitationem quod. Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Odio mollitia, quasi quia necessitatibus
        modi ipsa nulla doloribus corrupti, odit voluptates dolore aliquid,
        dolor quisquam! Doloribus veniam dolorem architecto culpa ex! Lorem
        ipsum dolor sit amet, consectetur adipisicing elit. Quidem nihil omnis
        voluptate dolor excepturi. Deserunt harum placeat aspernatur modi odio,
        error dignissimos magnam molestiae voluptates ad odit tenetur deleniti
        optio?"
              dueDateTime="21/07/2023, 23.59 WIB"
            />
          </TabsContent>

          {/* TODO: Ini harus pakai pagination, klo ga bakal sampai bawah banget WKWWKWKWK */}
          <TabsContent value="done">
            <TugasCard
              mockTelat
              id="1"
              title="Kontrak Belajar Intellektuelle Schule 2023"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
        possimus reiciendis dolorum nisi ipsam doloremque deserunt deleniti
        dignissimos eum accusantium eos eius pariatur. Iste quidem reiciendis
        sequi placeat exercitationem quod. Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Odio mollitia, quasi quia necessitatibus
        modi ipsa nulla doloribus corrupti, odit voluptates dolore aliquid,
        dolor quisquam! Doloribus veniam dolorem architecto culpa ex! Lorem
        ipsum dolor sit amet, consectetur adipisicing elit. Quidem nihil omnis
        voluptate dolor excepturi. Deserunt harum placeat aspernatur modi odio,
        error dignissimos magnam molestiae voluptates ad odit tenetur deleniti
        optio?"
              dueDateTime="21/07/2023, 23.59 WIB"
            />
          </TabsContent>
        </Tabs>
      </motion.section>
    </Container>
  );
}
