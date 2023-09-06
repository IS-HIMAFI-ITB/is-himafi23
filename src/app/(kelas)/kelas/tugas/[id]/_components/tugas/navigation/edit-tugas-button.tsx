"use client";

import { FileEdit } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import { Role } from "@prisma/client";

export default function EditTugasButton() {
  const session = useSession();
  const tugasId = useParams().id;

  if (session.data?.user.role === Role.PESERTA) return null;

  return (
    <Button
      variant={"outline"}
      className="no-underline line-clamp-1 whitespace-nowrap max-w-full"
      asChild
    >
      <Link href={`/kelas/tugas/${tugasId}/edit`}>
        <FileEdit className="mr-2" size={16} /> Edit tugas
      </Link>
    </Button>
  );
}
