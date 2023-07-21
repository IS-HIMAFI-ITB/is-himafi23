"use client";

import Link from "next/link";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/useToast";

const MotionButton = motion(Button);

export default function HeroSection() {
  const { toast } = useToast();
  console.log("hayo ngapain kamu inspect element");
  return (
    <Container
      id="hero"
      className="min-h-[calc(100dvh-72.6px)] h-full flex justify-center w-max"
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
  );
}
