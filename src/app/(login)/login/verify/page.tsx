"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

import Loading from "@/components/template/loading";

export default function VerifyLogin() {
  const router = useRouter();
  const session = useSession();
  if (session.status === "authenticated") {
    // Ini ngecek apakah user udah pernah ganti password apa belum, diliat dari updatedAt dan createdAt nya.
    if (session.data.user.createdAt === session.data.user.updatedAt) {
      router.push("/login/continue");
    } else if (session.data.user.role === "PESERTA") {
      // Kalau yang login peserta, redirect ke halaman kelas.
      router.push("/kelas");
    } else {
      router.push("/");
    }
  } else if (session.status === "unauthenticated") {
    router.push("/login");
  }

  // Selagi ngecek session yang barusan login, tampilkan loading.
  return <Loading />;
}
