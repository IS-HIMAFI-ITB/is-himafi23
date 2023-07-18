"use client";

import { SearchIcon } from "lucide-react";
import React, { useEffect } from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Contents } from "@prisma/client";

import ContentItem from "./content-item";

export default function ContentSearch({ contents }: { contents: Contents[] }) {
  const [search, setSearch] = React.useState("");

  /** Ini untuk melakukan searching konten, kondisi awal parameter search tidak ada, sehingga seluruh konten ditampilkan */
  const [filteredContents, setFilteredContents] =
    React.useState<Contents[]>(contents);

  /** Kapanpun contents dan search berubah, filteredContents akan diganti dengan nama konten yang mengandung parameter search, kemudian data yang ditampilkan diurut berdasarkan abjad pada judul konten. */
  useEffect(() => {
    setFilteredContents(
      contents
        // Filter by name
        .filter((content) => {
          return content.name.toLowerCase().includes(search.toLowerCase());
        })

        // Sort by name
        .sort((a, b) => {
          if (a.name > b.name) return 1;
          else return -1;
        })
    );
  }, [search, contents]);

  if (contents.length === 0) return <div>No content!</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2 items-center">
        <SearchIcon />
        <Input
          placeholder="Cari judul konten"
          className="max-w-sm"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/** Jika tidak ada konten, maka tampilkan Card yang menyatakan tidak ada data yang ditemkan */}
      {filteredContents.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Hasil pencarian tidak ditemukan</CardTitle>
            <CardDescription>
              Harap cari dengan kata kunci lain.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/** Jika ada konten, maka tampilkan konten */}
      {filteredContents.map((content) => {
        return <ContentItem key={content.id} content={content} />;
      })}
    </div>
  );
}
