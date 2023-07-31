import Image from "next/image";
import React from "react";

import hero from "@/../public/images/sky.png";
import Navbar from "@/components/layout/navbar";

export default function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
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
