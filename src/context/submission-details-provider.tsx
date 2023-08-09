"use client";

import React, { createContext } from "react";

import { Submission } from "@prisma/client";

export const SubmissionDetailsContext = createContext(
  undefined as Submission | undefined
);

export default function SubmissionDetailsProvider({
  submission,
  children,
}: {
  submission: Submission | undefined;
  children: React.ReactNode;
}) {
  return (
    <SubmissionDetailsContext.Provider value={submission}>
      {children}
    </SubmissionDetailsContext.Provider>
  );
}
