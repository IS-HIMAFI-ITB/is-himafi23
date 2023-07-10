"use client";

import React from "react";

import Container from "@/components/layout/container";
import { H1, P } from "@/components/typography";
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
    <section id="hero" className="relative w-full h-full py-12">
      <Container className="flex flex-col px-24 justify-start items-center h-full">
        <H1 className="text-center">{heroTitle?.content}</H1>
        <P className="sm:block hidden max-w-2xl text-center opacity-70">
          {heroParagraph?.content}
        </P>
      </Container>
    </section>
  );
}
