import React from "react";

import Navbar from "@/components/layout/navbar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="bg-timeMachineBackground">
        <div className="relative bg-gradient-to-t from-black from-80%">
          {children}
        </div>
      </main>
    </>
  );
}
