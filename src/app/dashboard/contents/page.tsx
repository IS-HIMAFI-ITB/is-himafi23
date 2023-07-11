import React from "react";

import { Code, H1, P } from "@/components/typography";
import { prisma } from "@/prisma";
import { Contents } from "@prisma/client";

import ContentSearch from "./(components)/content-search";

/**
 * @name ContentsDashboard
 * @description Halaman dashboard untuk mengelola konten halaman depan. Di halaman ini, admin bisa melihat semua konten halaman depan yang ada di database.
 * @returns Isinya halaman yang nampilin semua konten halaman depan yang ada di database.
 */
export default async function ContentsDashboard() {
  /**
   * @name contents
   * @description Mengambil semua konten halaman depan yang ada di database.
   * @returns Array of contents.
   * @example [{id: 1, name: "hero-title", content: "Selamat datang di website HIMAFI!"}, ...]
   */
  const contents: Contents[] = await prisma.contents
    .findMany()
    .catch((err) => err.message);

  return (
    <>
      <div className="flex flex-col gap-8 max-w-7xl">
        <H1 className="-mb-10">Contents</H1>

        <P>
          Format nama konten yang disimpan adalah{" "}
          <Code>(section)-(bagian)</Code>. <br />
          Contoh penamaan konten adalah <Code>hero-title</Code> untuk konten{" "}
          <Code>hero</Code> bagian <Code>title</Code> (atau bagian paling
          besar).
        </P>

        <ContentSearch contents={contents} />
      </div>
    </>
  );
}
