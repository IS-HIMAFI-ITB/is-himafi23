"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CalendarIcon, ClockIcon, LinkIcon } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tugas, Submission } from "@prisma/client";
import { CommentForm } from "../../../(components)/comment-section";
import { FeedbackForm } from "./feedback-section";

export default function TugasSectionNilai({
  tugas,
  tugasSubmission,
}: {
  tugas: Tugas | undefined;
  tugasSubmission: Submission | undefined;
}) {
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
      <Button variant={"outline"} className="mb-4 no-underline" asChild>
        <Link href={`/kelas`}>
          <ArrowLeft className="mr-2" size={16} /> Kembali ke halaman kelas
        </Link>
      </Button>
      <h3 className="flex flex-row items-center gap-2">Tugas #{tugas?.id}</h3>

      <h1>{tugas?.title}</h1>

      <div className="not-prose -mt-4 flex flex-row flex-wrap items-center gap-4">
        <Badge
          variant={"secondary"}
          className="flex flex-row gap-2 items-center font-normal px-4"
        >
          <CalendarIcon size={16} />

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

      <div className="mt-4 -mb-2">
        <p className="text-lg font-bold ">Feedback grader</p>

        <Separator className="-mt-4" />

        <p className="max-h-[200px] overflow-y-auto text-base">
          {tugasSubmission?.feedback ?? "Belum ada feedback."}
        </p>
        <Separator />
      </div>
      <div className="mt-4">
        <FeedbackForm />
      </div>
    </motion.article>
  );
}
