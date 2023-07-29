"use client";

import Container from "@/components/layout/container";
import TugasSectionNilai from "./(components)/tugas-nilai-section";
import SubmissionSectionNilai from "./(components)/submission-nilai-section";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Tugas, Submission, User } from "@prisma/client";
import Unauthenticated from "@/components/template/unauthenticated";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";
import { getUser } from "@/lib/client-fetch";

export default function NilaiPage({
  params,
}: {
  params: { id: string; nim: number };
}) {
  const session = useSession();
  const user = useQuery<User[], Error>({
    queryKey: ["users", params.nim],
    queryFn: async () => await getUser(params.nim),
    refetchInterval: 1000 * 60 * 60, // 1 hour
  });

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
      { tugasId: params.id, userId: user.data?.[0].id },
    ],
    queryFn: async () => {
      const res = await fetch(
        `/api/submissions/${user.data?.[0].id}/${params.id}`
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

              <Skeleton className="w-[20ch] h-8" />
            </div>
            <p className="text-lg font-bold mt-4 -mb-2">Feedback grader</p>

            <Skeleton className="w-full h-40" />
          </article>

          <SubmissionSectionNilai
            key={"loadingSubmission"}
            params={{ id: params.id }}
            tugas={tugas.data}
            tugasSubmission={tugasSubmission.data}
            user={user.data?.[0]}
          />
        </Container>
      );
    }

    if (tugas.isSuccess && tugasSubmission.isLoading) {
      return (
        <Container className="py-12 grid gap-x-24 gap-y-12 lg:grid-cols-[65%_25%] grid-cols-1">
          <TugasSectionNilai
            key={"loadingTugas"}
            tugas={tugas.data}
            tugasSubmission={tugasSubmission.data}
          />
          <div className="sticky top-28 h-max flex flex-col gap-4">
            <Skeleton className="w-full h-8" />
            <div className="flex flex-row gap-4 items-center">
              <Skeleton className="w-[15ch] h-8" />
              <Skeleton className="w-[15ch] h-8" />
            </div>

            <Skeleton className="w-full h-16" />
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

            <Skeleton className="w-[20ch] h-8" />
          </div>
          <p className="text-lg font-bold mt-4 -mb-2">Feedback grader</p>

          <Skeleton className="w-full h-40" />
        </article>

        <div className="sticky top-28 h-max flex flex-col gap-4">
          <Skeleton className="w-full h-8" />
          <div className="flex flex-row gap-4 items-center">
            <Skeleton className="w-[15ch] h-8" />
            <Skeleton className="w-[15ch] h-8" />
          </div>

          <Skeleton className="w-full h-16" />
        </div>
      </Container>
    );
  }

  if (tugas.isError || tugasSubmission.isError || tugas.data === null) {
    return notFound();
  }

  return (
    <Container className="pt-12 pb-24 grid gap-x-24 gap-y-12 lg:grid-cols-[65%_25%] grid-cols-1">
      <TugasSectionNilai
        tugas={tugas.data}
        tugasSubmission={tugasSubmission.data}
      />
      <SubmissionSectionNilai
        params={{ id: params.id }}
        tugas={tugas.data}
        tugasSubmission={tugasSubmission.data}
        user={user.data?.[0]}
      />
    </Container>
  );
}
