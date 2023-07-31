"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarIcon,
  ClockIcon,
  FileEdit,
  LinkIcon,
} from "lucide-react";
import moment from "moment";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Role, Tugas } from "@prisma/client";

export default function TugasSection({ tugas }: { tugas: Tugas | undefined }) {
  const session = useSession();
  return (
    <motion.article
      className="prose lg:prose-lg dark:prose-invert"
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1.01],
        delay: 0,
      }}
    >
      <div className="flex flex-row gap-2 items-center">
        <Button variant={"outline"} className="no-underline" asChild>
          <Link href={`/kelas`}>
            <ArrowLeft className="mr-2" size={16} /> Kembali ke halaman kelas
          </Link>
        </Button>
        {!(session.data?.user.role === Role.PESERTA) && (
          <Button variant={"outline"} className="no-underline" asChild>
            <Link href={`/kelas/tugas/${tugas?.id}/edit`}>
              <FileEdit className="mr-2" size={16} /> Edit tugas
            </Link>
          </Button>
        )}
      </div>
      <h3 className="flex flex-row items-center gap-2">Tugas #{tugas?.id}</h3>

      <h1>{tugas?.title}</h1>

      <div className="not-prose -mt-4 flex flex-row flex-wrap items-center gap-4">
        <Badge
          variant={"secondary"}
          className="flex flex-row gap-1 items-center font-normal px-4"
        >
          <CalendarIcon className="mr-1" size={16} />

          <p className="hidden text-sm xs:inline">Deadline</p>

          <p className="text-sm">
            {moment(tugas?.dueDate).format("LL")} pukul{" "}
            {moment(tugas?.dueDate).format(
              `HH:mm ${
                moment(tugas?.dueDate).format("Z") === "+07:00"
                  ? "[WIB]"
                  : moment(tugas?.dueDate).format("Z") === "+08:00"
                  ? "[WITA]"
                  : `[GMT] ${moment(tugas?.updatedAt).format("Z")}`
              }`
            )}
          </p>
        </Badge>

        <Badge
          variant={"outline"}
          className="flex flex-row gap-2 items-center font-normal px-4"
        >
          <ClockIcon size={16} />{" "}
          <p className="text-sm">
            Updated{" "}
            {moment(tugas?.updatedAt).format(
              `DD-MM-YYYY, HH:mm ${
                moment(tugas?.updatedAt).format("Z") === "+07:00"
                  ? "[WIB]"
                  : moment(tugas?.updatedAt).format("Z") === "+08:00"
                  ? "[WITA]"
                  : `[GMT] ${moment(tugas?.updatedAt).format("Z")}`
              }`
            )}
          </p>
        </Badge>
      </div>

      <div
        className="my-6"
        dangerouslySetInnerHTML={{
          __html: tugas?.description ?? "Tidak ada deskripsi.",
        }}
      />

      <div className="not-prose flex flex-col gap-2 justify-start">
        <p className="font-bold">Attachments</p>
        <div className="flex flex-row flex-wrap gap-x-2 gap-y-3 text-base">
          {/* Bentuk data attachments adalah {link1}|{link2}|{link3} dst.
            Jadi di sini string dipisah berdasarkan karakter "|" dan karakter "|" tidak dimasukkan ke dalam array.
            Kemudian, bentuk url "https://" atau "http://" hanya diambil domain utamanya.
            Contoh "https://drive.google.com/..." hanya diambil "drive.google.com"*/}

          {!tugas?.attachments && <p>Tidak ada attachment.</p>}
          {tugas?.attachments
            ?.split("|")
            .filter((element) => (element === "|" ? null : element))
            .map((attachment, i) => (
              <a
                href={attachment.split("?judultugas=")[0]}
                key={i}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="px-5 py-4 w-max max-w-full flex flex-row gap-4 items-center group/download hover:cursor-pointer hover:border-primary">
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
      </div>
      <div className="mt-4 -mb-2">
        <p className="text-lg font-bold ">Feedback grader</p>

        <Separator className="-mt-4" />

        <p className="max-h-[200px] overflow-y-auto text-base">
          {tugasSubmission?.feedback ?? "Belum ada feedback."}
        </p>
        <Separator />
      </div>
      <div className="mt-4">
        {/*di disable ini kalau feedbacknya belum ada */}
        <CommentForm />
      </div>
    </motion.article>
  );
}
