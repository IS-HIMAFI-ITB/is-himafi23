import React from "react";

import {
  MotionDiv,
  MotionSection,
} from "@/components/animation/motion-element";
import { MotionParagraph } from "@/components/animation/motion-text";
import { Reveal } from "@/components/animation/reveal";
import Container from "@/components/layout/container";

import { misi } from "./misi";
import { VisiMisi } from "./visi-misi";

export default function VisiMisiSection() {
  return (
    <Container
      id="visi-misi"
      className="min-h-screen py-36 h-full flex justify-center"
    >
      <MotionSection className="w-full flex flex-col justify-center items-center">
        <Reveal variant="slide">
          <p className="before:content-['\_\_\_\_\_\_\_\_\_\_\_\_\_'] before:md:inline before:text-accent before:absolute before:-translate-y-2 text-[2.6rem] leading-[1] xs:text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight before:z-0 before:-rotate-2">
            <span className="rotate-10 translate-x-6 text-foreground relative">
              Visi dan Misi
            </span>
          </p>
        </Reveal>
        <Reveal variant="slide">
          <MotionParagraph className="mt-8 lg:text-xl text-base text-center md:max-w-none md:w-[700px]">
            “Intellektuelle Schule sebagai{" "}
            <span className="font-semibold">kontinum ruangwaktu</span> dalam
            pembudayaan kebijaksanaan dan intelektualitas melalui pergerakan
            menuju kesadaran.”
          </MotionParagraph>
        </Reveal>
        <MotionDiv>
          <Reveal variant="slide" className="overflow-visible">
            <VisiMisi className="w-[1000px] h-[200px] relative hidden lg:flex justify-center items-center" />
          </Reveal>
          <MotionDiv className="flex flex-col gap-4 lg:hidden">
            {misi.data.map((misi, index) => (
              <div
                className="flex flex-col items-center text-center mt-8 px-4 flex-auto"
                key={index}
              >
                <Reveal variant="slide">
                  <p className="text-sm xs:text-base sm:text-md font-semibold text-accent">
                    {misi.title}
                  </p>
                </Reveal>
                <Reveal variant="slide">
                  <p className="text-sm xs:text-base sm:text-md max-w-lg">
                    {misi.description}
                  </p>
                </Reveal>
              </div>
            ))}
          </MotionDiv>
        </MotionDiv>
      </MotionSection>
    </Container>
  );
}
