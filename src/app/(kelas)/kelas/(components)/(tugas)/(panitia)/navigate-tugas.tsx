"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useContext } from "react";

import { H2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { TugasPanitiaContext } from "@/context/tugas-panitia-provider";
import { useTugasIndexStore } from "@/lib/store";
import { Tugas } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

async function getTugas() {
  const res = await fetch("/api/tugas");
  const data = await res.json();
  return data;
}

export default function NavigateTugas() {
  const { tugasIndex, setTugasIndex } = useTugasIndexStore();
  const initialData = useContext(TugasPanitiaContext);

  const tugas = useQuery<Tugas[], Error>({
    queryKey: ["tugas"],
    queryFn: () => getTugas(),
    refetchInterval: 1000 * 60 * 5, // 10 minutes
    initialData: initialData,
  });

  function handleChangeNextPage() {
    if (tugasIndex === tugas.data!.length - 1) return;

    setTugasIndex(tugasIndex + 1);
  }

  function handleChangePrevPage() {
    if (tugasIndex === 0) return;

    setTugasIndex(tugasIndex - 1);
  }

  function canNavigate() {
    return { next: tugasIndex < tugas.data!.length - 1, prev: tugasIndex > 0 };
  }

  if (tugas.isLoading) {
    return (
      <div className="flex md:flex-row flex-col justify-between items-center gap-y-5 gap-x-8">
        <H2 className="border-none w-full p-0 text-accent">Loading...</H2>
      </div>
    );
  }

  if (tugas.isError) {
    return (
      <div className="flex md:flex-row flex-col justify-between items-center gap-y-5 gap-x-8">
        <H2 className="border-none w-full p-0 text-accent">Error!</H2>
      </div>
    );
  }

  return (
    <div className="flex md:flex-row flex-col justify-between items-center gap-y-5 gap-x-8">
      <Link
        href={`/kelas/tugas/${tugas.data[tugasIndex].id}`}
        className="w-full md:drop-shadow-glow hover:underline underline-offset-2"
      >
        <H2 className="border-none w-full p-0 text-accent">
          {tugas.data[tugasIndex].title}
        </H2>
      </Link>

      <div className="flex flex-row gap-4 items-center w-full md:w-full justify-end">
        <Button
          variant={"outline"}
          className="md:inline-flex hidden"
          size={"icon"}
          disabled={!canNavigate().prev}
          onClick={handleChangePrevPage}
        >
          <ArrowLeft />
        </Button>

        <p className="md:block hidden">
          {tugasIndex + 1}/{tugas.data!.length}
        </p>

        <Button
          variant={"outline"}
          className="md:inline-flex hidden"
          size={"icon"}
          disabled={!canNavigate().next}
          onClick={handleChangeNextPage}
        >
          <ArrowRight />
        </Button>

        <Button
          variant={"outline"}
          disabled={!canNavigate().prev}
          className="md:hidden w-full"
          onClick={handleChangePrevPage}
        >
          <ArrowLeft className="mr-2" /> Previous
        </Button>

        <Button
          variant={"outline"}
          disabled={!canNavigate().next}
          className="md:hidden w-full"
          onClick={handleChangeNextPage}
        >
          Next <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
