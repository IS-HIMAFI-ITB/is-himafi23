"use client";

import { useSession } from "next-auth/react";
import React from "react";

import Container from "@/components/layout/container";
import Unauthenticated from "@/components/template/unauthenticated";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Role, Tugas } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import CreateTugas from "../../create/(components)/create-tugas";
import EditTugas from "./(components)/edit-tugas";

export default function EditTugasPage({ params }: { params: { id: string } }) {
  const session = useSession();
  const tugas = useQuery<Tugas, Error>({
    queryKey: ["tugas", { id: params.id }],
    queryFn: () => {
      return fetch(`/api/tugas/${params.id}`).then((res) => res.json());
    },
  });

  if (!session || session.data?.user.role === Role.PESERTA || tugas.isError) {
    return <Unauthenticated />;
  }
  if (tugas.isLoading) {
    return (
      <Container className="py-12 grid gap-x-24 gap-y-12 lg:grid-cols-[65%_25%] grid-cols-1">
        <article className="prose lg:prose-lg dark:prose-invert">
          <h3 className="flex flex-row items-center gap-2">
            Tugas #{params.id}
          </h3>

          <div className="flex flex-col gap-4">
            <Skeleton className="min-w-[200px] w-full h-12" />
            <div className="not-prose mt-4 flex flex-row flex-wrap items-center gap-4">
              <Skeleton className="w-[300px] h-8" />
              <Skeleton className="w-[300px] h-8" />
            </div>
            <Skeleton className="w-full h-80" />
            <Skeleton className="w-[20ch] h-8" />
          </div>
        </article>

        <div className="sticky top-28 h-max flex flex-col gap-4">
          <Skeleton className="w-full h-8" />
          <div className="flex flex-row gap-4 items-center">
            <Skeleton className="w-[15ch] h-8" />
            <Skeleton className="w-[15ch] h-8" />
          </div>
          <Skeleton className="w-full h-8 mt-4 -mb-2" />
          <Skeleton className="w-full h-16" />
          <Skeleton className="w-full h-8 mt-4 -mb-2" />

          <Separator />
          <Skeleton className="w-full h-40" />
        </div>
      </Container>
    );
  }

  return <EditTugas tugas={tugas.data} params={{ id: params.id }} />;
}
