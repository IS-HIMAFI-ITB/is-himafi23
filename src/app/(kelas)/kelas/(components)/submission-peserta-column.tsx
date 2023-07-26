import {
  ArrowUpDown,
  DownloadIcon,
  ExternalLink,
  PencilIcon,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Submission, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

interface TugasSubmissionDetailProps extends Submission {
  user: User;
  tugas: {
    dueDate: Date;
  };
}

export const columns: ColumnDef<TugasSubmissionDetailProps>[] = [
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
    header: "NIM",
    cell: ({ row }) => {
      const user = row.original.user;

      return <div className="w-max">{user.nim}</div>;
    },
  },
  {
    id: "nama",
    accessorKey: "nama",
    header: "Nama",
    cell: ({ row }) => {
      const user = row.original.user;

      return <div className="w-max">{user.name}</div>;
    },
  },
  {
    accessorKey: "files",
    header: "File",
    cell: ({ row }) => {
      const files = row.original.files;
      return (
        <a
          href={`https://uploadthing.com/f/${files}`}
          className="flex flex-row items-center gap-2 overflow-hidden group hover:underline underline-offset-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DownloadIcon size={16} className="mr-2 group-hover:text-primary" />{" "}
          {files?.split("_").slice(1).join("_")}
        </a>
      );
    },
  },
  {
    accessorKey: "submittedAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 group hover:text-underline hover:bg-transparent hover:text-foreground"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Submitted
        <ArrowUpDown className="ml-2 h-4 w-4 group-hover:text-primary" />
      </Button>
    ),
    cell: ({ row }) => {
      const submittedAt = row.original.submittedAt;
      const dueDate = row.original.tugas.dueDate;

      const isTelat = moment(submittedAt).isAfter(dueDate);
      return (
        <div
          className={cn(
            `w-max flex flex-row gap-3 items-center`,
            isTelat && "text-destructive"
          )}
        >
          {moment(submittedAt).format(
            `DD MMMM, [pukul] HH:mm ${
              moment(submittedAt).format("Z") === "+07:00"
                ? "[WIB]"
                : moment(submittedAt).format("Z") === "+08:00"
                ? "[WITA]"
                : `[GMT] ${moment(submittedAt).format("Z")}`
            }`
          )}{" "}
          {isTelat && <Badge variant={"destructive"}>Telat</Badge>}
        </div>
      );
    },
  },
  {
    accessorKey: "links",
    header: "Links",
    cell: ({ row }) => {
      const links = row.original.links;
      return (
        <div className="group flex flex-row flex-wrap gap-2 w-max overflow-hidden">
          {links?.split("|").map((link, i) => (
            <div key={i} className="flex flex-row gap-2 items-center">
              <ExternalLink size={16} className="group-hover:text-primary" />
              <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group-hover:underline underline-offset-2"
              >
                {
                  link
                    .replace("https://", "")
                    .replace("http://", "")
                    .replace("www.", "")
                    .split("/")[0]
                }
              </Link>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => {
      const score = row.original.score;
      return <div className="w-max min-w-[10px]">{score ?? "-"}/100</div>;
    },
  },
  {
    accessorKey: "feedback",
    header: "Feedback",
    cell: ({ row }) => {
      const feedback = row.original.feedback;
      return (
        <div className="max-w-[10ch] min-w-[10px]">
          {feedback ? feedback : "-"}
        </div>
      );
    },
  },
];
