import React from "react";

import { MotionDiv } from "@/components/animation/motion-element";
import { Reveal } from "@/components/animation/reveal";
import Container from "@/components/layout/container";
import Logo from "@/components/logo";
import { H1, P } from "@/components/typography";

import ConsoleLog from "./console-log";

export default function HeroSection() {
  return (
    <Container
      id="hero"
      className="min-h-[calc(100vh-72.6px-4rem)] h-full flex justify-center w-max"
    >
      <ConsoleLog />
      <MotionDiv
        className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <Reveal>
          <Logo width={150} height={150} className="flex md:hidden" />
          <Logo width={300} height={300} className="hidden md:flex" />
        </Reveal>
        <div className="flex flex-col items-center md:items-start">
          <Reveal variant="slide">
            <H1 className="relative text-center md:text-start before:content-['INTELLEKTUELLE'] before:absolute before:text-accent before:translate-x-0.5 before:-translate-y-0.5 before:-z-10 z-30 text-3xl min-[450px]:text-5xl lg:text-6xl ">
              INTELLEKTUELLE
            </H1>
          </Reveal>
          <Reveal variant="slide" className="w-fit ">
            <H1 className="relative text-center md:text-start before:content-['SCHULE'] before:absolute before:text-accent before:translate-x-0.5 before:-translate-y-0.5 before:-z-10 z-30 text-2xl min-[450px]:text-4xl lg:text-5xl">
              SCHULE
            </H1>
          </Reveal>
          <Reveal variant="slide" className="w-fit">
            <p className="relative text-center md:text-start before:content-['2023'] before:absolute before:text-accent before:translate-x-0.5 before:-translate-y-0.5 before:-z-10 z-30 text-xl font-semibold before:font-semibold w-full">
              2023
            </p>
          </Reveal>
          <hr className="fill-foreground h-[2px] bg-foreground text-foreground w-full xl:after:content-['✨'] after:absolute after:-mt-10 after:drop-shadow-glow after:rotate-12 after:ml-72 after:text-6xl mt-4" />
          <Reveal variant="slide" className="w-fit">
            <P className="font-semibold text-md min-[450px]:text-xl text-center mt-4">
              {`"Menyusur angkasa merajut asa"`}
            </P>
          </Reveal>
        </div>
      </MotionDiv>
    </Container>
  );
}
