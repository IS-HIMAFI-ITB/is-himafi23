import Image from "next/image";
import Slider from "@/components/home-slider";
import hero from "@/../public/images/hero.png";
import Navbar from "@/components/layout/navbar";
import { prisma } from "@/prisma";
import { Contents } from "@prisma/client";

import HeroSection from "./(components)/hero";

export default async function Home() {
  const contents: Contents[] | undefined = await prisma.contents
    .findMany()
    .catch((err: Error) => undefined);

  return (
    <>
      <Navbar />
      <section
        id="hero-background"
        className="absolute w-full left-0 top-0 p-0 h-screen -z-50"
      >
        <Image
          src={hero}
          alt="hero"
          fill
          style={{ objectFit: "cover" }}
          className="relative"
        />
        <div className="absolute dark w-full h-full bg-gradient-to-t from-background to-transparent" />
        <div className="absolute w-full h-full bg-gradient-to-b from-background/30 to-transparent" />
        <div className="absolute dark w-full h-full bg-background/5" />
      </section>
      <HeroSection contents={contents} />
    </>
  );
}
