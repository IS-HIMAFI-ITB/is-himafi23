import "./kehadiran-card-style.css";

import { getServerSession } from "next-auth";
import React from "react";

import { H2 } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import AcaraProvider from "@/context/acara-provider";
import {
  getEventHadir,
  getEventIzin,
  getEventNoPresence,
} from "@/lib/server-fetch";

import DayList from "./(day-list)/day-list";
import DayDetails from "./(day_details)/day-details";
import PersentaseKehadiran from "./persentase-kehadiran";

export default async function KehadiranSection() {
  const session = await getServerSession();
  if (!session) return null;

  const hadir = await getEventHadir(session.user.nim);
  const izin = await getEventIzin(session.user.nim);
  const noPresence = await getEventNoPresence(session.user.nim);
  const initialData = [hadir, izin, noPresence];

  return (
    <AcaraProvider events={initialData}>
      <div className="flex flex-col gap-4 items-start md:order-first order-last max-h-[27rem]">
        {/* Elemen div ini bakal ada di bawah <DayDetails /> klo mobile (thus hidden bcs not needed) dan bakal muncul di atas klo desktop */}
        <div className="hidden md:flex flex-row gap-6 justify-between items-center w-full">
          <H2 className="border-none p-0 xs:text-3xl text-xl">Kehadiran</H2>

          <div className="flex flex-row gap-2 items-center">
            <p>Hadir</p>

            <PersentaseKehadiran />
          </div>
        </div>

        <Separator className="md:block hidden" />

        <div
          id="day-card-container"
          className="w-full max-h-full overflow-y-auto flex flex-col gap-2 items-start"
        >
          <DayList />
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-row gap-6 justify-between items-center w-full">
        {/* Ini bakal muncul di atas klo mobile */}
        <H2 className="border-none p-0 mb-0 xs:text-3xl text-xl">Kehadiran</H2>

        <div className="flex flex-row gap-2 items-center">
          <p>Hadir</p>

          <PersentaseKehadiran />
        </div>
      </div>

      <Separator className="md:hidden" />

      <DayDetails />
    </AcaraProvider>
  );
}
