"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

import { H2, H3 } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Submission, Tugas } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import TugasCard from "./tugas-card";

export default function TugasSectionPeserta() {
  const session = useSession();
  const tugases = useQuery<Tugas[], Error>({
    queryKey: ["tugas"],
    queryFn: async () => {
      const res = await fetch("/api/tugas");
      const data = await res.json();
      return data;
    },
    refetchInterval: 1000 * 60 * 10, // 10 minutes
  });

  const submissions = useQuery<Submission[], Error>({
    queryKey: ["submissions", { userId: session.data?.user.id }],
    queryFn: async () => {
      const res = await fetch(`/api/submissions/${session.data?.user.id}`);
      const data = await res.json();
      return data;
    },
  });

  const [tugasAssigned, setTugasAssigned] = React.useState<Tugas[]>([]);
  const [tugasDone, setTugasDone] = React.useState<Tugas[]>([]);
  useEffect(() => {
    if (!tugases.data || !submissions.data) return;
    if (tugases.isLoading || submissions.isLoading) return;
    if (tugases.isError || submissions.isError) return;

    const tugasDone = tugases.data?.filter((tugas) => {
      return submissions.data?.find((submission) => {
        return submission.tugasId === tugas.id;
      });
    });
    setTugasDone(tugasDone);

    const tugasAssigned = tugases.data?.filter((tugas) => {
      return !submissions.data?.find((submission) => {
        return submission.tugasId === tugas.id;
      });
    });
    setTugasAssigned(tugasAssigned);
  }, [
    tugases.data,
    submissions.data,
    tugases.isLoading,
    tugases.isError,
    submissions.isLoading,
    submissions.isError,
  ]);

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
            {tugases.isLoading || submissions.isLoading ? (
              <Badge>
                <Loader2Icon className="mr-2 animate-spin" size={16} />%
              </Badge>
            ) : (
              <Badge
                variant={
                  (tugasDone?.length! / tugases.data?.length!) * 100 < 75
                    ? "destructive"
                    : "default"
                }
              >
                {((tugasDone?.length! / tugases.data?.length!) * 100).toFixed(
                  2
                )}
                %
              </Badge>
            )}
          </div>
        </div>

        <Tabs defaultValue="assigned" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assigned">
              🕒 Ditugaskan
              <span className="ml-1 xs:inline hidden">
                {submissions.isLoading || tugases.isLoading ? (
                  <Loader2Icon className="animate-spin" size={12} />
                ) : (
                  <b>
                    ({tugasAssigned?.length}/{tugases.data?.length})
                  </b>
                )}
              </span>
            </TabsTrigger>

            <TabsTrigger value="done">
              ✅ Selesai
              <span className="ml-1 xs:inline hidden">
                {submissions.isLoading || tugases.isLoading ? (
                  <Loader2Icon className="animate-spin" size={12} />
                ) : (
                  <b>
                    ({tugasDone?.length}/{tugases.data?.length})
                  </b>
                )}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent className="flex flex-col gap-3" value="assigned">
            {tugases.isLoading && <TugasCard loading />}
            {tugasAssigned?.length === 0 && !tugases.isLoading && (
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
            {!(tugasAssigned?.length === 0) &&
              !tugases.isLoading &&
              tugasAssigned?.map((tugas, index) => {
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
            {tugasDone?.length === 0 && (
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
            {!(tugasDone?.length === 0) &&
              tugasDone?.map((tugas, index) => {
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
