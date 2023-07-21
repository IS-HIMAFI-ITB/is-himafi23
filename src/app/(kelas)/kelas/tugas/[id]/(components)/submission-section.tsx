"use client";

import { motion } from "framer-motion";
import {
  CalendarIcon,
  ClockIcon,
  DownloadIcon,
  UploadIcon,
} from "lucide-react";
import moment from "moment";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

import DropFile from "@/components/drop-file";
import { H3 } from "@/components/typography";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/toast/useToast";
import { Submission, Tugas } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function SubmissionSection({
  tugas,
  tugasSubmission,
  params,
}: {
  tugas: Tugas | undefined;
  tugasSubmission: Submission | undefined;
  params: { id: string };
}) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const session = useSession();
  const queryClient = useQueryClient();

  const deleteSubmission = useMutation({
    mutationKey: ["deleteSubmission", { submissionId: tugasSubmission?.id }],
    mutationFn: async () => {
      const res = await fetch(
        `/api/submissions/${session?.data?.user.id}/${params.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: tugasSubmission?.id }),
        }
      ).then((res) => res.json());

      return res;
    },
    onSuccess: (data) => {
      setOpen(false);
      queryClient.setQueryData(
        [
          "tugasSubmission",
          { tugasId: params.id, userId: session?.data?.user.id },
        ],
        undefined
      );
      toast({
        title: "Berhasil menghapus submisi",
        description: "Submisi kamu berhasil dihapus.",
      });
    },
    onError: (err: Error) => {
      toast({
        title: "Gagal mengumpulkan tugas",
        description: err.message,
      });
    },
    onSettled: () => {
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: [
          "tugasSubmission",
          { tugasId: params.id, userId: session?.data?.user.id },
        ],
      });
    },
  });

  const submitTugas = useMutation({
    mutationKey: [
      "submitTugas",
      { tugasId: params.id, userId: session.data?.user.id },
    ],
    mutationFn: async ({
      fileUrl,
      method,
      submissionId,
    }: {
      fileUrl: string;
      method: string;
      submissionId?: string;
    }) => {
      const res = await fetch(
        `/api/submissions/${session.data?.user.id}/${params.id}`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ files: fileUrl, id: submissionId }),
        }
      ).then((res) => res.json());

      return res as Submission;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        [
          "tugasSubmission",
          { tugasId: params.id, userId: session.data?.user.id },
        ],
        (oldData) =>
          oldData
            ? {
                ...oldData,
                files: data.files,
                submittedAt: data.submittedAt,
              }
            : oldData
      );
      setOpen(false);
      toast({
        title: "Berhasil mengumpulkan tugas",
        description: "Tugas kamu berhasil dikumpulkan.",
      });
    },
    onError: (err: Error) => {
      toast({
        title: "Gagal mengumpulkan tugas",
        description: err.message,
      });
    },
    onSettled: () => {
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: [
          "tugasSubmission",
          { tugasId: params.id, userId: session.data?.user.id },
        ],
      });
    },
  });

  return (
    <motion.div
      className="sticky top-28 h-max flex flex-col gap-4"
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1.01],
        delay: 0.3,
      }}
    >
      <div className="flex flex-row gap-4">
        <H3>Nilai kamu</H3>

        <H3 className="text-accent">{tugasSubmission?.score ?? "???"}</H3>
      </div>

      <div className="flex flex-row flex-wrap gap-2 items-center">
        {(moment(tugasSubmission?.submittedAt).isAfter(
          moment(tugas?.dueDate)
        ) ||
          (!tugasSubmission && moment(tugas?.dueDate).isBefore())) && (
          <Badge className="w-max" variant={"destructive"}>
            Telat
          </Badge>
        )}

        {tugasSubmission && <Badge className="w-max">Sudah dikumpulkan</Badge>}

        {!tugasSubmission && (
          <Badge variant={"destructive"} className="w-max">
            Belum dikumpulkan
          </Badge>
        )}

        {!tugasSubmission?.score && tugasSubmission! && (
          <Badge variant={"destructive"} className="w-max">
            Belum dinilai
          </Badge>
        )}

        {tugasSubmission?.score && tugasSubmission! && (
          <Badge variant={"secondary"} className="w-max">
            Sudah dinilai
          </Badge>
        )}
      </div>

      <p className="text-lg font-bold mt-4 -mb-2">File yang dikumpulkan</p>

      {!tugasSubmission && (
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Card className="py-4 px-6 group/fileSubmitted hover:cursor-pointer hover:border hover:border-primary hover:scale-105 transition-transform">
              <div className="flex flex-row gap-6 items-center">
                <UploadIcon
                  size={24}
                  className="group-hover/fileSubmitted:text-primary"
                />
                <p className="font-bold">Upload file</p>
              </div>
            </Card>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <DropFile
              onClientUploadComplete={(res) => {
                if (!res) return;
                submitTugas.mutate({
                  fileUrl: res[0].fileKey,
                  method: "POST",
                });
              }}
              onUploadError={(err) => {
                toast({
                  title: "Gagal mengupload tugas",
                  description: err.message,
                });
              }}
            />
            <AlertDialogCancel>Batal</AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {tugasSubmission && (
        <a
          href={`https://uploadthing.com/f/${tugasSubmission.files}`}
          className="flex flex-row gap-6 items-center"
        >
          <Card className="py-4 px-6 group/fileSubmitted hover:cursor-pointer hover:border hover:border-primary hover:scale-105 transition-transform">
            <div className="flex flex-row gap-6 items-center">
              <DownloadIcon
                size={32}
                className="group-hover/fileSubmitted:text-primary"
              />
              <div className="flex flex-col gap-1">
                <p className="font-semibold line-clamp-1">
                  {decodeURI(
                    tugasSubmission.files.split("_").slice(1).join("_")
                  )}
                </p>
                <div className="flex flex-row flex-wrap gap-1 items-center">
                  <Badge className="xs:inline hidden" variant={"outline"}>
                    .
                    {
                      tugasSubmission.files
                        .split("_")
                        .slice(1)
                        .join("_")
                        .split(".")[1]
                    }
                  </Badge>
                  <CalendarIcon className="xs:ml-2" size={12} />{" "}
                  <p className="text-sm">
                    {moment(tugasSubmission.submittedAt).format("L")}
                  </p>
                  <ClockIcon className="ml-2" size={12} />
                  <p className="text-sm">
                    {moment(tugasSubmission.submittedAt).format("HH:MM")}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </a>
      )}

      {tugasSubmission && (
        <div className="flex flex-row gap-2 items-center">
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button className="w-full" variant={"outline"}>
                Ganti submisi
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <DropFile
                onClientUploadComplete={(res) => {
                  if (!res) return;
                  submitTugas.mutate({
                    fileUrl: res[0].fileKey,
                    method: "PATCH",
                    submissionId: tugasSubmission?.id,
                  });
                }}
                onUploadError={(err) => {
                  toast({
                    title: "Gagal mengupload tugas",
                    description: err.message,
                  });
                }}
              />
              <AlertDialogCancel>Batal</AlertDialogCancel>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"} className="w-full">
                Hapus submisi
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                Apakah kamu yakin ingin menghapus submisi kamu?
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    variant={"destructive"}
                    onClick={() => deleteSubmission.mutate()}
                  >
                    Hapus
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}

      <p className="text-lg font-bold mt-4 -mb-2">Feedback grader</p>

      <Separator />

      <p className="max-h-[200px] overflow-y-auto">
        {tugasSubmission?.feedback ?? "Belum ada feedback."}
      </p>
    </motion.div>
  );
}
