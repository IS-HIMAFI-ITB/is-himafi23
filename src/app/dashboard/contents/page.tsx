import React from "react";

import { H1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { prisma } from "@/prisma";
import { Contents } from "@prisma/client";

import ContentItem from "./(components)/content-item";

export default async function ContentsDashboard() {
  const contents: Contents[] = await prisma.contents
    .findMany()
    .catch((err) => err.message);

  return (
    <>
      <div className="flex flex-col gap-4">
        {contents.map((content) => {
          return <ContentItem key={content.id} content={content} />;
        })}
      </div>
      <div className="w-full h-screen">LOL</div>
    </>
  );
}
