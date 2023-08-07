"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useContext } from "react";

import { SubmissionDetailsContext } from "@/context/submission-details-provider";
import { Submission } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function TugasFeedback() {
  const initialData = useContext(SubmissionDetailsContext);
  const params = useParams();
  const session = useSession();
  const {
    data: tugasSubmission,
    isLoading,
    isError,
    error,
  } = useQuery<Submission | null, Error>({
    queryKey: [
      "tugasSubmission",
      { tugasId: params.id, userId: session.data?.user.id },
    ],
    queryFn: async () => {
      const res = await fetch(
        `/api/submissions/${session.data?.user.id}/${params.id}`
      );
      return res.json();
    },
    initialData: initialData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return (
      <p>
        <strong>Error! </strong>
        {error.message}
      </p>
    );

  return (
    <p className="max-h-[200px] overflow-y-auto text-base">
      {tugasSubmission?.feedback ?? "Belum ada feedback."}
    </p>
  );
}
