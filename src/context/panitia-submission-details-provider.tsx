"use client";

import React, { createContext } from "react";

import { SubmissionDetailQuery } from "@/types/query-type";

export const PanitiaSubmissionDetails = createContext<
  SubmissionDetailQuery[] | undefined
>(undefined);

export default function PanitiaSubmissionDetailsProvider({
  submission,
  children,
}: {
  submission: SubmissionDetailQuery[];
  children: React.ReactNode;
}) {
  return (
    <PanitiaSubmissionDetails.Provider value={submission}>
      {children}
    </PanitiaSubmissionDetails.Provider>
  );
}
