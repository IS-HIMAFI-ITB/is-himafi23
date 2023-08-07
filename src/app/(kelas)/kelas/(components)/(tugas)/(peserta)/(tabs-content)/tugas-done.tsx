"use client";

import { useSession } from "next-auth/react";
import React, { useContext } from "react";

import AnimateSection from "@/components/animate-section";
import { H3 } from "@/components/typography";
import { Card } from "@/components/ui/card";
import { TugasPesertaContext } from "@/context/tugas-peserta-provider";
import { Tugas } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import TugasCard from "../tugas-card";

export default function TugasDone() {
  const session = useSession();
  const initialData = useContext(TugasPesertaContext).tugasDone;
  const tugasDone = useQuery<Tugas[], Error>({
    queryKey: ["tugas", "done", session.data?.user?.nim],
    queryFn: () => {
      return fetch(`/api/users/${session.data?.user.nim}/tugas/done`).then(
        (res) => res.json()
      );
    },
    initialData: initialData,
  });

  if (tugasDone.isLoading) {
    return <TugasCard loading />;
  }

  switch (tugasDone.data?.length) {
    case 0:
      return (
        <AnimateSection
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
        </AnimateSection>
      );

    default:
      return tugasDone.data.map((tugas, index) => (
        <AnimateSection
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
        </AnimateSection>
      ));
  }
}
