"use client";

import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { getUser } from "@/lib/client-fetch";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function SocialMediaList({ user }: { user: User }) {
  const { data, isLoading } = useQuery<User[], Error>({
    queryKey: ["users", Number(user.nim)],
    queryFn: async () => await getUser(Number(user.nim)),
    refetchInterval: 1000 * 60 * 60, // 1 hour
    initialData: [user],
  });

  const userData = data?.[0];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {/* ini ntar ganti pake array dari database kalo udah ada*/}

        <Skeleton className="w-32 h-3" />
        <Skeleton className="w-32 h-3" />

        <Skeleton className="w-32 h-3" />
        <Skeleton className="w-32 h-3" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {/* ini ntar ganti pake array dari database kalo udah ada*/}
      <div className="flex justify-between gap-6 w-full text-sm">
        <p className="font-semibold">Instagram</p>
        <p>@username</p>
      </div>
      <div className="flex justify-between gap-6 w-full text-sm">
        <p className="font-semibold">LINE</p>
        <p>@username</p>
      </div>
      <div className="flex justify-between gap-6 w-full text-sm">
        <p className="font-semibold">Twitter</p>
        <p>@username</p>
      </div>
    </div>
  );
}
