"use client";

import { LinkIcon } from "lucide-react";
import React, { useEffect } from "react";

import { Card } from "@/components/ui/card";
import { Tugas } from "@prisma/client";

export default function TugasAttachments({ tugas }: { tugas: Tugas }) {
  const [attachments, setAttachments] = React.useState<string | null>(null);
  useEffect(() => {
    setAttachments(tugas.attachments);
  }, [tugas.attachments]);

  if (!attachments) return null;

  return (
    <div className="not-prose w-full flex flex-row flex-wrap items-center gap-4">
      {tugas.attachments
        ?.split("|")
        .filter((element) => (element === "|" ? null : element))
        .map((attachment, i) => (
          <a
            href={attachment.split("?judultugas=")[0]}
            key={i}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card className="px-5 py-4 w-full max-w-max flex flex-row gap-4 items-center group/download hover:cursor-pointer hover:border-primary">
              <LinkIcon
                className="group-hover/download:text-primary"
                size={24}
              />

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
          </a>
        ))}
    </div>
  );
}
