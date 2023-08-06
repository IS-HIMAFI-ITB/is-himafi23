"use client";

import React from "react";

import AnimateSection from "@/components/animate-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useViewAsStore } from "@/lib/store";
import { Role } from "@prisma/client";

export default function ViewAs({
  papanInformasi,
  kehadiranPeserta,
  kehadiranPanitia,
  tugasPeserta,
  tugasPanitia,
}: {
  papanInformasi: React.ReactNode;
  kehadiranPeserta: React.ReactNode;
  kehadiranPanitia: React.ReactNode;
  tugasPeserta: React.ReactNode;
  tugasPanitia: React.ReactNode;
}) {
  const { viewAs } = useViewAsStore();

  switch (viewAs) {
    case Role.PESERTA:
      return (
        <>
          <AnimateSection
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0, 0.71, 0.2, 1.01],
              delay: 0,
            }}
            className="grid grid-cols-1 gap-6 max-h-full my-12"
          >
            {papanInformasi}
          </AnimateSection>

          <AnimateSection
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
            {kehadiranPeserta}
          </AnimateSection>

          {tugasPeserta}
        </>
      );

    default:
      return (
        <Tabs defaultValue="tugas" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="tugas" className="w-full">
              Tugas
            </TabsTrigger>

            <TabsTrigger value="acara" className="w-full">
              Acara
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tugas">{tugasPanitia}</TabsContent>

          <TabsContent value="acara">{kehadiranPanitia}</TabsContent>
        </Tabs>
      );
  }
}
