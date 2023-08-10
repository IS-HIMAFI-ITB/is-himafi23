import { notFound } from "next/navigation";
import React from "react";

import SubmissionDetailsProvider from "@/context/submission-details-provider";
import UserProvider from "@/context/user-provider";
import { getTugasSubmission, getUserById } from "@/lib/server-fetch";

// export async function staticParams() {
//   const tugas = await prisma.tugas.findMany();
//   const users = await prisma.user.findMany();

//   const params = tugas.flatMap((tugas) => {
//     return users.map((user) => ({
//       id: tugas.id.toString(),
//       userId: user.id.toString(),
//     }));
//   });

//   return params;
// }

// export const generateStaticParams =
//   process.env.NODE_ENV === "production" ? staticParams : undefined;
// export const dynamic =
//   process.env.NODE_ENV === "production" ? "auto" : "force-dynamic";

export default async function NilaiTugasLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    id: string;
    userId: string;
  };
}) {
  const user = await getUserById(params.userId);
  const tugasSubmission = await getTugasSubmission(params.userId, params.id);

  if (!user) return notFound();

  return (
    <UserProvider user={user}>
      <SubmissionDetailsProvider submission={tugasSubmission ?? undefined}>
        {children}
      </SubmissionDetailsProvider>
    </UserProvider>
  );
}
