"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Edit3,
  MenuIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import { H2 } from "@/components/typography";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast/useToast";
import { Tugas } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";

import TugasAttachments from "./tugas-attachments";
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
    refetchInterval: 1000 * 60 * 5, // 10 minutes
  });
  const [tugasIndex, setTugasIndex] = useState<number>(0);
  const { toast } = useToast();

  const deleteTugas = useMutation({
    mutationKey: ["deleteTugas"],
    mutationFn: () => {
      if (!tugas.data) return Promise.reject("Tugas ID is undefined");

      return fetch(`/api/tugas/${tugas.data[tugasIndex].id}`, {
        method: "DELETE",
      });
    },
    onMutate: () => {
      toast({
        title: "Menghapus tugas...",
      });
    },
    onSuccess: () => {
      toast({
        title: "Tugas berhasil dihapus!",
      });

      tugas.refetch();
    },
    onSettled: () => {
      tugas.refetch();
    },
  });

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

  if (tugas.data.length === 0) return;
  if (tugas.data[tugasIndex] === undefined) return;

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
        <H2 className="text-xl sm:text-3xl xs:text-2xl border-none w-full before:content-['Tugas_Peserta'] before:absolute before:ml-[0.1rem] before:mt-[0.1rem] drop-shadow-glow before:text-accent before:-z-10">
          Tugas Peserta
        </H2>
        <div className="flex flex-row gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:cursor-pointer" asChild>
              <MenuIcon className="w-max shrink-0 mr-2" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0">
              <DropdownMenuItem className="hover:cursor-pointer" asChild>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant={"destructive"}
                      className="w-full"
                      onClick={() => console.log(tugas.data[tugasIndex].id)}
                    >
                      <TrashIcon className="w-max shrink-0 mr-2" size={16} />
                      Hapus
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      Apakah kamu yakin ingin menghapus tugas{" "}
                      {tugas.data[tugasIndex].title}?
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                      Tugas yang sudah dihapus tidak dapat dikembalikan, dan
                      akan menghapus semua data yang berkaitan dengan tugas ini.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        <Button variant={"outline"}>Batal</Button>
                      </AlertDialogCancel>
                      <AlertDialogAction>
                        <Button
                          variant={"destructive"}
                          onClick={() => deleteTugas.mutate()}
                        >
                          Hapus
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
        </div>
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

      <article className="prose prose-invert max-w-none w-full">
        <div
          dangerouslySetInnerHTML={{
            __html: tugas.data[tugasIndex].description as TrustedHTML,
          }}
        />

        {tugas.data && (
          <TugasAttachments
            key={tugas.data[tugasIndex].id}
            tugas={tugas.data[tugasIndex]}
          />
        )}
      </article>

      <TugasSubmissionDetail
        key={tugas.data[tugasIndex].id}
        tugasId={tugas.data[tugasIndex].id!}
      />
    </motion.section>
  );
}
