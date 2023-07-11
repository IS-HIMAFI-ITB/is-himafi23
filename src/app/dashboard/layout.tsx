"use client";

import { useSession } from "next-auth/react";
import React from "react";

import Container from "@/components/layout/container";
import Sidebar from "@/components/layout/sidebar";
import Loading from "@/components/template/loading";
import Unauthenticated from "@/components/template/unauthenticated";

import DashboardNavbar from "./(components)/dashboard-navbar";

/**
 * @name DashboardLayout
 * @description Layout untuk dashboard. Layout ini akan menampilkan sidebar dan navbar di setiap halaman dashboard.
 * @example <DashboardLayout>...</DashboardLayout>
 */
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
      return <Loading />;
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
