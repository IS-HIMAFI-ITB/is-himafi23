"use client";

import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";

import { MotionSection } from "@/components/animation/motion-element";
import { H3 } from "@/components/typography";
import { Card } from "@/components/ui/card";
import { TugasPesertaContext } from "@/context/tugas-peserta-provider";
import { Tugas } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import TugasCard from "../tugas-card";

export default function TugasDone() {
  // only render on client side (or when mounted) to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const session = useSession();
  const initialAllData = useContext(TugasPesertaContext);
  const initialData = initialAllData?.filter((tugas) =>
    tugas.submissions.filter(
      (submission) => submission.userId === session.data?.user?.id
    )
  );
  const tugasDone = useQuery<Tugas[], Error>({
    queryKey: ["tugas", "done", session.data?.user?.nim],
    queryFn: () => {
      return fetch(`/api/users/${session.data?.user.nim}/tugas/done`).then(
        (res) => res.json()
      );
    },
    initialData,
  });

  if (!mounted) return null;

  if (tugasDone.isLoading) {
    return <TugasCard loading />;
  }

  if (tugasDone.isError) {
    return <p>Error!</p>;
  }

  switch (tugasDone.data?.length) {
    case 0:
      return (
        <MotionSection
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
        </MotionSection>
      );

    default:
      return tugasDone.data.map((tugas, index) => (
        <MotionSection
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
        </MotionSection>
      ));
  }
}
