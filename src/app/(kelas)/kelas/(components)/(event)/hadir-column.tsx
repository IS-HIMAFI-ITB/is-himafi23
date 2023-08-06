import { ArrowUpDown, PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const hadirColumns: ColumnDef<User>[] = [
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <Button variant={"ghost"} size={"icon"}>
          <PencilIcon size={16} />
        </Button>
      );
    },
  },
  {
    accessorKey: "nim",
    accessorFn: (row) => row.nim, // row.original.user.nim.split("@")[0]
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
      const user = row.original;

      return user.nim;
    },
  },
  {
    id: "nama",
    accessorKey: "nama",
    accessorFn: (row) => row.name,
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
      const user = row.original;

      return user.name;
    },
  },
];
