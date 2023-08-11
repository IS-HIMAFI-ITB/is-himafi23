"use client";

import React, { createContext } from "react";

import { Submission, Tugas } from "@prisma/client";

type TugasContextType = (Tugas & { submissions: Submission[] })[] | null;

export const TugasPesertaContext = createContext(null as TugasContextType);

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
