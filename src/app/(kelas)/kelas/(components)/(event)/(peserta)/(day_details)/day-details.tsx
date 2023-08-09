"use client";

import "../kehadiran-card-style.css";

import { useContext } from "react";

import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AcaraContext } from "@/context/acara-provider";
import { useEventQuery } from "@/hooks/useEventQuery";
import { useActiveDayIndexStore } from "@/lib/store";

import CheckRecheckButton from "./check-recheck-button";
import PerizinanForm from "./perizinan-form";
import PresensiButton from "./presensi-button";

export default function DayDetails() {
  const { activeDayIndex } = useActiveDayIndexStore();
  const initialData = useContext(AcaraContext);
  const query = useEventQuery({ initialData });
  if (!query) return null;

  const elements = query.elements;

  if (query.isLoading) {
    return (
      <Alert className="px-12 py-8 bg-card/30 border-primary/10 backdrop-blur h-full w-full">
        <div className="prose prose-invert prose-sm md:prose-base pb-2">
          <Skeleton className="w-full h-8" />
        </div>

        <div
          id="day-card-container"
          className="prose prose-invert prose-sm md:prose-base max-h-48 md:max-h-48 overflow-y-auto"
        >
          <Skeleton className="w-full h-16" />
        </div>
      </Alert>
    );
  }

  switch (elements.length) {
    case 0:
      return (
        <Alert className="px-12 py-8 bg-card/30 border-primary/30 md:border-primary/10 backdrop-blur h-full w-full">
          <div className="prose prose-invert prose-sm md:prose-base pb-2">
            <h3>New Adventure is Coming Soon! ✨</h3>
          </div>

          <div
            id="day-card-container"
            className="prose prose-invert prose-sm md:prose-base max-h-48 md:max-h-48 overflow-y-auto pr-6"
          >
            <p>
              Afi, misi penjelajahan ruang dan waktu bersama Profesor akan
              segera dimulai. Persiapkanlah dirimu!
            </p>
          </div>
        </Alert>
      );

    default:
      return (
        <Alert className="flex flex-col px-12 py-8 bg-card/30 border-primary/30 md:border-primary/10 backdrop-blur h-full w-full">
          <div className="prose prose-invert prose-sm md:prose-base pb-2">
            <h3>{elements[activeDayIndex]?.data.title}</h3>
          </div>

          <div
            id="day-card-container"
            className="prose prose-invert prose-sm md:prose-base max-h-64 overflow-y-auto pr-6"
          >
            <div
              dangerouslySetInnerHTML={{
                __html: elements[activeDayIndex].data
                  .description as TrustedHTML,
              }}
            />
          </div>

          <div className="flex pt-6 flex-col sm:flex-row mt-auto w-full gap-x-3 gap-y-2 items-center">
            <PerizinanForm eventDetails={elements[activeDayIndex]} />

            <PresensiButton />
            <CheckRecheckButton />
          </div>
        </Alert>
      );
  }
}
