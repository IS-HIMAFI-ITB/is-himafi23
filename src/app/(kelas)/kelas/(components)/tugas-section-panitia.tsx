"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, PlusIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import { H2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getUser } from "@/lib/client-fetch";
import { Tugas, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import TugasSubmissionDetail from "./tugas-submission-detail";

async function getTugas() {
  const res = await fetch("/api/tugas");
  const data = await res.json();
  return data;
}

export default function TugasSectionPanitia() {
  const tugas = useQuery<Tugas[], Error>({
    queryKey: ["tugas"],
    queryFn: () => getTugas(),
    refetchInterval: 1000 * 60 * 10, // 10 minutes
  });
  const users = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: () => getUser(),
  });

  const [tugasIndex, setTugasIndex] = useState<number>(0);
  // if (tugas.status === "loading" || users.status === "loading")
  //   return <div>Loading...</div>;

  if (tugas.isLoading) {
    return (
      <>
        <div className="flex flex-row justify-between items-center my-4 gap-x-8">
          <H2 className="border-none w-full before:content-['Tugas_Peserta'] before:absolute before:ml-[0.1rem] before:mt-[0.1rem] drop-shadow-glow before:text-accent before:-z-10">
            Tugas Peserta
          </H2>
          <Button className="w-max md:w-full md:max-w-max" variant={"outline"}>
            <PlusIcon className="md:mr-2" />
            <span className="hidden md:inline">Tambah Tugas</span>
          </Button>
        </div>
        <Separator className="mb-6" />
        <Skeleton className="w-full h-12 mb-8" />
        <Skeleton className="w-full h-48" />
      </>
    );
  }

  if (tugas.isError)
    return (
      <>
        <div className="flex flex-row justify-between items-center my-4 gap-x-8">
          <H2 className="border-none w-full before:content-['Tugas_Peserta'] before:absolute before:ml-[0.1rem] before:mt-[0.1rem] drop-shadow-glow before:text-accent before:-z-10">
            Tugas Peserta
          </H2>
          <Button className="w-max md:w-full md:max-w-max" variant={"outline"}>
            <PlusIcon className="md:mr-2" />
            <span className="hidden md:inline">Tambah Tugas</span>
          </Button>
        </div>
        <Separator className="mb-6" />
        <div className="w-full text-center">
          <p className="text-foreground text-2xl font-semibold">
            Error! {tugas.error?.message}. Silakan refresh halaman ini.
          </p>
        </div>
      </>
    );

  function handleChangeNextPage() {
    if (tugasIndex === tugas.data!.length - 1) return;

    setTugasIndex((prev) => prev + 1);
  }

  function handleChangePrevPage() {
    if (tugasIndex === 0) return;

    setTugasIndex((prev) => prev - 1);
  }

  function canNavigate() {
    return { next: tugasIndex < tugas.data!.length - 1, prev: tugasIndex > 0 };
  }

  return (
    <motion.section
      className="my-12"
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1.01],
        delay: 0,
      }}
    >
      <div className="flex flex-row justify-between items-center my-4 gap-x-8">
        <H2 className="border-none w-full before:content-['Tugas_Peserta'] before:absolute before:ml-[0.1rem] before:mt-[0.1rem] drop-shadow-glow before:text-accent before:-z-10">
          Tugas Peserta
        </H2>
        <Button className="w-max md:w-full md:max-w-max" variant={"outline"}>
          <PlusIcon className="md:mr-2" />
          <span className="hidden md:inline">Tambah Tugas</span>
        </Button>
      </div>
      <Separator className="mb-6" />
      <div className="flex md:flex-row flex-col justify-between items-center gap-y-5 gap-x-8">
        <Link
          href={`/kelas/tugas/${tugas.data[tugasIndex].id}`}
          className="w-full drop-shadow-glow hover:underline underline-offset-2"
        >
          <H2 className="border-none w-full p-0 text-accent">
            {tugas.data[tugasIndex].title}
          </H2>
        </Link>
        <div className="flex flex-row gap-4 items-center w-full md:w-full justify-end">
          <Input
            placeholder="Cari tugas"
            className="hidden md:inline-flex md:max-w-lg"
          />
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
          >
            <ArrowLeft className="mr-2" /> Previous
          </Button>
          <Button
            variant={"outline"}
            disabled={!canNavigate().next}
            className="md:hidden w-full"
          >
            Next <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
      {users.isLoading && <div>Loading...</div>}
      {users.isError && <div>Error! {users.error.message}</div>}
      {users.isSuccess && (
        <TugasSubmissionDetail
          tugasId={tugasIndex + 1}
          tugas={tugas.data[tugasIndex]}
          users={users.data}
        />
      )}
    </motion.section>
  );
}
