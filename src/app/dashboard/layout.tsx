import React from "react";

import Container from "@/components/layout/container";
import Sidebar from "@/components/layout/sidebar";
import { H1 } from "@/components/typography";
import { Card } from "@/components/ui/card";

import DashboardNavbar from "./(components)/dashboard-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
