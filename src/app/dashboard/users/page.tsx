"use client";

import React from "react";

import Container from "@/components/layout/container";
import { H1 } from "@/components/typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUser } from "@/lib/client-fetch";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { columns } from "./(components)/columns";
import { DataTable } from "./(components)/data-table";

export default function DashboardUsers() {
  const { data, isLoading, isError, error } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: () => getUser(),
    refetchInterval: 1000 * 60 * 60, // 1 hour
  });

  if (isLoading)
    return (
      <>
        <H1 className="mb-4">Registered Accounts</H1>
        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-4">
            <Skeleton className="w-1/2 h-8" />
            <Skeleton className="w-1/2 h-8" />
          </div>

          <div className="flex flex-row gap-6">
            <Skeleton className="w-1/3 h-24" />
            <Skeleton className="w-2/3 h-24" />
          </div>

          <Skeleton className="w-full h-36" />
        </div>
      </>
    );

  if (isError) return <H1>Error: {error?.message}</H1>;

  return (
    <>
      <H1 className="mb-2">Registered Accounts</H1>
      <DataTable columns={columns} data={data} />
    </>
  );
}
