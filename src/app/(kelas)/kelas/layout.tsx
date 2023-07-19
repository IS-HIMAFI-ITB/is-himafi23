import React from "react";

import Navbar from "@/components/layout/navbar";

export default function KelasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="bg-skyBackground min-h-screen">{children}</main>
    </>
  );
}
