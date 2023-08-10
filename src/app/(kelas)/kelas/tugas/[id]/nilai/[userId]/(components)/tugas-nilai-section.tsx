import React from "react";

import AnimateSection from "@/components/animate-section";
import { Separator } from "@/components/ui/separator";

import { FeedbackForm } from "./(feedback)/feedback-form";
import FeedbackSection from "./(feedback)/feedback-section";
import TugasNavigation from "./(navigation)/tugas-navigation";
import TugasAttachments from "./tugas-attachments";
import TugasDetails from "./tugas-details";

export default async function TugasSection() {
  return (
    <AnimateSection
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
      <TugasNavigation />

      <TugasDetails />

      <div className="not-prose flex flex-col gap-2 justify-start mt-4">
        <p className="font-bold">Attachments</p>
        <TugasAttachments />
      </div>

      <div className="mt-4">
        <p className="text-lg font-bold mb-2">Feedback grader</p>

        <Separator />

        <FeedbackSection />

        <Separator />
      </div>

      <div className="mt-4">
        <FeedbackForm />
      </div>
    </AnimateSection>
  );
}
