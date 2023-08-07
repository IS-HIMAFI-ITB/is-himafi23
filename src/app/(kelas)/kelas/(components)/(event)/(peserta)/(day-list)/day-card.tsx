"use client";

import { CalendarIcon, Clock } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { QueryEvent } from "@/hooks/useEventQuery";
import { cn } from "@/lib/utils";

export default function DayCard({
  event,
  active,
}: {
  event: { status: string; data: QueryEvent };
  active: boolean;
}) {
  // only render on client side (or when mounted) to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "w-full py-8 px-12 bg-card/50 rounded-md backdrop-blur hover:cursor-pointer",
        active && "backdrop-contrast-75 bg-card/30",
        !active && "hover:border-primary hover:border"
      )}
    >
      <div className="flex flex-col gap-4 justify-start w-full">
        <div className="flex flex-col gap-3">
          <p className="text-base font-semibold">{event.data.title}</p>

          <div className="flex flex-row flex-wrap justify-between gap-x-2 gap-y-4 items-center text-sm">
            {event.data.date && (
              <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 items-center">
                <div className="flex flex-row gap-2 items-center">
                  <CalendarIcon size={16} />{" "}
                  {moment(new Date(event.data.date)).format(
                    "dddd, DD MMMM YYYY"
                  )}
                </div>

                <div className="flex flex-row gap-2 items-center">
                  <Clock size={16} />{" "}
                  {moment(new Date(event.data.date)).format(
                    `HH:mm ${
                      moment(event.data.date).format("Z") === "+07:00"
                        ? "[WIB]"
                        : moment(event.data.date).format("Z") === "+08:00"
                        ? "[WITA]"
                        : `[GMT] ${moment(event.data.date).format("Z")}`
                    }`
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-row gap-2 items-center">
              {event.status === "izin" ||
                (event.status === "no-presence" &&
                  event.data.izin[0].status === "DITOLAK" && (
                    <Badge variant={"outline"}>
                      Izin{" "}
                      {event.data.izin[0].tipe
                        .split("_")
                        .join(" ")
                        .toLowerCase()}
                    </Badge>
                  ))}

              <Badge
                variant={
                  event.status === "hadir"
                    ? "default"
                    : event.status === "izin"
                    ? event.data.izin[0].status === "DITERIMA"
                      ? "default"
                      : event.data.izin[0].status === "MENUNGGU"
                      ? "secondary"
                      : "destructive"
                    : "destructive"
                }
              >
                {event.status === "izin" ||
                (event.status === "no-presence" &&
                  event.data.izin[0].status === "DITOLAK")
                  ? `Izin ${event.data.izin[0].status.toLowerCase()}`
                  : event.status === "hadir"
                  ? "Hadir full"
                  : "Tidak hadir"}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
