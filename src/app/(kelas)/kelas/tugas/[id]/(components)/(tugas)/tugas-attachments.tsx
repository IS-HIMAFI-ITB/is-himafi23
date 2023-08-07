"use client";

import { LinkIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useContext } from "react";

import { Card } from "@/components/ui/card";
import { TugasDetailsContext } from "@/context/tugas-details-provider";
import { Tugas } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function TugasAttachments() {
  const initialData = useContext(TugasDetailsContext);
  const params = useParams();
  const { data: tugas, isLoading } = useQuery<Tugas, Error>({
    queryKey: ["tugas", { id: params.id }],
    queryFn: async () => {
      const res = await fetch(`/api/tugas/${params.id}`);
      return res.json();
    },
    initialData: initialData,
  });

  //    Bentuk data attachments adalah {link1}|{link2}|{link3} dst.
  //    Jadi di sini string dipisah berdasarkan karakter "|" dan karakter "|" tidak dimasukkan ke dalam array.
  //    Kemudian, bentuk url "https://" atau "http://" hanya diambil domain utamanya.
  //    Contoh "https://drive.google.com/..." hanya diambil "drive.google.com"

  if (isLoading)
    return (
      <Card className="px-5 py-4 w-max max-w-full flex flex-row gap-4 items-center group/download hover:cursor-pointer hover:border-primary">
        <Loader2Icon
          className="group-hover/download:text-primary animate-spin"
          size={24}
        />
        Loading...
      </Card>
    );

  if (!tugas.attachments)
    return (
      <div className="flex flex-row flex-wrap gap-x-2 gap-y-3 text-base">
        <p>Tidak ada attachment.</p>
      </div>
    );

  return (
    <div className="flex flex-row flex-wrap gap-x-2 gap-y-3 text-base">
      {tugas.attachments?.split("|").map((attachment, i) => (
        <Link
          href={attachment.split("?judultugas=")[0]}
          key={i}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Card className="px-5 py-4 w-max max-w-full flex flex-row gap-4 items-center group/download hover:cursor-pointer hover:border-primary">
            <LinkIcon className="group-hover/download:text-primary" size={24} />

            <div className="flex flex-col gap-1">
              <p className="font-semibold line-clamp-1">
                {attachment.split("?judultugas=")[1]}
              </p>

              <p className="text-sm opacity-50 overflow-hidden line-clamp-1">
                {
                  attachment
                    .replace("https://", "")
                    .replace("http://", "")
                    .split("?judultugas=")[0]
                    .split("/")[0]
                }
              </p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
