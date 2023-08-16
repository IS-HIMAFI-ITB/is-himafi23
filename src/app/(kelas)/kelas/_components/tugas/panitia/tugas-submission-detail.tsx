"use client";

import React, { useContext } from "react";

import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { PanitiaSubmissionDetails } from "@/context/panitia-submission-details-provider";
import { TugasPanitiaContext } from "@/context/tugas-panitia-provider";
import { useTugasIndexStore } from "@/lib/store";
import { SubmissionDetailQuery } from "@/types/query-type";
import { Tugas } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { columns } from "./submission-peserta-column";

async function getTugasSubmission(tugasId: number) {
  const res = await fetch(`/api/submissions/all-users/${tugasId.toString()}`);
  const data = await res.json();

  return data;
}

async function getTugas() {
  const res = await fetch("/api/tugas");
  const data = await res.json();
  return data;
}

export default function TugasSubmissionDetail() {
  const tugasData = useContext(TugasPanitiaContext);
  const initialSubmission = useContext(PanitiaSubmissionDetails);
  const { tugasIndex, setTugasIndex } = useTugasIndexStore();

  const tugas = useQuery<Tugas[], Error>({
    queryKey: ["tugas"],
    queryFn: () => getTugas(),
    refetchInterval: 1000 * 60 * 5, // 10 minutes
    initialData: tugasData,
  });

  const tugasId = tugas.data![tugasIndex].id;

  const submission = useQuery<SubmissionDetailQuery[], Error>({
    queryKey: ["tugasSubmission", { id: tugasId }],
    queryFn: () => getTugasSubmission(tugasId),
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    initialData: initialSubmission?.filter((s) => s.tugasId === tugasId),
  });

  return (
    <>
      {submission.status === "loading" && (
        <>
          <div className="mt-12 w-full flex gap-x-12 flex-row items-center justify-between">
            <Skeleton className="w-full md:w-1/2 h-8" />
            <Skeleton className="w-full md:w-[300px] h-8" />
          </div>
          <Skeleton className="mt-8 w-full h-96" />
        </>
      )}

      {submission.status === "error" && (
        <div>Error {submission.error.message}</div>
      )}

      {submission.status === "success" && (
        <DataTable
          fetching={submission.isFetching}
          lastFetchTime={submission.dataUpdatedAt}
          columns={columns}
          tugasId={tugasId}
          data={submission.data}
        />
      )}
    </>
  );
}
