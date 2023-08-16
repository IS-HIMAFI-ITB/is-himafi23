"use client";

import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";

import { TugasPesertaContext } from "@/context/tugas-peserta-provider";
import { Tugas } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function TugasAssignedRatio() {
  // only render on client side (or when mounted) to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const session = useSession();
  const initialAllData = useContext(TugasPesertaContext);
  const initialAssignedData = initialAllData?.filter((tugas) =>
    tugas.submissions.filter(
      (submission) => submission.userId !== session.data?.user?.id
    )
  );

  const initialDoneData = initialAllData?.filter((tugas) =>
    tugas.submissions.filter(
      (submission) => submission.userId === session.data?.user?.id
    )
  );

  const tugasAssigned = useQuery<Tugas[], Error>({
    queryKey: ["tugas", "assigned", session.data?.user?.nim],
    queryFn: () => {
      return fetch(`/api/users/${session.data?.user.nim}/tugas/assigned`).then(
        (res) => res.json()
      );
    },
    initialData: initialAssignedData,
  });

  const tugasDone = useQuery<Tugas[], Error>({
    queryKey: ["tugas", "done", session.data?.user?.nim],
    queryFn: () =>
      fetch(`/api/users/${session.data?.user.nim}/tugas/done`).then((res) =>
        res.json()
      ),
    initialData: initialDoneData,
  });

  if (!mounted) return null;

  const tugasCount =
    (tugasAssigned.data?.length ?? 0) + (tugasDone.data?.length ?? 0);

  if (tugasAssigned.isLoading) {
    return <Loader2Icon className="animate-spin" size={12} />;
  }

  if (tugasAssigned.isError) {
    return <p>Error!</p>;
  }

  return (
    <b>
      ({tugasAssigned.data.length}/{tugasCount})
    </b>
  );
}
