"use client";

import "moment/locale/id";

import moment from "moment";
import { useSession } from "next-auth/react";
import React from "react";

import Container from "@/components/layout/container";
import Unauthenticated from "@/components/template/unauthenticated";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Submission, Tugas } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import SubmissionSection from "./(components)/submission-section";
import TugasSection from "./(components)/tugas-section";

export default function TugasPage({ params }: { params: { id: string } }) {
  moment.locale("id");
  const session = useSession();

  const tugas = useQuery<Tugas, Error>({
    queryKey: ["tugas", { id: params.id }],
    queryFn: async () => {
      const res = await fetch(`/api/tugas/${params.id}`);
      return res.json();
    },
  });
  const tugasSubmission = useQuery<Submission, Error>({
    queryKey: [
      "tugasSubmission",
      { tugasId: params.id, userId: session.data?.user.id },
    ],
    queryFn: async () => {
      const res = await fetch(
        `/api/submissions/${session.data?.user.id}/${params.id}`
      );
      return res.json();
    },
  });

  if (session.status === "unauthenticated") {
    return <Unauthenticated />;
  }

  if (tugas.isLoading || tugasSubmission.isLoading) {
    if (tugas.isLoading && tugasSubmission.isSuccess) {
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

          <SubmissionSection
            key={"loadingSubmission"}
            params={{ id: params.id }}
            tugas={tugas.data}
            tugasSubmission={tugasSubmission.data}
          />
        </Container>
      );
    }

    if (tugas.isSuccess && tugasSubmission.isLoading) {
      return (
        <Container className="py-12 grid gap-x-24 gap-y-12 lg:grid-cols-[65%_25%] grid-cols-1">
          <TugasSection key={"loadingTugas"} tugas={tugas.data} />
          <div className="sticky top-28 h-max flex flex-col gap-4">
            <Skeleton className="w-full h-8" />
            <div className="flex flex-row gap-4 items-center">
              <Skeleton className="w-[15ch] h-8" />
              <Skeleton className="w-[15ch] h-8" />
            </div>
            <p className="text-lg font-bold mt-4 -mb-2">
              File yang dikumpulkan
            </p>
            <Skeleton className="w-full h-16" />
            <p className="text-lg font-bold mt-4 -mb-2">Feedback grader</p>

            <Separator />
            <Skeleton className="w-full h-40" />
          </div>
        </Container>
      );
    }

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
          <p className="text-lg font-bold mt-4 -mb-2">File yang dikumpulkan</p>
          <Skeleton className="w-full h-16" />
          <p className="text-lg font-bold mt-4 -mb-2">Feedback grader</p>

          <Separator />
          <Skeleton className="w-full h-40" />
        </div>
      </Container>
    );
  }

  return (
    <Container className="pt-12 pb-24 grid gap-x-24 gap-y-12 lg:grid-cols-[65%_25%] grid-cols-1">
      <TugasSection tugas={tugas.data} />

      <SubmissionSection
        params={{ id: params.id }}
        tugas={tugas.data}
        tugasSubmission={tugasSubmission.data}
      />
    </Container>
  );
}
