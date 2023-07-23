"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React from "react";

import Container from "@/components/layout/container";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/useToast";

import { misi } from "./misi";
import { VisiMisi } from "./visi-misi";

const MotionButton = motion(Button);

export default function HeroSection() {
  const { toast } = useToast();
  console.log("hayo ngapain kamu inspect element");
  return (
    <>
      {/*Coming Soon */}
      <Container
        id="hero"
        className="min-h-[calc(100vh-72.6px)] h-full flex justify-center w-max"
      >
        <AnimatePresence>
          <motion.div
            className="flex flex-col justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{
              duration: 0.8,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <motion.div
              className="hidden md:flex flex-row w-full items-center"
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <p className="whitespace-nowrap text-foreground">
                Intellektuelle Schule HIMAFI ITB 2023
              </p>
              <hr className="fill-foreground ml-8 h-[2px] bg-foreground text-foreground w-full xl:after:content-['✨'] after:absolute after:-mt-7 after:drop-shadow-glow after:rotate-12 after:ml-72 after:text-6xl after" />
            </motion.div>

            <div className="flex flex-col gap-2">
              <motion.p
                className="text-accent before:drop-shadow-glow before:content-['COMING_SOON'] before:absolute before:ml-1 before:mt-1 before:md:ml-[6px] before:md:mt-[6px] before:text-foreground before:z-10 before:overflow-hidden before:whitespace-nowrap text-center text-4xl xs:text-5xl sm:text-6xl xl:text-8xl font-black tracking-tight"
                initial={{ opacity: 0, x: 400 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.78,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                COMING{" "}
                <span className="before:content-['\_\_\_\_\_\_'] before:hidden before:md:inline before:text-accent before:absolute before:-translate-y-2 before:translate-x-4 before:-rotate-3">
                  SOON
                </span>
              </motion.p>

              {/* Hanya muncul untuk mobile */}
              <motion.span
                className="text-foreground text-center md:hidden font-normal text-sm tracking-normal"
                initial={{ opacity: 0, y: 200 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                Intellektuelle Schule HIMAFI ITB 2023
              </motion.span>
            </div>

            <motion.div
              className="hidden md:flex flex-row w-full items-center"
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <hr className="fill-foreground mr-8 h-[2px] bg-foreground text-foreground w-full" />
              <p className="whitespace-nowrap text-foreground">
                Penerimaan anggota baru HIMAFI ITB 2023
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 1,
                ease: [0, 0.71, 0.2, 1.01],
                type: "spring",
              }}
              className="flex justify-center mt-4 rounded-md hover:scale-[98%]"
            >
              <MotionButton
                className=" w-full bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-[98%] transition-transform"
                asChild
              >
                <Link href="/kelas">Pengumpulan kontrak belajar</Link>
              </MotionButton>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </Container>

      {/*Visi Misi */}
      <Container
        id="hero"
        className="min-h-screen py-36 h-full flex justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="w-full flex flex-col justify-center items-center"
        >
          <p className="before:content-['\_\_\_\_\_\_\_\_\_\_\_\_\_'] before:md:inline before:text-accent before:absolute before:-translate-y-2 text-[2.6rem] leading-[1] xs:text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight before:z-0 before:-rotate-2">
            <span className="rotate-10 translate-x-6 text-foreground relative">
              Visi dan Misi
            </span>
          </p>
          <motion.p
            className="mt-8 lg:text-xl text-base text-center md:max-w-none md:w-[700px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            “Intellektuelle Schule sebagai{" "}
            <span className="font-semibold">kontinum ruangwaktu</span> dalam
            pembudayaan kebijaksanaan dan intelektualitas melalui pergerakan
            menuju kesadaran.”
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <VisiMisi className="w-[1000px] h-[200px] relative hidden lg:flex justify-center items-center" />
            <motion.div className="flex flex-col gap-4 lg:hidden">
              {misi.data.map((misi, index) => (
                <div
                  className="flex flex-col items-center text-center mt-8 px-4 flex-auto"
                  key={index}
                >
                  <p className="text-sm xs:text-base sm:text-md font-semibold text-accent">
                    {misi.title}
                  </p>
                  <p className="text-sm xs:text-base sm:text-md max-w-lg">
                    {misi.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </>
  );
}
