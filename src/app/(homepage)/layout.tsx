import Image from "next/image";
import React from "react";

import hero from "@/../public/images/sky.png";
import Navbar from "@/components/layout/navbar";

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="bg-skyBackground">{children}</main>
    </>
  );
}
