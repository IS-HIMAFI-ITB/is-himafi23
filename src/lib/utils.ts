import { ClassValue, clsx } from "clsx";
import { cache } from "react";
import { twMerge } from "tailwind-merge";

import { QueryClient } from "@tanstack/react-query";
import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getQueryClient = cache(() => new QueryClient());

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
