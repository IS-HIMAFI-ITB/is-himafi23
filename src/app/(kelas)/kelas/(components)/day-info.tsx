import { CalendarDaysIcon, ClockIcon, MapPin } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DayInfo {
  day?: string;
  desc?: string;
  date?: string;
  time?: string;
  location?: string;
  disabled?: boolean;
  unknown?: boolean;
  className?: string;
}

export default function DayInfoCard({
  unknown,
  day,
  date,
  desc,
  time,
  location,
  disabled,
  className,
}: DayInfo) {
  if (unknown) {
    return (
      <Card
        className={cn("flex flex-col gap-2 p-8 w-full opacity-70", className)}
      >
        <p className="text-2xl font-bold">Day ???</p>
        <p>???????????????????????</p>
        <div className="flex flex-col gap-2 my-2">
          <div className="flex flex-row gap-2 items-center">
            <CalendarDaysIcon className="shrink-0" size={16} />
            <p>??/??/????</p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <ClockIcon className="shrink-0" size={16} />
            <p>??.?? WIB - ??.?? WIB</p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <MapPin className="shrink-0" size={16} />
            <p>??????</p>
          </div>
        </div>
        <div className="flex flex-row mt-auto gap-4 w-full items-center">
          <Button disabled className="w-full">
            Hadir
          </Button>
          <Button disabled className="w-full" variant={"outline"}>
            Izin
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "flex flex-col gap-2 p-8 w-full",
        className,
        disabled && "opacity-70"
      )}
    >
      <p className="text-2xl font-bold">Day {day}</p>
      <p>{desc}</p>
      <div className="flex flex-col gap-2 my-2">
        <div className="flex flex-row gap-2 items-center">
          <CalendarDaysIcon className="shrink-0" size={16} />
          <p>{date}</p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <ClockIcon className="shrink-0" size={16} />
          <p>{time}</p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <MapPin className="shrink-0" size={16} />
          <p>{location}</p>
        </div>
      </div>
      <div className="flex flex-row mt-auto gap-4 w-full items-center">
        <Button disabled={disabled} className="w-full">
          Hadir
        </Button>
        <Button disabled={disabled} className="w-full" variant={"outline"}>
          Izin
        </Button>
      </div>
    </Card>
  );
}
