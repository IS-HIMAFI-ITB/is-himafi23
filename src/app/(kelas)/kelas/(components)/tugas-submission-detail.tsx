"use client";

import { LinkIcon } from "lucide-react";
import React from "react";

import { DataTable } from "@/components/data-table";
import { Card } from "@/components/ui/card";
import { Submission, Tugas, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { columns } from "./submission-peserta-column";

async function getTugasSubmission(tugasId: number) {
  const res = await fetch(`/api/submissions/all-users/${tugasId.toString()}`);
  const data = await res.json();

  return data;
}

interface TugasSubmissionDetailProps extends Submission {
  user: User;
  tugas: {
    dueDate: Date;
  };
}

export default function TugasSubmissionDetail({
  tugasId,
  tugas,
  users,
}: {
  tugasId: number;
  tugas: Tugas;
  users: User[];
}) {
  const submission = useQuery<TugasSubmissionDetailProps[], Error>({
    queryKey: ["tugasSubmission"],
    queryFn: () => getTugasSubmission(tugasId),
    refetchInterval: 1000 * 60 * 10, // 10 minutes
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
  });

  if (submission.status === "loading") return <div>Loading...</div>;
  if (submission.status === "error") return <div>Error...</div>;

  return (
    <>
      <article className="prose prose-invert max-w-none w-full">
        <div dangerouslySetInnerHTML={{ __html: tugas.description }} />
        <div className="not-prose w-full flex flex-row flex-wrap items-center gap-4">
          {tugas?.attachments
            ?.split("|")
            .filter((element) => (element === "|" ? null : element))
            .map((attachment, i) => (
              <a
                href={attachment.split("?judultugas=")[0]}
                key={tugas?.id}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="px-5 py-4 w-max flex flex-row gap-4 items-center group/download hover:cursor-pointer hover:border-primary">
                  <LinkIcon
                    className="group-hover/download:text-primary"
                    size={24}
                  />
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold line-clamp-1">
                      {attachment.split("?judultugas=")[1]}
                    </p>
                    <p className="text-sm opacity-50 overflow-hidden line-clamp-1">
                      {
                        attachment
                          .replace("https://", "")
                          .replace("http://", "")
                          .split("?judultugas=")[0]
                          .split("/")[0]
                      }
                    </p>
                  </div>
                </Card>
              </a>
            ))}
        </div>
      </article>
      <DataTable columns={columns} data={submission.data} />
    </>
  );
}
