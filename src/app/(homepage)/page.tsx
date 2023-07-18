import Image from "next/image";

import hero from "@/../public/images/sky.png";

import HeroSection from "./(components)/hero";

export default async function Home() {
  return (
    <>
      <HeroSection />
      {/* <section className="relative w-full h-screen">
        <Image
          src={hero}
          alt="hero"
          fill
          style={{ objectFit: "cover", backgroundRepeat: "repeat" }}
          className="-z-50 h-full w-full"
        />
        <Container>konten</Container>
      </section> */}
    </>
  );
}
