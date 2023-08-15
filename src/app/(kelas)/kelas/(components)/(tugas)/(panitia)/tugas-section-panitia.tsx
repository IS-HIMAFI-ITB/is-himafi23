import React from "react";

import AnimateSection from "@/components/animate-section";
import { H2 } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import PanitiaSubmissionDetailsProvider from "@/context/panitia-submission-details-provider";
import TugasPanitiaProvider from "@/context/tugas-panitia-provider";
import { prisma } from "@/prisma";

import DeleteTugas from "./delete-tugas";
import EditAndAddTugas from "./edit-and-add-tugas";
import NavigateTugas from "./navigate-tugas";
import TugasAttachments from "./tugas-attachments";
import TugasDetail from "./tugas-detail";
import TugasSubmissionDetail from "./tugas-submission-detail";

export default async function TugasSectionPanitia() {
  const tugas = await prisma.tugas.findMany({
    orderBy: {
      dueDate: "desc",
    },
  });

  const tugasSubmissionDetail = await prisma.submission.findMany({
    orderBy: {
      submittedAt: "desc",
    },
    include: {
      user: true,
      tugas: {
        select: {
          dueDate: true,
        },
      },
      feedback: {
        include: {
          author: {
            select: {
              name: true,
              nim: true,
            },
          },
        },
      },
    },
  });

  return (
    <TugasPanitiaProvider tugas={tugas}>
      <PanitiaSubmissionDetailsProvider submission={tugasSubmissionDetail}>
        <AnimateSection
          className="my-12"
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
            delay: 0,
          }}
        >
          <div className="flex flex-row justify-between items-center my-4 gap-x-8">
            <H2 className="text-xl sm:text-3xl xs:text-2xl border-none w-full before:content-['Tugas_Peserta'] before:absolute before:ml-[0.1rem] before:mt-[0.1rem] md:drop-shadow-glow before:text-accent before:-z-10">
              Tugas Peserta
            </H2>
            <div className="flex flex-row gap-2 items-center">
              <DeleteTugas />
              <EditAndAddTugas />
            </div>
          </div>

          <Separator className="mb-6" />

          <NavigateTugas />

          <TugasDetail />

          <TugasSubmissionDetail />
        </AnimateSection>
      </PanitiaSubmissionDetailsProvider>
    </TugasPanitiaProvider>
  );
}
