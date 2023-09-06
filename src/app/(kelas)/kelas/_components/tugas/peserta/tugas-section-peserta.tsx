import React from "react";

import AnimatePresence from "@/components/animation/animate-presence";
import { MotionSection } from "@/components/animation/motion-element";
import Unauthenticated from "@/components/template/unauthenticated";
import { H2 } from "@/components/typography";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import TugasPesertaProvider from "@/context/tugas-peserta-provider";
import { prisma } from "@/prisma";

import TugasAssigned from "./(tabs-content)/tugas-assigned";
import TugasDone from "./(tabs-content)/tugas-done";
import TabsListTugas from "./(tabs-list)/tabs-list-tugas";
import TugasSelesaiBadge from "./tugas-selesai-badge";

export default async function TugasSectionPeserta() {
  // This acts as initial data for the query
  const tugas = await prisma.tugas.findMany({
    include: {
      submissions: true,
    },
  });

  return (
    <TugasPesertaProvider tugas={tugas}>
      <AnimatePresence>
        <MotionSection
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
              <TugasSelesaiBadge />
            </div>
          </div>

          <Tabs defaultValue="assigned" className="w-full">
            <TabsListTugas />

            <TabsContent className="flex flex-col gap-3" value="assigned">
              <TugasAssigned />
            </TabsContent>

            {/* TODO: Ini harus pakai pagination, klo ga bakal sampai bawah banget WKWWKWKWK */}
            <TabsContent className="flex flex-col gap-3" value="done">
              <TugasDone />
            </TabsContent>
          </Tabs>
        </MotionSection>
      </AnimatePresence>
    </TugasPesertaProvider>
  );
}
