"use client";

import { useSession } from "next-auth/react";
import React from "react";

import Container from "@/components/layout/container";
import Sidebar from "@/components/layout/sidebar";
import Loading from "@/components/template/loading";
import Unauthenticated from "@/components/template/unauthenticated";
import { H1 } from "@/components/typography";

import DashboardNavbar from "./(components)/dashboard-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  switch (status) {
    case "authenticated":
      break;
    case "loading":
      return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <H1 className="text-center">Loading...</H1>
        </div>
      );
    case "unauthenticated":
      return <Unauthenticated />;
  }

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex h-full">
        <Sidebar />
        <div className="w-full overflow-y-auto">
          <DashboardNavbar />
          <Container className="py-12">{children}</Container>
        </div>
      </div>
    </div>
  );
}
