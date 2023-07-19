import React from "react";

import Navbar from "@/components/layout/navbar";

export default function TugasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="bg-skyBackground bg-opacity-50 min-h-screen">
        {children}
      </main>
    </>
  );
}
