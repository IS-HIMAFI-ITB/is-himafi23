import { ClassValue, clsx } from "clsx";
import moment from "moment";
import { cache } from "react";
import { twMerge } from "tailwind-merge";

import { QueryClient } from "@tanstack/react-query";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getQueryClient = cache(() => new QueryClient());

export function formatTime(time: string | Date) {
  const date = new Date(time);

  return moment(date).format(
    `HH:mm ${
      moment(date).format("Z") === "+07:00"
        ? "[WIB]"
        : moment(date).format("Z") === "+08:00"
        ? "[WITA]"
        : `[GMT] ${moment(date).format("Z")}`
    }`
  );
}

export function formatDate(
  date: string | Date,
  format: string = "DD MMMM YYYY"
) {
  const newDate = new Date(date);

  return moment(newDate).format(format);
}
