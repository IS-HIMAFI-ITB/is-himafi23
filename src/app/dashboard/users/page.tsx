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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUser } from "@/lib/utils";
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

  if (isLoading) return <H1>Loading...</H1>;
  if (isError) return <H1>Error: {error?.message}</H1>;

  return <DataTable columns={columns} data={data} />;
}
