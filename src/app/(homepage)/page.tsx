import DokumentasiSection from "./_components/dokumentasi/dokumentasi-section";
import HeroSection from "./_components/hero/hero";
import TimelineSection from "./_components/timeline/timeline-section";
import VisiMisiSection from "./_components/visi-misi/visi-misi-section";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <VisiMisiSection />
      {/* <DokumentasiSection /> */}
      {/* <TimelineSection /> */}
    </>
  );
}
