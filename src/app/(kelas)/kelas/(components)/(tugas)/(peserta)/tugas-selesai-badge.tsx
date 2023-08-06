"use client";

import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";

import { Badge } from "@/components/ui/badge";
import { TugasPesertaContext } from "@/context/tugas-peserta-provider";
import { Tugas } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function TugasSelesaiBadge() {
  const initialData = useContext(TugasPesertaContext);
  const session = useSession();

  const tugasDone = useQuery<Tugas[], Error>({
    queryKey: ["tugas", "done", session.data?.user?.nim],
    queryFn: () =>
      fetch(`/api/users/${session.data?.user.nim}/tugas/done`).then((res) =>
        res.json()
      ),
    initialData: initialData.tugasDone,
  });

  const tugasAssigned = useQuery<Tugas[], Error>({
    queryKey: ["tugas", "assigned", session.data?.user?.nim],
    queryFn: () => {
      return fetch(`/api/users/${session.data?.user.nim}/tugas/assigned`).then(
        (res) => res.json()
      );
    },
    initialData: initialData.tugasAssigned,
  });

  const tugasCount =
    (tugasAssigned.data?.length ?? 0) + (tugasDone.data?.length ?? 0);
  const isLoading = tugasAssigned.isLoading || tugasDone.isLoading;

  if (tugasAssigned.isError || tugasDone.isError) return <p>Error!</p>;

  if (isLoading)
    return (
      <Badge>
        <Loader2Icon className="mr-2 animate-spin" size={16} />%
      </Badge>
    );

  return (
    <Badge
      variant={
        (tugasDone.data?.length! / tugasCount) * 100 < 75
          ? "destructive"
          : "default"
      }
    >
      {((tugasDone.data?.length! / tugasCount) * 100).toFixed(2)}%
    </Badge>
  );
}
