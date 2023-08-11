"use client";

import React, { createContext } from "react";

import { TugasQuery } from "@/types/query-type";

export const TugasDetailsContext = createContext<TugasQuery>({} as TugasQuery);

export default function TugasDetailsProvider({
  tugas,
  children,
}: {
  tugas: TugasQuery;
  children: React.ReactNode;
}) {
  return (
    <TugasDetailsContext.Provider value={tugas}>
      {children}
    </TugasDetailsContext.Provider>
  );
}
