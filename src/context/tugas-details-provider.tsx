"use client";

import React, { createContext } from "react";

import { Tugas } from "@prisma/client";

export const TugasDetailsContext = createContext({} as Tugas);

export default function TugasDetailsProvider({
  tugas,
  children,
}: {
  tugas: Tugas;
  children: React.ReactNode;
}) {
  return (
    <TugasDetailsContext.Provider value={tugas}>
      {children}
    </TugasDetailsContext.Provider>
  );
}
