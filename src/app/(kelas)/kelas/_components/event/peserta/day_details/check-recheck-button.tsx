"use client";

import { ExternalLink } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React, { useContext } from "react";

import { Button } from "@/components/ui/button";
import { AcaraContext } from "@/context/acara-provider";
import { useEventQuery } from "@/hooks/useEventQuery";
import { useActiveDayIndexStore } from "@/lib/store";

export default function CheckRecheckButton() {
  const { activeDayIndex } = useActiveDayIndexStore();
  const initialData = useContext(AcaraContext);
  const query = useEventQuery({ initialData });
  if (!query) return null;

  const elements = query.elements;
  if (!elements) return null;

  const show =
    !(elements[activeDayIndex].data.checkRecheckForm === "NONE") &&
    moment(
      new Date(
        new Date(elements[activeDayIndex].data.date).setHours(23, 59, 59)
      ).setDate(new Date(elements[activeDayIndex].data.date).getDate() - 1)
    ).isAfter();

  if (!show) return null;

  return (
    <Button
      size={"sm"}
      variant={"secondary"}
      className="w-full whitespace-nowrap"
      asChild
    >
      <Link
        target="_blank"
        href={elements[activeDayIndex].data.checkRecheckForm!}
      >
        <ExternalLink className="mr-1" size={16} />
        Check Recheck
      </Link>
    </Button>
  );
}
