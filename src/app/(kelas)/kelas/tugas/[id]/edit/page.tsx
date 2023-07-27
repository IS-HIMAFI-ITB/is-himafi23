"use client";

import React from "react";

import { Tugas } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import CreateTugas from "../../create/(components)/create-tugas";
import EditTugas from "./(components)/edit-tugas";

export default function EditTugasPage({ params }: { params: { id: string } }) {
  const tugas = useQuery<Tugas, Error>({
    queryKey: ["tugas", { id: params.id }],
    queryFn: () => {
      return fetch(`/api/tugas/${params.id}`).then((res) => res.json());
    },
  });

  if (tugas.isLoading) return;
  if (tugas.isError) return;
  return <EditTugas tugas={tugas.data} params={{ id: params.id }} />;
}
