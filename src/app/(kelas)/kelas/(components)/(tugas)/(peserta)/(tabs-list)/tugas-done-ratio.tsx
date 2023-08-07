"use client";

import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";

import { TugasPesertaContext } from "@/context/tugas-peserta-provider";
import { Tugas } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function TugasDoneRatio() {
  const initialData = useContext(TugasPesertaContext);
  const session = useSession();

  const tugasAssigned = useQuery<Tugas[], Error>({
    queryKey: ["tugas", "assigned", session.data?.user?.nim],
    queryFn: () => {
      return fetch(`/api/users/${session.data?.user.nim}/tugas/assigned`).then(
        (res) => res.json()
      );
    },
    initialData: initialData.tugasAssigned,
  });

  const tugasDone = useQuery<Tugas[], Error>({
    queryKey: ["tugas", "done", session.data?.user?.nim],
    queryFn: () =>
      fetch(`/api/users/${session.data?.user.nim}/tugas/done`).then((res) =>
        res.json()
      ),
    initialData: initialData.tugasDone,
  });

  const tugasCount =
    (tugasAssigned.data?.length ?? 0) + (tugasDone.data?.length ?? 0);

  if (tugasAssigned.isLoading) {
    return <Loader2Icon className="animate-spin" size={12} />;
  }

  return (
    <b>
      ({tugasDone.data.length}/{tugasCount})
    </b>
  );
}
