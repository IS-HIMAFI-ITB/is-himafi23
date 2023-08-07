import React from "react";

import Container from "@/components/layout/container";

import KehadiranSection from "./(components)/(event)/(peserta)/kehadiran-section";
import KehadiranSectionPanitia from "./(components)/(event)/kehadiran-section-panitia";
import PapanInformasiSection from "./(components)/(informasi)/papan-informasi-section";
import TugasSectionPanitia from "./(components)/(tugas)/(panitia)/tugas-section-panitia";
import TugasSectionPeserta from "./(components)/(tugas)/(peserta)/tugas-section-peserta";
import UserInfo from "./(components)/user-info";
import ViewAs from "./(components)/view-as";

export default async function KelasPage() {
  return (
    <Container className="py-12">
      <section className="flex flex-col flex-wrap md:flex-row gap-y-8 gap-x-12 justify-between items-start mb-12">
        <div>
          <p className="before:md:drop-shadow-glow text-accent font-black tracking-tight text-[2.7rem] leading-[1] xs:text-5xl sm:text-6xl lg:text-7xl before:content-['Ruang_Kelas'] before:absolute before:ml-[2px] before:mt-[2px] before:sm:ml-1 before:sm:mt-1 before:text-foreground">
            Ruang Kelas
          </p>
        </div>

        <UserInfo />
      </section>

      <ViewAs
        kehadiranPanitia={<KehadiranSectionPanitia />}
        kehadiranPeserta={<KehadiranSection />}
        papanInformasi={<PapanInformasiSection />}
        tugasPanitia={<TugasSectionPanitia />}
        tugasPeserta={<TugasSectionPeserta />}
      />
    </Container>
  );
}
