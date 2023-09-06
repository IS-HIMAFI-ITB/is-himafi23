import React from "react";

import { MotionDiv } from "@/components/animation/motion-element";
import { Reveal } from "@/components/animation/reveal";
import Container from "@/components/layout/container";

import { Dokumentasi } from "./dokumentasi";

export default function DokumentasiSection() {
  return (
    <Container
      id="galeri"
      className="min-h-screen py-36 h-full flex justify-center"
    >
      <MotionDiv className="w-full flex flex-col items-center">
        <Reveal variant="slide">
          <p className="before:content-['\_\_\_\_\_\_\_\_\_\_\_\_\_'] before:md:inline before:text-accent before:absolute before:-translate-y-2 text-[2.6rem] leading-[1] xs:text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight before:z-0 before:-rotate-2">
            <span className="rotate-10 translate-x-6 text-foreground relative">
              Dokumentasi
            </span>
          </p>
        </Reveal>

        <Dokumentasi className="lg:w-[1000px] h-[200px] relative flex justify-center items-center" />
      </MotionDiv>
    </Container>
  );
}
