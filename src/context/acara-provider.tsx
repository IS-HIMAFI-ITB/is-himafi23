"use client";

import React, { createContext } from "react";

import { QueryEvent } from "@/hooks/useEventQuery";

export const AcaraContext = createContext([[{}], [{}], [{}]] as QueryEvent[][]);

export default function AcaraProvider({
  events,
  children,
}: {
  events: QueryEvent[][];
  children: React.ReactNode;
}) {
  return (
    <AcaraContext.Provider value={events}>{children}</AcaraContext.Provider>
  );
}
