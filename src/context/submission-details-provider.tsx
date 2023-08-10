"use client";

import React, { createContext } from "react";

import { SubmissionQuery } from "@/types/query-type";

export const SubmissionDetailsContext = createContext<
  SubmissionQuery | undefined
>(undefined);

export default function SubmissionDetailsProvider({
  submission,
  children,
}: {
  submission: SubmissionQuery;
  children: React.ReactNode;
}) {
  return (
    <SubmissionDetailsContext.Provider value={submission}>
      {children}
    </SubmissionDetailsContext.Provider>
  );
}
