"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import React from "react";

import { H2, H3 } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tugas } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import TugasCard from "./tugas-card";

export default function TugasSectionPeserta() {
  const session = useSession();
  const tugasDone = useQuery<Tugas[], Error>({
    queryKey: ["tugas", "done", session.data?.user?.nim],
    queryFn: () =>
      fetch(`/api/users/${session.data?.user.nim}/tugas/done`).then((res) =>
        res.json()
      ),
  });

  const tugasAssigned = useQuery<Tugas[], Error>({
    queryKey: ["tugas", "assigned", session.data?.user?.nim],
    queryFn: () => {
      return fetch(`/api/users/${session.data?.user.nim}/tugas/assigned`).then(
        (res) => res.json()
      );
    },
  });

  if (tugasAssigned.isError || tugasDone.isError) {
    return notFound();
  }

  const isLoading = tugasAssigned.isLoading || tugasDone.isLoading;

  const tugasCount = tugasAssigned.data?.length! + tugasDone.data?.length!;

  return (
    <AnimatePresence>
      <motion.section
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "150px" }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
          delay: 0,
        }}
      >
        <div className="flex flex-row flex-wrap gap-x-12 gap-y-4 items-center justify-between">
          <H2 className="border-none -mb-2">Tugas Kamu</H2>
          <div className="flex flex-row gap-2 items-center">
            <p>Tugas selesai</p>
            {isLoading ? (
              <Badge>
                <Loader2Icon className="mr-2 animate-spin" size={16} />%
              </Badge>
            ) : (
              <Badge
                variant={
                  (tugasDone.data?.length! / tugasCount) * 100 < 75
                    ? "destructive"
                    : "default"
                }
              >
                {((tugasDone.data?.length! / tugasCount) * 100).toFixed(2)}%
              </Badge>
            )}
          </div>
        </div>

        <Tabs defaultValue="assigned" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assigned">
              🕒 Ditugaskan
              <span className="ml-1 xs:inline hidden">
                {isLoading ? (
                  <Loader2Icon className="animate-spin" size={12} />
                ) : (
                  <b>
                    ({tugasAssigned.data.length}/{tugasCount})
                  </b>
                )}
              </span>
            </TabsTrigger>

            <TabsTrigger value="done">
              ✅ Selesai
              <span className="ml-1 xs:inline hidden">
                {tugasAssigned.isLoading || tugasDone.isLoading ? (
                  <Loader2Icon className="animate-spin" size={12} />
                ) : (
                  <b>
                    ({tugasDone.data.length}/{tugasCount})
                  </b>
                )}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent className="flex flex-col gap-3" value="assigned">
            {isLoading && <TugasCard loading />}
            {tugasAssigned.data?.length === 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                  delay: 0,
                }}
              >
                <Card className="flex flex-col h-[150px] justify-center items-center px-10 py-6">
                  <H3>Yay! Tugas kamu selesai semua 🎉</H3>
                </Card>
              </motion.div>
            )}
            {!(tugasAssigned.data?.length === 0) &&
              !isLoading &&
              tugasAssigned.data?.map((tugas, index) => {
                return (
                  <motion.div
                    key={tugas.id}
                    initial={{ opacity: 0, y: 200 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0, 0.71, 0.2, 1.01],
                      delay: 0.15 * index,
                    }}
                  >
                    <TugasCard tugas={tugas} />
                  </motion.div>
                );
              })}
          </TabsContent>

          {/* TODO: Ini harus pakai pagination, klo ga bakal sampai bawah banget WKWWKWKWK */}
          <TabsContent className="flex flex-col gap-3" value="done">
            {tugasDone.data?.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                  delay: 0,
                }}
              >
                <Card className="flex flex-col h-[150px] justify-center items-center px-10 py-6">
                  <H3>Belum ada tugas yang selesai 😔</H3>
                </Card>
              </motion.div>
            )}
            {!(tugasDone.data?.length === 0) &&
              tugasDone.data?.map((tugas, index) => {
                return (
                  <motion.div
                    key={tugas.id}
                    initial={{ opacity: 0, y: 200 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0, 0.71, 0.2, 1.01],
                      delay: 0.15 * index,
                    }}
                  >
                    <TugasCard done tugas={tugas} />
                  </motion.div>
                );
              })}
          </TabsContent>
        </Tabs>
      </motion.section>
    </AnimatePresence>
  );
}
