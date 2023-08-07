"use client";

import { useSession } from "next-auth/react";

import { Event, Izin, User } from "@prisma/client";
import { useQueries, UseQueryOptions } from "@tanstack/react-query";

export type QueryEvent = Event & { izin: Izin[]; hadir: User[] };

export function useEventQuery({
  initialData,
}: {
  initialData: QueryEvent[][];
}) {
  const session = useSession();
  const [hadir, izin, noPresence] = useQueries({
    queries: ["hadir", "izin", "no-presence"].map<
      UseQueryOptions<QueryEvent[], Error>
    >((status, i) => {
      return {
        queryKey: ["events", status, { userId: session.data?.user.id }],
        queryFn: () =>
          fetch(`/api/event/users/${session.data?.user.nim}/${status}`).then(
            (res) => res.json()
          ),
        refetchInterval: 1000 * 60 * 5, // 5 minutes
        initialData: initialData[i] ?? undefined,
      };
    }),
  });

  const isError = hadir.error || izin.error || noPresence.error;
  const isLoading = hadir.isLoading || izin.isLoading || noPresence.isLoading;

  const jumlahEvent =
    (hadir.data?.length ?? 0) +
    (izin.data?.length ?? 0) +
    (noPresence.data?.length ?? 0);
  const jumlahIzin =
    izin.data?.filter((event) => event.izin[0].status === "DITERIMA").length ??
    0;
  const jumlahHadir = hadir.data?.length ?? 0;
  const jumlahTidakHadir =
    (noPresence.data?.length ?? 0) +
    (izin.data?.filter((event) => !(event.izin[0].status === "DITERIMA"))
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

  if (!(session.status === "authenticated")) return null;

  const elements = [] as { status: string; data: QueryEvent }[];
  [hadir, izin, noPresence].forEach((event, i) => {
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

  return {
    hadir,
    izin,
    noPresence,
    elements,
    jumlahEvent,
    jumlahHadir,
    jumlahIzin,
    jumlahKehadiranDenganIzin,
    jumlahKehadiranTanpaIzin,
    jumlahTidakHadir,
    persentaseKehadiranAbsolut,
    persentaseKehadiranRelatif,
    isError,
    isLoading,
  };
}
