"use client";

import "moment/locale/id";

import {
  CalendarIcon,
  ClockIcon,
  DownloadIcon,
  ExternalLink,
} from "lucide-react";
import moment from "moment";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import React, { useContext } from "react";

import AnimateSection from "@/components/animate-section";
import { H3, H4 } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SubmissionDetailsContext } from "@/context/submission-details-provider";
import { TugasDetailsContext } from "@/context/tugas-details-provider";
import UserProvider, { UserContext } from "@/context/user-provider";
import { formatDate, formatTime } from "@/lib/utils";
import { SubmissionQuery } from "@/types/query-type";
import { Role, Tugas } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import InputNilai from "./input-nilai";

export default function SubmissionSection() {
  const params = useParams();
  const initialTugasData = useContext(TugasDetailsContext);
  const initialSubmissionData = useContext(SubmissionDetailsContext);
  const user = useContext(UserContext);
  const session = useSession();

  if (!session) redirect("/login");
  if (session.data?.user.role === Role.PESERTA) redirect("/unauthorized");

  const { data: tugas } = useQuery<Tugas, Error>({
    queryKey: ["tugas", { id: params.id }],
    queryFn: async () => {
      const res = await fetch(`/api/tugas/${params.id}`);
      return res.json();
    },
    initialData: initialTugasData,
  });

  const { data: tugasSubmission } = useQuery<SubmissionQuery, Error>({
    queryKey: [
      "tugasSubmission",
      { tugasId: params.id, userId: params.userId },
    ],
    queryFn: async () => {
      const res = await fetch(`/api/submissions/${params.userId}/${params.id}`);
      return res.json();
    },
    initialData: initialSubmissionData,
  });

  return (
    <AnimateSection
      className="sticky top-28 h-max flex flex-col gap-4"
      // diganti karena ada overflow sebelumnya
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1.01],
        delay: 0.3,
      }}
    >
      <H4 className="text-primary -mb-3">{user?.name}</H4>
      <div className="flex flex-row gap-4">
        <H3>Nilai:</H3>

        <H3 className="text-accent">{tugasSubmission?.score ?? "???"}</H3>
      </div>

      <div className="flex flex-row flex-wrap gap-2 items-center">
        {(moment(tugasSubmission?.submittedAt).isAfter(
          moment(tugas?.dueDate)
        ) ||
          (!tugasSubmission && moment(tugas?.dueDate).isBefore())) && (
          <Badge className="w-max" variant={"destructive"}>
            Telat
          </Badge>
        )}

        {tugasSubmission ? (
          <>
            <Badge className="w-max">Sudah dikumpulkan</Badge>
            {tugasSubmission?.score === null ? (
              <Badge variant={"destructive"} className="w-max">
                Belum dinilai
              </Badge>
            ) : (
              <Badge variant={"secondary"} className="w-max">
                Sudah dinilai
              </Badge>
            )}
          </>
        ) : (
          <Badge variant={"destructive"} className="w-max">
            Belum dikumpulkan
          </Badge>
        )}
      </div>

      <p className="text-lg font-bold mt-4 -mb-2">Jawaban yang dikumpulkan</p>
      {tugasSubmission?.submittedAt && (
        <div className="flex flex-row flex-wrap gap-2 items-center">
          <p className="text-sm">Dikumpulkan </p>

          <div className="flex flex-row flex-wrap gap-1 items-center">
            <CalendarIcon className="xs:ml-2" size={12} />{" "}
            <p className="text-sm">
              {formatDate(tugasSubmission.submittedAt, "L")}
            </p>
          </div>

          <div className="flex flex-row flex-wrap gap-1 items-center">
            <ClockIcon className="ml-2" size={12} />

            <p className="text-sm">{formatTime(tugasSubmission.submittedAt)}</p>
          </div>
        </div>
      )}

      {!tugasSubmission?.files && (
        <p className="text-sm mt-4 -mb-2 text-destructive">
          File tidak tersedia
        </p>
      )}

      {tugasSubmission?.files && (
        <Link
          href={`https://uploadthing.com/f/${tugasSubmission.files}`}
          className="flex flex-row gap-6 items-center"
        >
          <Card className="py-4 px-6 group/fileSubmitted hover:cursor-pointer hover:border hover:border-primary hover:scale-105 transition-transform w-full max-w-full">
            <div className="flex flex-row gap-6 items-center w-full">
              <div>
                <DownloadIcon
                  size={32}
                  className="group-hover/fileSubmitted:text-primary shrink-0"
                />
              </div>

              <div className="flex flex-row gap-4 justify-between w-full overflow-hidden">
                <p className="font-semibold line-clamp-1 text-ellipsis">
                  {decodeURI(
                    tugasSubmission.files.split("_").slice(1).join("_")
                  )}
                </p>

                <Badge className="xs:inline hidden" variant={"outline"}>
                  .
                  {
                    // Ambil ekstensi file
                    tugasSubmission.files
                      .split("_")
                      .slice(1)
                      .join("_")
                      .split(".")[1]
                  }
                </Badge>
              </div>
            </div>
          </Card>
        </Link>
      )}

      {tugasSubmission?.links && (
        <>
          {tugasSubmission.links.split("|").map((link) => (
            <Card
              key={link}
              className="py-3 px-6 group/fileSubmitted hover:cursor-pointer hover:border hover:border-primary hover:scale-105 transition-transform"
            >
              <div className="flex flex-col gap-1">
                <Link
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row gap-6 items-center"
                >
                  <ExternalLink
                    size={24}
                    className="group-hover/fileSubmitted:text-primary shrink-0"
                  />
                  <p className="font-semibold line-clamp-1">{link}</p>
                </Link>
              </div>
            </Card>
          ))}
        </>
      )}

      {tugasSubmission ? <InputNilai /> : <p>Peserta tidak dapat dinilai</p>}
    </AnimateSection>
  );
}
