import React from "react";

import { H2 } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import PostsProvider from "@/context/posts-provider";
import { prisma } from "@/prisma";

import PapanInformasiPost from "./papan-informasi-post";

export default async function PapanInformasiSection() {
  const posts = await prisma.post
    .findMany({
      where: {
        type: {
          equals: "KELAS",
        },
      },
      include: {
        author: true,
      },
    })
    .catch((err) => {
      throw new Error(err);
    });

  return (
    <>
      <div className="flex flex-col gap-4 items-start">
        <H2 className="border-none p-0">Papan Informasi</H2>

        <Separator />
      </div>
      <PostsProvider posts={posts}>
        <PapanInformasiPost />
      </PostsProvider>
    </>
  );
}
