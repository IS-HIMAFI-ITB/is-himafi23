import "moment/locale/id";

import { CalendarIcon, ClockIcon } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";

import { H3 } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Tugas } from "@prisma/client";

type LoadingTugasCardProps = {
  loading: true;
  done?: boolean;
  tugas?: Tugas;
};

type TugasCardProps = {
  loading?: false;
  done?: boolean;
  tugas: Tugas;
};

type Props = LoadingTugasCardProps | TugasCardProps;

export default function TugasCard({ loading, tugas, done }: Props) {
  moment.locale("id");
  if (loading) {
    return (
      <Card className="min-h-[150px] flex flex-col justify-start px-10 py-6 hover:border-primary hover:cursor-pointer">
        <div className="flex flex-row justify-between gap-x-8 gap-y-4 flex-wrap">
          <Skeleton className="w-1/3 min-w-[150px] h-[20px]" />
          <Skeleton className="w-[200px] h-[20px]" />
        </div>
        <Skeleton className="w-full h-[70px] mt-4" />
      </Card>
    );
  }

  return (
    <Link href={`/kelas/tugas/${tugas?.id}`}>
      <Card className="min-h-[150px] flex flex-col justify-start px-10 py-6 hover:border-primary hover:cursor-pointer">
        <div className="flex flex-row justify-between gap-x-8 gap-y-4 flex-wrap">
          <H3>
            <span className="mr-4 text-primary">#{tugas?.id}</span>
            {tugas?.title}
          </H3>

          <div className="flex flex-row flex-wrap items-center gap-4">
            <div className="flex flex-row gap-2 items-center">
              <CalendarIcon className="shrink-0" size={16} />
              <p>{moment(tugas.dueDate).format("Do MMMM YYYY")}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <ClockIcon className="shrink-0" size={16} />
              <p>
                {moment(tugas?.dueDate).format(
                  `HH:mm ${
                    moment(tugas?.dueDate).format("Z") === "+07:00"
                      ? "[WIB]"
                      : moment(tugas?.dueDate).format("Z") === "+08:00"
                      ? "[WITA]"
                      : `[GMT] ${moment(tugas?.dueDate).format("Z")}`
                  }`
                )}
              </p>
            </div>
            <Badge
              variant={
                moment(tugas.dueDate).isBefore() ? "destructive" : "default"
              }
              className={cn(done && "bg-green-300 text-green-900")}
            >
              {done
                ? "Done"
                : moment(tugas.dueDate).isBefore()
                ? "Telat"
                : moment(tugas.dueDate).fromNow()}
            </Badge>
          </div>
        </div>

        <div
          className="opacity-50 line-clamp-3 mt-4"
          dangerouslySetInnerHTML={{ __html: tugas?.description }}
        />
      </Card>
    </Link>
  );
}
