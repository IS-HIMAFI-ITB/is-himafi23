import DokumentasiSection from "./(components)/(dokumentasi)/dokumentasi-section";
import HeroSection from "./(components)/(hero)/hero";
import TimelineSection from "./(components)/(timeline)/timeline-section";
import VisiMisiSection from "./(components)/(visi-misi)/visi-misi-section";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <VisiMisiSection />
      <DokumentasiSection />
      <TimelineSection />
    </>
  );
}
