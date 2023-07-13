"use client";

import { ChevronRight } from "lucide-react";
import React from "react";

import Container from "@/components/layout/container";
import { H1, LargeParagraph } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getContents } from "@/lib/client-fetch";
import { Contents } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function HeroSection({
  contents,
}: {
  contents: Contents[] | undefined;
}) {
  const { data, isLoading, isError } = useQuery<Contents[], Error>({
    queryKey: ["contents"],
    queryFn: getContents,
    initialData: contents,
  });

  if (data === undefined) return null;

  const heroTitle = data.find((content) => content.name === "hero-title");
  const heroParagraph = data.find(
    (content) => content.name === "hero-paragraph"
  );

  if (isLoading) {
    return (
      <section id="hero" className="relative w-full h-full py-12">
        <Container className="flex flex-col gap-6 px-24 justify-start items-center h-full">
          <Skeleton className="w-3/4 h-16" />
          <Skeleton className="w-1/2 h-16" />
        </Container>
      </section>
    );
  }

  if (isError) return null;

  return (
    <section id="hero" className="relative w-full h-full py-24">
      <Container className="flex flex-col px-24 justify-center items-center h-full">
        {/* <H1 className="text-center">{heroTitle?.content}</H1> */}
        {/* <P className="sm:block hidden max-w-2xl text-center opacity-70">
          {heroParagraph?.content}
        </P> */}
        <H1 className="before:absolute before:lg:top-16 before:md:top-20 before:top-[5.4rem] hover:before:translate-x-64 before:transition-all before:ease-out before:content-['-'] before:font-normal text-4xl sm:text-5xl lg:text-7xl italic mb-2">
          COMING SOON
        </H1>
        <LargeParagraph className="lg:text-lg md:text-base text-sm tracking-wide font-light mb-4">
          Intellektuelle Schule HIMAFI ITB 2023
        </LargeParagraph>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full max-w-[15rem] md:max-w-[20rem] group">
          Kontrak belajar{" "}
          <ChevronRight className="ml-2 group-hover:translate-x-2 transition ease-out" />
        </Button>
      </Container>
    </section>
  );
}
