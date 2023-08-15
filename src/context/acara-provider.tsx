"use client";

import React, { createContext } from "react";

import { QueryEvent } from "@/hooks/useEventQuery";

export const AcaraContext = createContext(
  undefined as QueryEvent[][] | undefined
);

export default function AcaraProvider({
  events,
  children,
}: {
  events: QueryEvent[][] | undefined;
  children: React.ReactNode;
}) {
  return (
    <AcaraContext.Provider value={events}>{children}</AcaraContext.Provider>
  );
}
