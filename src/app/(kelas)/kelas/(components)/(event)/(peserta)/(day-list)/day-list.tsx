"use client";

import React, { useContext } from "react";

import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast/useToast";
import { AcaraContext } from "@/context/acara-provider";
import { useEventQuery } from "@/hooks/useEventQuery";
import { useActiveDayIndexStore } from "@/lib/store";

import DayCard from "./day-card";

export default function DayList() {
  const initialData = useContext(AcaraContext);
  const { activeDayIndex, setActiveDayIndex } = useActiveDayIndexStore();
  const { toast } = useToast();
  const query = useEventQuery({ initialData });
  if (!query) return null;

  const elements = query.elements;
  if (!elements) return null;

  switch (elements.length) {
    case 0:
      return (
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
      );

    default:
      return elements.map((event, i) => (
        <div
          className="w-full"
          onClick={() => setActiveDayIndex(i)}
          key={event.data.id}
        >
          <DayCard active={i === activeDayIndex} event={event} />
        </div>
      ));
  }
}
