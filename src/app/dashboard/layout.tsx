import React from "react";

import Sidebar from "@/components/layout/sidebar";

import DashboardNavbar from "./(components)/dashboard-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-row w-full h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <DashboardNavbar />
        {children}
      </div>
    </section>
  );
}
