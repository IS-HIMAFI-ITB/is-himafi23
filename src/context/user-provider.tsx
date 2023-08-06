"use client";

import React, { createContext } from "react";

import { User } from "@prisma/client";

export const UserContext = createContext({} as User);

export default function UserProvider({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
