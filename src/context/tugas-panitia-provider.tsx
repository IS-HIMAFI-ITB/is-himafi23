"use client";

import React, { createContext } from "react";

import { Tugas } from "@prisma/client";

export const TugasPanitiaContext = createContext([{}] as Tugas[]);

export default function TugasPanitiaProvider({
  tugas,
  children,
}: {
  tugas: Tugas[];
  children: React.ReactNode;
}) {
  return (
    <TugasPanitiaContext.Provider value={tugas}>
      {children}
    </TugasPanitiaContext.Provider>
  );
}
