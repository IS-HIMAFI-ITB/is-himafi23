import React from "react";

import Navbar from "@/components/layout/navbar";

export default function KelasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar background="bg-skyBackgroundDim" />
      <main className="bg-skyBackgroundDim min-h-screen">{children}</main>
    </>
  );
}
