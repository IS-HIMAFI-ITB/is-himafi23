import React from "react";

import AnimateSection from "@/components/animate-section";
import Unauthenticated from "@/components/template/unauthenticated";
import { Separator } from "@/components/ui/separator";
import SubmissionDetailsProvider from "@/context/submission-details-provider";

import { CommentForm } from "./(comments)/comment-section";
import TugasComment from "./(comments)/tugas-comment";
import TugasNavigation from "./(navigation)/tugas-navigation";
import TugasAttachments from "./tugas-attachments";
import TugasDetails from "./tugas-details";

export default async function TugasSection({
  params,
}: {
  params: { id: string };
}) {
  return (
    <AnimateSection
      className="prose lg:prose-lg dark:prose-invert max-w-none w-full"
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1.01],
        delay: 0,
      }}
    >
      <TugasNavigation />

      <TugasDetails />

      <div className="not-prose flex flex-col gap-2 justify-start">
        <p className="font-bold">Attachments</p>
        <TugasAttachments />
      </div>

      <div className="mt-4 w-full">
        <p className="not-prose text-lg font-bold ">Comments</p>

        <Separator />

        <TugasComment />

        <Separator className="mb-4" />
      </div>

      <div className="mt-4 w-full">
        <CommentForm />
      </div>
    </AnimateSection>
  );
}
