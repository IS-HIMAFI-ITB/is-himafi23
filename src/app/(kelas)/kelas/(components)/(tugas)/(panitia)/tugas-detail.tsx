"use client";

import React, { useContext } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { TugasPanitiaContext } from "@/context/tugas-panitia-provider";
import { useTugasIndexStore } from "@/lib/store";
import { Tugas } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import TugasAttachments from "./tugas-attachments";

async function getTugas() {
  const res = await fetch("/api/tugas");
  const data = await res.json();
  return data;
}

export default function TugasDetail() {
  const { tugasIndex, setTugasIndex } = useTugasIndexStore();
  const initialData = useContext(TugasPanitiaContext);
  const tugas = useQuery<Tugas[], Error>({
    queryKey: ["tugas"],
    queryFn: () => getTugas(),
    refetchInterval: 1000 * 60 * 5, // 10 minutes
    initialData: initialData,
  });

  if (tugas.isLoading) {
    return <Skeleton className="w-full h-96" />;
  }

  if (tugas.isError) {
    return null;
  }

  return (
    <article className="prose prose-invert max-w-none w-full">
      <div
        dangerouslySetInnerHTML={{
          __html: tugas.data[tugasIndex].description as TrustedHTML,
        }}
      />

      {tugas.data! && (
        <TugasAttachments
          key={tugas.data[tugasIndex].id}
          tugas={tugas.data[tugasIndex]}
        />
      )}
    </article>
  );
}
