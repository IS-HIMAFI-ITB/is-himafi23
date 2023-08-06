"use client";

import React, { createContext } from "react";

import { Tugas } from "@prisma/client";

interface TugasContextType {
  tugasAssigned: Tugas[];
  tugasDone: Tugas[];
}

export const TugasPesertaContext = createContext({
  tugasAssigned: [],
  tugasDone: [],
} as TugasContextType);

export default function TugasPesertaProvider({
  tugas,
  children,
}: {
  tugas: TugasContextType;
  children: React.ReactNode;
}) {
  return (
    <TugasPesertaContext.Provider value={tugas}>
      {children}
    </TugasPesertaContext.Provider>
  );
}
