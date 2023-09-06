"use client";

import moment from "moment";
import React, { useContext } from "react";

import {
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AcaraContext } from "@/context/acara-provider";
import { useEventQuery } from "@/hooks/useEventQuery";
import { useActiveDayIndexStore, useOpenDialogStore } from "@/lib/store";
import { AlertDialog } from "@radix-ui/react-alert-dialog";

import PresensiForm from "./presensi-form";

export default function PresensiButton() {
  const { activeDayIndex } = useActiveDayIndexStore();
  const { value: openPresensiDialog, setValue: setOpenPresensiDialog } =
    useOpenDialogStore();
  const initialData = useContext(AcaraContext);
  const query = useEventQuery({ initialData });
  if (!query) return null;

  const elements = query.elements;
  if (!elements) return null;

  const show = moment(
    new Date(
      new Date(elements[activeDayIndex].data.date).setHours(23, 59, 59)
    ).setDate(new Date(elements[activeDayIndex].data.date).getDate() - 1)
  ).isSameOrBefore();

  const disabled =
    !elements[activeDayIndex].data.enablePresensi ||
    elements[activeDayIndex].status === "hadir" ||
    (elements[activeDayIndex].status === "izin" &&
      elements[activeDayIndex].data.izin[0].status === "DITERIMA");

  if (!show) return null;

  return (
    <AlertDialog open={openPresensiDialog} onOpenChange={setOpenPresensiDialog}>
      <AlertDialogTrigger asChild>
        <Button disabled={disabled} size={"sm"} className="w-full">
          {elements[activeDayIndex].status === "izin" &&
          elements[activeDayIndex].data.izin[0].status === "DITERIMA"
            ? "Izin diterima"
            : "Hadir"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <PresensiForm
          key={elements[activeDayIndex].data.id}
          eventDetails={elements[activeDayIndex].data}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}
