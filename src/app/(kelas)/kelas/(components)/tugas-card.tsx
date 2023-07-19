import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { H3, P } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Tugas {
  id?: string;
  title?: string;
  dueDateTime?: string;
  description?: string;
  mockTelat?: boolean;
}

export default function TugasCard({
  id,
  title,
  dueDateTime,
  description,
  mockTelat,
}: Tugas) {
  return (
    <Link href={`/kelas/tugas/${id}`}>
      <Card className="min-h-[150px] flex flex-col justify-start px-10 py-6 hover:border-primary hover:cursor-pointer">
        <div className="flex flex-row justify-between gap-x-8 gap-y-4 flex-wrap">
          <H3>
            <span className="mr-4 text-primary">#{id}</span>
            {title}
          </H3>

          <div className="flex flex-row items-center gap-2">
            <CalendarIcon size={16} />
            <p>{dueDateTime}</p>
            <Badge variant={mockTelat ? "destructive" : "default"}>
              {mockTelat ? "Telat 2 hari" : "2 hari lagi"}
            </Badge>
          </div>
        </div>

        <P className="opacity-50 line-clamp-3">{description}</P>
      </Card>
    </Link>
  );
}
