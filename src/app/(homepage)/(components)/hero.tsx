"use client";

import Link from "next/link";
import React from "react";

import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <Container
      id="hero"
      className="min-h-[calc(100vh-77px)] h-max flex justify-center w-max"
    >
      <div className="flex flex-col justify-center gap-2">
        <div className="hidden md:flex flex-row w-full items-center">
          <p className="whitespace-nowrap text-white">
            Intellektuelle Schule HIMAFI ITB 2023
          </p>
          <hr className="fill-white ml-8 h-[2px] bg-white text-white w-full" />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white before:content-['COMING_SOON'] before:absolute before:ml-1 before:mt-1 before:md:ml-[6px] before:md:mt-[6px] before:text-accent before:-z-10 text-center text-4xl xs:text-5xl sm:text-6xl xl:text-8xl font-black tracking-tight">
            COMING{" "}
            <span className="before:content-['\_\_\_\_\_\_'] before:-z-20 before:hidden before:md:inline before:text-accent before:absolute before:-translate-y-2 before:translate-x-4 before:-rotate-3">
              SOON
            </span>
          </p>

          {/* Hanya muncul untuk mobile */}
          <span className="text-white text-center md:hidden font-normal text-sm tracking-normal">
            Intellektuelle Schule HIMAFI ITB 2023
          </span>
        </div>

        <div className="hidden md:flex flex-row w-full items-center">
          <hr className="fill-white mr-8 h-[2px] bg-white text-white w-full" />
          <p className="whitespace-nowrap text-white">
            Penerimaan anggota baru HIMAFI ITB 2023
          </p>
        </div>

        <Button
          className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-[98%] transition-transform"
          asChild
        >
          <Link href="/tugas">Pengumpulan kontrak belajar</Link>
        </Button>
      </div>
    </Container>
  );
}
