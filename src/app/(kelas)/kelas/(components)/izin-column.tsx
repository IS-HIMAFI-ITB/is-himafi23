import { ArrowUpDown, DownloadIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Izin, TipeIzin, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

interface IzinDetailProps extends Izin {
  user: User;
}

export const izinColumns: ColumnDef<IzinDetailProps>[] = [
  {
    accessorKey: "nim",
    accessorFn: (row) => row.user.nim, // row.original.user.nim.split("@")[0]
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-8 group hover:text-underline hover:bg-transparent hover:text-foreground"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        NIM
        <ArrowUpDown className="ml-2 h-4 w-4 group-hover:text-primary" />
      </Button>
    ),
    cell: ({ row }) => {
      const user = row.original.user;

      return <div className="px-8">{user.nim}</div>;
    },
  },
  {
    id: "nama",
    accessorKey: "nama",
    accessorFn: (row) => row.user.name,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 group hover:text-underline hover:bg-transparent hover:text-foreground"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nama
        <ArrowUpDown className="ml-2 h-4 w-4 group-hover:text-primary" />
      </Button>
    ),
    cell: ({ row }) => {
      const user = row.original.user;

      return <div className="w-max">{user.name}</div>;
    },
  },
  {
    id: "alasan",
    accessorKey: "alasan",
    accessorFn: (row) => row.keterangan,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 group hover:text-underline hover:bg-transparent hover:text-foreground"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Alasan
        <ArrowUpDown className="ml-2 h-4 w-4 group-hover:text-primary" />
      </Button>
    ),
    cell: ({ row }) => {
      const alasan = row.original.keterangan;

      return <div className="max-w-lg w-max">{alasan}</div>;
    },
  },
  {
    id: "status",
    accessorKey: "status",
    accessorFn: (row) => row.status,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 group hover:text-underline hover:bg-transparent hover:text-foreground"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4 group-hover:text-primary" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <Select defaultValue={row.original.status}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status Izin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DITERIMA">Diterima</SelectItem>
            <SelectItem value="DITOLAK">Ditolak</SelectItem>
            <SelectItem value="MENUNGGU">Menunggu</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    id: "tipe",
    accessorKey: "tipe",
    accessorFn: (row) => row.tipe,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 group hover:text-underline hover:bg-transparent hover:text-foreground"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tipe
        <ArrowUpDown className="ml-2 h-4 w-4 group-hover:text-primary" />
      </Button>
    ),
    cell: ({ row }) => {
      const tipe = row.original.tipe;

      return (
        <Badge
          className={cn(
            "w-max",
            tipe === TipeIzin.FULL &&
              "bg-accent text-accent-foreground hover:opacity-90 hover:bg-accent hover:text-accent-foreground",
            tipe === TipeIzin.MENYUSUL &&
              "bg-foreground text-background hover:opacity-90 hover:bg-foreground hover:text-background",
            tipe === TipeIzin.MENINGGALKAN_LEBIH_AWAL &&
              "bg-secondary text-secondary-foreground hover:opacity-90 hover:bg-secondary hover:text-secondary-foreground"
          )}
        >
          {tipe.split("_").join(" ")}
        </Badge>
      );
    },
  },
  {
    id: "bukti",
    accessorKey: "bukti",
    accessorFn: (row) => row.bukti,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-8 group hover:text-underline hover:bg-transparent hover:text-foreground"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Bukti
        <ArrowUpDown className="ml-2 h-4 w-4 group-hover:text-primary" />
      </Button>
    ),
    cell: ({ row }) => {
      const files = row.original.bukti;
      if (!files)
        return (
          <Badge className="mx-8" variant={"destructive"}>
            Belum mengirim bukti
          </Badge>
        );
      return (
        <div className="flex flex-col gap-2 justify-start max-w-xs text-ellipsis overflow-x-hidden px-8">
          {files.split("|").map((file) => {
            return (
              <a
                key={file}
                href={file}
                className="flex flex-row items-center gap-2 overflow-hidden group hover:underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <DownloadIcon
                  size={16}
                  className="mr-2 shrink-0 group-hover:text-primary"
                />{" "}
                {file?.split("_").slice(1).join("_")}
              </a>
            );
          })}
        </div>
      );
    },
  },
];
