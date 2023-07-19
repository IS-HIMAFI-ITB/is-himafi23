"use client";

import Link from "next/link";
import React from "react";

import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/useToast";

export default function HeroSection() {
  const { toast } = useToast();
  return (
    <Container
      id="hero"
      className="min-h-[calc(100dvh-72.6px)] h-full flex justify-center w-max"
    >
      <div className="flex flex-col justify-center gap-2">
        <div className="hidden md:flex flex-row w-full items-center">
          <p className="whitespace-nowrap text-foreground">
            Intellektuelle Schule HIMAFI ITB 2023
          </p>
          <hr className="fill-foreground ml-8 h-[2px] bg-foreground text-foreground w-full xl:after:content-['✨'] after:absolute after:-mt-7 after:drop-shadow-glow after:rotate-12 after:ml-72 after:text-6xl after" />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-accent before:drop-shadow-glow before:content-['COMING_SOON'] before:absolute before:ml-1 before:mt-1 before:md:ml-[6px] before:md:mt-[6px] before:text-foreground before:z-10 text-center text-4xl xs:text-5xl sm:text-6xl xl:text-8xl font-black tracking-tight">
            COMING{" "}
            <span className="before:content-['\_\_\_\_\_\_'] before:hidden before:md:inline before:text-accent before:absolute before:-translate-y-2 before:translate-x-4 before:-rotate-3">
              SOON
            </span>
          </p>

          {/* Hanya muncul untuk mobile */}
          <span className="text-foreground text-center md:hidden font-normal text-sm tracking-normal">
            Intellektuelle Schule HIMAFI ITB 2023
          </span>
        </div>

        <div className="hidden md:flex flex-row w-full items-center">
          <hr className="fill-foreground mr-8 h-[2px] bg-foreground text-foreground w-full" />
          <p className="whitespace-nowrap text-foreground">
            Penerimaan anggota baru HIMAFI ITB 2023
          </p>
        </div>

        <Button
          className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-[98%] transition-transform"
          asChild
        >
          <Link href="/kelas">Pengumpulan kontrak belajar</Link>
        </Button>
      </div>
    </Container>
  );
}
