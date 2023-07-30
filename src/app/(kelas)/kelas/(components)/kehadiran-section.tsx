"use client";

import "./kehadiran-card-style.css";

import { ExternalLink, Loader2Icon } from "lucide-react";
import moment from "moment";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { useState } from "react";

import { H2 } from "@/components/typography";
import { Alert } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast/useToast";
import { Event, Izin, User } from "@prisma/client";
import { useQueries, UseQueryOptions } from "@tanstack/react-query";

import DayCard from "./day-card";
import PerizinanForm from "./perizinan-form";
import PresensiForm from "./presensi-form";

type QueryEvent = Event & { izin: Izin[]; users: User[] };

export default function KehadiranSection() {
  const session = useSession();
  const { toast } = useToast();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [openPresensiDialog, setOpenPresensiDialog] = useState<boolean>(false);
  const events = useQueries({
    queries: ["hadir", "izin", "no-presence"].map<
      UseQueryOptions<QueryEvent[], Error>
    >((status) => {
      return {
        queryKey: ["events", status, { userId: session.data?.user.id }],
        queryFn: () =>
          fetch(`/api/event/users/${session.data?.user.nim}/${status}`).then(
            (res) => res.json()
          ),
      };
    }),
  });

  if (events[0].isError || events[1].isError || events[2].isError) {
    return notFound();
  }

  if (events[0].isLoading || events[1].isLoading || events[2].isLoading) {
    return (
      <>
        <div className="flex flex-col gap-4 items-start md:order-first order-last max-h-72">
          <div className="flex flex-row gap-6 justify-between items-center w-full">
            <H2 className="border-none p-0 xs:text-3xl text-xl">Kehadiran</H2>
            <div className="flex flex-row gap-2 items-center">
              <p>Hadir</p>
              <Badge variant={"default"}>
                <Loader2Icon className="animate-spin inline mr-1" size={16} />%
                / <Loader2Icon className="animate-spin inline mx-1" size={16} />
                %
              </Badge>
            </div>
          </div>
          <Separator />
          <div
            id="day-card-container"
            className="w-full max-h-full overflow-y-auto flex flex-col gap-2 items-start"
          >
            <Skeleton className="w-full h-20" />
          </div>
        </div>
        <Alert className="px-12 py-8 bg-card/30 border-primary/10 backdrop-blur h-full w-full">
          <div className="prose prose-invert prose-sm md:prose-base pb-2">
            <Skeleton className="w-full h-8" />
          </div>

          <div
            id="prose-alert-info-kelas"
            className="prose prose-invert prose-sm md:prose-base max-h-48 md:max-h-48 overflow-y-auto"
          >
            <Skeleton className="w-full h-16" />
          </div>
        </Alert>
      </>
    );
  }

  const jumlahEvent =
    (events[0].data?.length ?? 0) +
    (events[1].data?.length ?? 0) +
    (events[2].data?.length ?? 0);
  const jumlahIzin =
    events[1].data?.filter((event) => event.izin[0].status === "DITERIMA")
      .length ?? 0;
  const jumlahHadir = events[0].data?.length ?? 0;
  const jumlahTidakHadir =
    (events[2].data?.length ?? 0) +
    (events[1].data?.filter((event) => !(event.izin[0].status === "DITERIMA"))
      .length ?? 0);
  const jumlahKehadiranDenganIzin = jumlahHadir + jumlahIzin;
  const jumlahKehadiranTanpaIzin = jumlahHadir;
  const persentaseKehadiranAbsolut =
    jumlahEvent !== 0
      ? ((jumlahKehadiranTanpaIzin / jumlahEvent) * 100).toFixed(1)
      : 0;
  const persentaseKehadiranRelatif =
    jumlahEvent !== 0
      ? ((jumlahKehadiranDenganIzin / jumlahEvent) * 100).toFixed(1)
      : 0;

  const elements = [] as { status: string; data: QueryEvent }[];
  events.forEach((event, i) => {
    if (event.data) {
      // Status hadir
      if (i === 0) {
        event.data.forEach((event) => {
          elements.push({ status: "hadir", data: event });
        });
      }

      // Status izin
      if (i === 1) {
        event.data.forEach((event) => {
          elements.push({ status: "izin", data: event });
        });
      }

      // Status no-presence
      if (i === 2) {
        event.data.forEach((event) => {
          elements.push({ status: "no-presence", data: event });
        });
      }
    }
  });

  // Sort by date before rendering
  elements.sort(
    (a, b) =>
      -(new Date(a.data.date).getTime() - new Date(b.data.date).getTime())
  );

  return (
    <>
      <div className="flex flex-col gap-4 items-start md:order-first order-last max-h-[23rem]">
        <div className="hidden md:flex flex-row gap-6 justify-between items-center w-full">
          <H2 className="border-none p-0 xs:text-3xl text-xl">Kehadiran</H2>

          <div className="flex flex-row gap-2 items-center">
            <p>Hadir</p>

            <Badge
              variant={
                Number(persentaseKehadiranRelatif) > 75
                  ? "default"
                  : "destructive"
              }
            >
              {persentaseKehadiranAbsolut}% / {persentaseKehadiranRelatif}%
            </Badge>
          </div>
        </div>

        <Separator className="md:block hidden" />

        <div
          id="day-card-container"
          className="w-full max-h-full overflow-y-auto flex flex-col gap-2 items-start"
        >
          {elements.length === 0 && (
            <div
              className="w-full py-4 px-12 bg-card/30 border-primary/5 border rounded-md backdrop-blur hover:cursor-pointer hover:backdrop-contrast-75 hover:bg-card/30"
              onClick={() =>
                toast({
                  title: "You are clicking an unknown event!",
                  description:
                    "Who knows what will happen to our universe now 😬😬😬😬",
                })
              }
            >
              <div className="flex flex-col gap-4 justify-start w-full">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row flex-wrap items-start md:items-center justify-start gap-x-4 gap-y-2 h-full">
                    <p className="text-base font-semibold">Unknown Event</p>

                    <div className="flex flex-row gap-2 items-center">
                      <Badge>???</Badge>
                    </div>
                  </div>

                  <p className="text-sm line-clamp-2 opacity-70">
                    When will it come? Who knows, maybe now, maybe never.
                  </p>
                </div>
              </div>
            </div>
          )}

          {elements.length !== 0 &&
            elements.map((event, i) => (
              <div
                className="w-full"
                onClick={() => setActiveIndex(i)}
                key={event.data.id}
              >
                <DayCard active={i === activeIndex} event={event} />
              </div>
            ))}
        </div>
      </div>

      {elements.length === 0 && (
        <>
          <div className="md:hidden flex flex-row gap-6 justify-between items-center w-full">
            <H2 className="border-none p-0 mb-0 xs:text-3xl text-xl">
              Kehadiran
            </H2>

            <div className="flex flex-row gap-2 items-center">
              <p>Hadir</p>

              <Badge
                variant={
                  Number(persentaseKehadiranRelatif) > 75
                    ? "default"
                    : "destructive"
                }
              >
                {persentaseKehadiranAbsolut}% / {persentaseKehadiranRelatif}%
              </Badge>
            </div>
          </div>

          <Separator className="md:hidden" />

          <Alert className="px-12 py-8 bg-card/30 border-primary/30 md:border-primary/10 backdrop-blur h-full w-full">
            <div className="prose prose-invert prose-sm md:prose-base pb-2">
              <h3>New Adventure is Coming Soon! ✨</h3>
            </div>

            <div
              id="prose-alert-info-kelas"
              className="prose prose-invert prose-sm md:prose-base max-h-48 md:max-h-48 overflow-y-auto pr-6"
            >
              <p>
                Afi, misi penjelajahan ruang dan waktu bersama Profesor akan
                segera dimulai. Persiapkanlah dirimu!
              </p>
            </div>
          </Alert>
        </>
      )}

      {elements.length !== 0 &&
        elements[activeIndex] &&
        elements[activeIndex].data && (
          <>
            <div className="md:hidden flex flex-row gap-6 justify-between items-center w-full">
              <H2 className="border-none p-0 xs:text-3xl text-xl">Kehadiran</H2>

              <div className="flex flex-row gap-2 items-center">
                <p>Hadir</p>

                <Badge
                  variant={
                    Number(persentaseKehadiranRelatif) > 75
                      ? "default"
                      : "destructive"
                  }
                >
                  {persentaseKehadiranAbsolut}% / {persentaseKehadiranRelatif}%
                </Badge>
              </div>
            </div>

            <Separator className="md:hidden" />

            <Alert className="flex flex-col px-12 py-8 bg-card/30 border-primary/30 md:border-primary/10 backdrop-blur h-full w-full">
              <div className="prose prose-invert prose-sm md:prose-base pb-2">
                <h3>{elements[activeIndex]?.data.title}</h3>
              </div>

              <div
                id="prose-alert-info-kelas"
                className="prose prose-invert prose-sm md:prose-base max-h-48 md:max-h-48 overflow-y-auto pr-6"
              >
                <p>{elements[activeIndex]?.data.description}</p>
              </div>

              <div className="flex pt-6 flex-col sm:flex-row mt-auto w-full gap-x-3 gap-y-2 items-center">
                <PerizinanForm eventDetails={elements[activeIndex]} />
                {moment(
                  new Date(
                    new Date(elements[activeIndex].data.date).setHours(
                      23,
                      59,
                      59
                    )
                  ).setDate(
                    new Date(elements[activeIndex].data.date).getDate() - 1
                  )
                ).isSameOrBefore() && (
                  <AlertDialog
                    open={openPresensiDialog}
                    onOpenChange={setOpenPresensiDialog}
                  >
                    <AlertDialogTrigger asChild>
                      <Button
                        disabled={
                          !elements[activeIndex].data.enablePresensi ||
                          elements[activeIndex].status === "hadir"
                        }
                        size={"sm"}
                        className="w-full"
                      >
                        Hadir
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <PresensiForm
                        key={elements[activeIndex].data.id}
                        onOpenChange={setOpenPresensiDialog}
                        eventDetails={elements[activeIndex].data}
                      />
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                {!(elements[activeIndex].data.checkRecheckForm === "NONE") &&
                  moment(
                    new Date(
                      new Date(elements[activeIndex].data.date).setHours(
                        23,
                        59,
                        59
                      )
                    ).setDate(
                      new Date(elements[activeIndex].data.date).getDate() - 1
                    )
                  ).isAfter() && (
                    <Button
                      size={"sm"}
                      variant={"secondary"}
                      className="w-full whitespace-nowrap"
                      asChild
                    >
                      <Link
                        target="_blank"
                        href={elements[activeIndex].data.checkRecheckForm!}
                      >
                        <ExternalLink className="mr-1" size={16} />
                        Check Recheck
                      </Link>
                    </Button>
                  )}
              </div>
            </Alert>
          </>
        )}
    </>
  );
}
