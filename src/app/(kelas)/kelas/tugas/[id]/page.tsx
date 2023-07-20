"use client";

import "moment/locale/id";

import { CalendarIcon, ClockIcon, DownloadIcon } from "lucide-react";
import moment from "moment";
import React from "react";

import Container from "@/components/layout/container";
import { H3 } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tugas } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function TugasPage({ params }: { params: { id: string } }) {
  moment.locale("id");
  const tugas = useQuery<Tugas, Error>({
    queryKey: ["tugas", { id: params.id }],
    queryFn: async () => {
      const res = await fetch(`/api/tugas/${params.id}`);
      return res.json();
    },
  });

  return (
    <Container className="py-12 grid gap-x-24 gap-y-12 lg:grid-cols-[65%_25%] grid-cols-1">
      <article className="prose lg:prose-lg dark:prose-invert">
        <h3 className="flex flex-row items-center gap-2">
          Tugas #{tugas.data?.id}
        </h3>
        <h1>{tugas.data?.title}</h1>
        <div className="not-prose -mt-4 flex flex-row flex-wrap items-center gap-4">
          <Badge
            variant={"secondary"}
            className="flex flex-row gap-2 items-center font-normal px-4"
          >
            <CalendarIcon size={16} />{" "}
            <p className="text-base">
              {moment(tugas.data?.dueDate).format("LL")}
            </p>
          </Badge>
          <Badge
            variant={"secondary"}
            className="flex flex-row gap-2 items-center font-normal px-4"
          >
            <ClockIcon size={16} />{" "}
            <p className="text-base">
              Pukul {moment(tugas.data?.dueDate).format("HH:MM")}
            </p>
          </Badge>
          <Badge
            variant={"outline"}
            className="flex flex-row gap-2 items-center font-normal px-4"
          >
            <ClockIcon size={16} />{" "}
            <p className="text-base">
              Updated {moment(tugas.data?.dueDate).format("DD-MM-YYYY, HH:MM")}
            </p>
          </Badge>
        </div>
        <p>{tugas.data?.description}</p>
      </article>

      <div className="sticky top-28 h-max flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <H3>Nilai kamu</H3>
          <H3 className="text-accent">???</H3>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Badge className="w-max">Sudah dikumpulkan</Badge>
          <Badge variant={"destructive"} className="w-max">
            Belum dinilai
          </Badge>
        </div>
        <p className="text-lg font-bold mt-4 -mb-2">File yang dikumpulkan</p>
        <Card className="py-4 px-6 group/fileSubmitted hover:cursor-pointer">
          <div className="flex flex-row gap-6 items-center">
            <DownloadIcon
              size={32}
              className="group-hover/fileSubmitted:text-primary"
            />
            <div className="flex flex-col gap-1">
              <p className="font-semibold line-clamp-1">
                Lorem ipsum dolor sit amet.pdf
              </p>
              <div className="flex flex-row flex-wrap gap-1 items-center">
                <Badge className="xs:inline hidden" variant={"outline"}>
                  .pdf
                </Badge>
                <CalendarIcon className="xs:ml-2" size={12} />{" "}
                <p className="text-sm">12/12/2021</p>
                <ClockIcon className="ml-2" size={12} />
                <p className="text-sm">08.43</p>
              </div>
            </div>
          </div>
        </Card>
        <p className="text-lg font-bold mt-4 -mb-2">Feedback grader</p>
        <Separator />
        <p className="max-h-[200px] overflow-y-auto">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non dicta
          illo consectetur laboriosam quasi. Dolorem explicabo commodi atque
          iure dolores reprehenderit eaque sint molestias. Deleniti laudantium
          rerum officiis sit vero. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Non dicta illo consectetur laboriosam quasi. Dolorem
          explicabo commodi atque iure dolores reprehenderit eaque sint
          molestias. Deleniti laudantium rerum officiis sit vero.
        </p>
      </div>
    </Container>
  );
}
