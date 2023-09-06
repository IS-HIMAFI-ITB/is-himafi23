"use client";

import { Edit3, PlusIcon } from "lucide-react";
import Link from "next/link";
import React, { useContext } from "react";

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

export default function EditAndAddTugas() {
  const { tugasIndex, setTugasIndex } = useTugasIndexStore();
  const initialData = useContext(TugasPanitiaContext);

  const tugas = useQuery<Tugas[], Error>({
    queryKey: ["tugas"],
    queryFn: () => getTugas(),
    refetchInterval: 1000 * 60 * 5, // 10 minutes
    initialData: initialData,
  });

  if (tugas.isLoading) {
    return (
      <>
        <Button disabled className="px-4" size={"icon"} variant={"outline"}>
          <Edit3 className="w-max shrink-0" size={16} />
        </Button>
        <Button
          className="w-max md:w-full md:max-w-max"
          variant={"outline"}
          asChild
        >
          <Link href={"/kelas/tugas/create"}>
            <PlusIcon className="md:mr-2" />

            <span className="hidden md:inline whitespace-nowrap">
              Tambah Tugas
            </span>
          </Link>
        </Button>
      </>
    );
  }

  if (tugas.isError) {
    return null;
  }

  return (
    <>
      <Button className="px-4" size={"icon"} variant={"outline"} asChild>
        <Link href={`/kelas/tugas/${tugas.data[tugasIndex].id}/edit`}>
          <Edit3 className="w-max shrink-0" size={16} />
        </Link>
      </Button>

      <Button
        className="w-max md:w-full md:max-w-max"
        variant={"outline"}
        asChild
      >
        <Link href={"/kelas/tugas/create"}>
          <PlusIcon className="md:mr-2" />

          <span className="hidden md:inline whitespace-nowrap">
            Tambah Tugas
          </span>
        </Link>
      </Button>
    </>
  );
}
