"use client";

import { motion } from "framer-motion";
import React from "react";

import { Reveal } from "@/components/animation/reveal";
import Container from "@/components/layout/container";
import Logo from "@/components/logo";
import { H1, P } from "@/components/typography";

import { Dokumentasi } from "./image-slider";
import { misi } from "./misi";
import Timeline from "./timeline";
import { VisiMisi } from "./visi-misi";

export default function HeroSection() {
  console.log("hayo ngapain kamu inspect element");
  return (
    <>
      {/*Coming Soon */}
      <Container
        id="hero"
        className="min-h-[calc(100vh-72.6px-4rem)] h-full flex justify-center w-max"
      >
        <motion.div
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
        </motion.div>
      </Container>

      {/*Visi Misi */}
      <Container
        id="visi-misi"
        className="min-h-screen py-36 h-full flex justify-center"
      >
        <motion.div className="w-full flex flex-col justify-center items-center">
          <Reveal variant="slide">
            <p className="before:content-['\_\_\_\_\_\_\_\_\_\_\_\_\_'] before:md:inline before:text-accent before:absolute before:-translate-y-2 text-[2.6rem] leading-[1] xs:text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight before:z-0 before:-rotate-2">
              <span className="rotate-10 translate-x-6 text-foreground relative">
                Visi dan Misi
              </span>
            </p>
          </Reveal>
          <Reveal variant="slide">
            <motion.p className="mt-8 lg:text-xl text-base text-center md:max-w-none md:w-[700px]">
              “Intellektuelle Schule sebagai{" "}
              <span className="font-semibold">kontinum ruangwaktu</span> dalam
              pembudayaan kebijaksanaan dan intelektualitas melalui pergerakan
              menuju kesadaran.”
            </motion.p>
          </Reveal>
          <motion.div>
            <Reveal variant="slide" className="overflow-visible">
              <VisiMisi className="w-[1000px] h-[200px] relative hidden lg:flex justify-center items-center" />
            </Reveal>
            <motion.div className="flex flex-col gap-4 lg:hidden">
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
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      <Container
        id="dokumentasi"
        className="min-h-screen py-36 h-full flex justify-center"
      >
        <motion.div className="w-full flex flex-col items-center">
          <Reveal variant="slide">
            <p className="before:content-['\_\_\_\_\_\_\_\_\_\_\_\_\_'] before:md:inline before:text-accent before:absolute before:-translate-y-2 text-[2.6rem] leading-[1] xs:text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight before:z-0 before:-rotate-2">
              <span className="rotate-10 translate-x-6 text-foreground relative">
                Dokumentasi
              </span>
            </p>
          </Reveal>

          <Dokumentasi className="lg:w-[1000px] h-[200px] relative flex justify-center items-center" />
        </motion.div>
      </Container>

      {/*Timeline Posts */}
      <Container
        id="hero"
        className="min-h-[calc(100vh-72.6px-4rem)] h-full flex justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <Timeline />
        </motion.div>
      </Container>
    </>
  );
}
