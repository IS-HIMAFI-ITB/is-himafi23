import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

import EditTugasButton from "./edit-tugas-button";

export default async function TugasNavigation() {
  return (
    <div className="flex flex-row gap-2 items-center">
      <Button
        variant={"outline"}
        className="no-underline line-clamp-1 whitespace-nowrap max-w-full"
        asChild
      >
        <Link href={`/kelas`}>
          <ArrowLeft className="mr-2" size={16} /> Kembali ke halaman kelas
        </Link>
      </Button>

      <EditTugasButton />
    </div>
  );
}
