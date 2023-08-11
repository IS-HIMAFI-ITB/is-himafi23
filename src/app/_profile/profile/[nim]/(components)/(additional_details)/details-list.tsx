"use client";

import React, { useContext } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { UserContext } from "@/context/user-provider";
import { getUser } from "@/lib/client-fetch";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function DetailsList() {
  const user = useContext(UserContext);

  const { data, isLoading, isError, error } = useQuery<User[], Error>({
    queryKey: ["users", Number(user.nim)],
    queryFn: async () => await getUser(Number(user.nim)),
    refetchInterval: 1000 * 60 * 60, // 1 hour
    initialData: [user],
  });

  const userData = data?.[0];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="w-40 h-4" />
        <Skeleton className="w-40 h-4" />
      </div>
    );
  }

  if (isError) {
    return <p>Error! {error?.message}</p>;
  }

  return (
    <div>
      {/* ntar bisa ditambah lagi */}
      <span>Nomor HP: </span>
      {userData.phoneNumber ? (
        <span>{userData.phoneNumber}</span>
      ) : (
        <span>Unavailable</span>
      )}
    </div>
  );
}
