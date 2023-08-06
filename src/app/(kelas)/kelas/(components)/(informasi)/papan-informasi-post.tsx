"use client";

import { ChevronDown } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

import { Alert } from "@/components/ui/alert";
import { Post } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../local-accordion";

export default function PapanInformasiPost({
  initialPosts,
}: {
  initialPosts: Post[];
}) {
  const posts = useQuery<Post[], Error>({
    queryKey: ["posts", "kelas"],
    queryFn: () => fetch(`/api/posts/kelas`).then((res) => res.json()),
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    initialData: initialPosts,
  });

  if (posts.isError) return notFound();
  if (posts.isLoading) {
    return (
      <Alert className="px-12 py-8 bg-card/30 border-primary/10 backdrop-blur h-full w-full">
        <div className="prose prose-invert prose-sm md:prose-base pb-2">
          <h3>Loading...</h3>
        </div>
      </Alert>
    );
  }

  return (
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
  );
}
