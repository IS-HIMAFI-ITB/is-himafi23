'use client';

import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import React from 'react';

export default function AuthProvider({
  children,
  ...props
}: SessionProviderProps) {
  return <SessionProvider {...props}>{children}</SessionProvider>;
}
