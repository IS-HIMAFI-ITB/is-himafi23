import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Izin, User } from "@prisma/client";
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
        className="p-0 group hover:text-underline hover:bg-transparent hover:text-foreground"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        NIM
        <ArrowUpDown className="ml-2 h-4 w-4 group-hover:text-primary" />
      </Button>
    ),
    cell: ({ row }) => {
      const user = row.original.user;

      return user.nim;
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

      return user.name;
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

      return alasan;
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

      return tipe;
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
];
