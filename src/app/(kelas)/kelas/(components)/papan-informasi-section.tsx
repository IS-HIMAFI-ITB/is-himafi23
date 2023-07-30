"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

import { H2 } from "@/components/typography";
import { Alert } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/toast/useToast";
import { Post } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./local-accordion";

export default function PapanInformasiSection() {
  const posts = useQuery<Post[], Error>({
    queryKey: ["posts", "kelas"],
    queryFn: () => fetch(`/api/posts/kelas`).then((res) => res.json()),
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  });
  const { toast } = useToast();

  if (posts.isError) return notFound();
  if (posts.isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex flex-col gap-4 items-start">
        <H2 className="border-none p-0">Papan Informasi</H2>

        <Separator />
      </div>
      <Accordion
        defaultValue={"0"}
        type="single"
        collapsible
        className="space-y-4"
      >
        {posts.data.length !== 0 &&
          posts.data
            .sort(
              (a, b) =>
                -(
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
                )
            )
            .map((post, i) => (
              <AccordionItem
                key={post.id}
                className="border-none"
                value={i.toString()}
              >
                <AccordionTrigger asChild>
                  <Alert className="flex flex-row gap-12 items-center px-12 py-4 bg-card/30 border-primary/10 backdrop-blur h-full w-full hover:cursor-pointer hover:no-underline transition-all">
                    <div className="prose prose-invert prose-sm md:prose-base">
                      <h3>{post.title}</h3>
                    </div>
                    <div className="not-prose">
                      <ChevronDown className="mr-2 transition-all" size={24} />
                    </div>
                  </Alert>
                </AccordionTrigger>
                <AccordionContent
                  className="bg-card/30 backdrop-blur mt-4 rounded-md"
                  asChild
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    className="px-12 py-4 prose prose-invert prose-sm md:prose-base"
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
      </Accordion>

      {/* <div className="flex flex-col gap-4 items-start order-last max-h-72">
        <div
          id="day-card-container"
          className="w-full max-h-full overflow-y-auto flex flex-col gap-2 items-start"
        >
          {posts.data.length === 0 && (
            <div
              className="w-full px-12 py-4 bg-card/30 rounded-md backdrop-blur hover:cursor-pointer hover:backdrop-contrast-75"
              onClick={() =>
                toast({
                  title: "You are clicking an unknown event!",
                  description:
                    "Who knows what will happen to our universe now 😬😬😬😬",
                })
              }
            >
              <div className="flex flex-col gap-4 justify-start w-full">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row flex-wrap items-start md:items-center justify-start gap-x-4 gap-y-2 h-full">
                    <p className="text-base font-semibold">Unknown Event</p>

                    <div className="flex flex-row gap-2 items-center">
                      <Badge>???</Badge>
                    </div>
                  </div>

                  <p className="text-sm line-clamp-2 opacity-70">
                    When will it come? Who knows, maybe now, maybe never.
                  </p>
                </div>
              </div>
            </div>
          )}

          {elements.length !== 0 &&
            elements.map((event, i) => (
              <div
                className="w-full"
                onClick={() => setActiveIndex(i)}
                key={event.data.id}
              >
                <DayCard active={i === activeIndex} event={event} />
              </div>
            ))}
        </div>
      </div> */}

      {/* {posts.data.length === 0 && (
        <Alert className="px-12 py-8 bg-card/30 border-primary/10 backdrop-blur h-full w-full">
          <div className="prose prose-invert prose-sm md:prose-base pb-2">
            <h3>New Adventure is Coming Soon! ✨</h3>
          </div>

          <div
            id="prose-alert-info-kelas"
            className="prose prose-invert prose-sm md:prose-base max-h-48 md:max-h-48 overflow-y-auto pr-6"
          >
            <p>
              Afi, misi penjelajahan ruang dan waktu bersama Profesor akan
              segera dimulai. Persiapkanlah dirimu!
            </p>
          </div>
        </Alert>
      )} */}

      {/* {elements.length !== 0 && (
        <Alert className="px-12 py-8 bg-card/30 border-primary/10 backdrop-blur h-full w-full">
          <div className="prose prose-invert prose-sm md:prose-base pb-2">
            <h3>{elements[activeIndex]?.data.title}</h3>
          </div>

          <div
            id="prose-alert-info-kelas"
            className="prose prose-invert prose-sm md:prose-base max-h-48 md:max-h-48 overflow-y-auto pr-6"
          >
            <p>
              {elements[activeIndex]?.data.description} Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Saepe fugit nostrum ut itaque
              facere expedita voluptas debitis alias, ratione accusantium
              tempora vero id doloribus, ducimus a quas molestiae voluptate
              explicabo?
            </p>
          </div>

          <div className="flex pt-6 flex-row w-full gap-3 items-center">
            <Button size={"sm"} variant={"outline"} className="w-full">
              Izin
            </Button>
            <Button size={"sm"} className="w-full">
              Hadir
            </Button>
          </div>
        </Alert>
      )} */}
    </>
  );
}
