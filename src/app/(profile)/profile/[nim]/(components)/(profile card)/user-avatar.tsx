"use client";

import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { getUser } from "@/lib/client-fetch";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function UserAvatar({ initialUser }: { initialUser: User }) {
  const { data, isLoading } = useQuery<User[], Error>({
    queryKey: ["users", Number(initialUser.nim)],
    queryFn: async () => await getUser(Number(initialUser.nim)),
    refetchInterval: 1000 * 60 * 60, // 1 hour
    initialData: [initialUser],
  });

  const user = data?.[0];

  if (isLoading) {
    return (
      <div className="rounded-full w-20 h-20 text-black flex items-center justify-center">
        <Skeleton className="w-20 h-20 rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <Avatar className="w-20 h-20 text-3xl">
      <AvatarImage src={user.image ?? undefined} />

      <AvatarFallback>{user.name?.[0] ?? "?"}</AvatarFallback>
    </Avatar>
  );
}
