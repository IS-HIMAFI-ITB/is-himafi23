"use client";

import "moment/locale/id";

import {
  CalendarIcon,
  ClockIcon,
  DownloadIcon,
  UploadIcon,
} from "lucide-react";
import moment from "moment";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import DropFile from "@/components/drop-file";
import Container from "@/components/layout/container";
import Unauthenticated from "@/components/template/unauthenticated";
import { H3 } from "@/components/typography";
import {
  AlertDialog,
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
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function TugasPage({ params }: { params: { id: string } }) {
  moment.locale("id");
  const session = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const tugas = useQuery<Tugas, Error>({
    queryKey: ["tugas", { id: params.id }],
    queryFn: async () => {
      const res = await fetch(`/api/tugas/${params.id}`);
      return res.json();
    },
  });
  const tugasSubmission = useQuery<Submission, Error>({
    queryKey: [
      "tugasSubmission",
      { tugasId: params.id, userId: session.data?.user.id },
    ],
    queryFn: async () => {
      const res = await fetch(
        `/api/submissions/${session.data?.user.id}/${params.id}`
      );
      return res.json();
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

  const deleteSubmission = useMutation({
    mutationKey: [
      "deleteSubmission",
      { submissionId: tugasSubmission.data?.id },
    ],
    mutationFn: async () => {
      const res = await fetch(
        `/api/submissions/${session.data?.user.id}/${params.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: tugasSubmission.data?.id }),
        }
      ).then((res) => res.json());

      return res;
    },
    onSuccess: (data) => {
      setOpen(false);
      queryClient.removeQueries({
        queryKey: [
          "tugasSubmission",
          { tugasId: params.id, userId: session.data?.user.id },
        ],
      });
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
          { tugasId: params.id, userId: session.data?.user.id },
        ],
      });
    },
  });

  if (session.status === "unauthenticated") {
    return <Unauthenticated />;
  }

  return (
    <Container className="py-12 grid gap-x-24 gap-y-12 lg:grid-cols-[65%_25%] grid-cols-1">
      {/* Bagian deskripsi tugas */}

      <motion.article
        className="prose lg:prose-lg dark:prose-invert"
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
          delay: 0,
        }}
      >
        <h3 className="flex flex-row items-center gap-2">
          Tugas #{tugas.data?.id}
        </h3>

        <h1>{tugas.data?.title}</h1>

        <div className="not-prose -mt-4 flex flex-row flex-wrap items-center gap-4">
          <Badge
            variant={"secondary"}
            className="flex flex-row gap-2 items-center font-normal px-4"
          >
            <CalendarIcon size={16} />

            <p className="hidden text-sm xs:inline">Deadline</p>

            <p className="text-sm">
              {moment(tugas.data?.dueDate).format("LL")} pukul{" "}
              {moment(tugas.data?.dueDate).format("HH:MM")}
            </p>
          </Badge>

          <Badge
            variant={"outline"}
            className="flex flex-row gap-2 items-center font-normal px-4"
          >
            <ClockIcon size={16} />{" "}
            <p className="text-sm">
              Updated{" "}
              {moment(tugas.data?.updatedAt).format("DD-MM-YYYY, HH:MM")}
            </p>
          </Badge>
        </div>

        <p>{tugas.data?.description}</p>
      </motion.article>

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

          <H3 className="text-accent">
            {tugasSubmission.data?.score ?? "???"}
          </H3>
        </div>

        <div className="flex flex-row flex-wrap gap-2 items-center">
          {(moment(tugasSubmission.data?.submittedAt).isAfter(
            moment(tugas.data?.dueDate)
          ) ||
            (!tugasSubmission.data &&
              moment(tugas.data?.dueDate).isBefore())) && (
            <Badge className="w-max" variant={"destructive"}>
              Telat
            </Badge>
          )}

          {tugasSubmission.data && (
            <Badge className="w-max">Sudah dikumpulkan</Badge>
          )}

          {!tugasSubmission.data && (
            <Badge variant={"destructive"} className="w-max">
              Belum dikumpulkan
            </Badge>
          )}

          {!tugasSubmission.data?.score && tugasSubmission.data! && (
            <Badge variant={"destructive"} className="w-max">
              Belum dinilai
            </Badge>
          )}

          {tugasSubmission.data?.score && tugasSubmission.data! && (
            <Badge variant={"secondary"} className="w-max">
              Sudah dinilai
            </Badge>
          )}
        </div>

        <p className="text-lg font-bold mt-4 -mb-2">File yang dikumpulkan</p>

        <Card className="py-4 px-6 group/fileSubmitted hover:cursor-pointer hover:border hover:border-primary hover:scale-105 transition-transform">
          <div className="flex flex-row gap-6 items-center">
            {!tugasSubmission.data && (
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger className="flex flex-row gap-6 items-center">
                  <UploadIcon
                    size={24}
                    className="group-hover/fileSubmitted:text-primary"
                  />
                  <p className="font-bold">Upload file</p>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <DropFile
                    onClientUploadComplete={(res) => {
                      if (!res) return;
                      submitTugas.mutate({
                        fileUrl: res[0].fileUrl,
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

            {tugasSubmission.data && (
              <a
                href={tugasSubmission.data.files}
                className="flex flex-row gap-6 items-center"
              >
                <DownloadIcon
                  size={32}
                  className="group-hover/fileSubmitted:text-primary"
                />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold line-clamp-1">
                    {decodeURI(
                      tugasSubmission.data.files.split("_").slice(1).join("_")
                    )}
                  </p>
                  <div className="flex flex-row flex-wrap gap-1 items-center">
                    <Badge className="xs:inline hidden" variant={"outline"}>
                      .
                      {
                        tugasSubmission.data.files
                          .split("_")
                          .slice(1)
                          .join("_")
                          .split(".")[1]
                      }
                    </Badge>
                    <CalendarIcon className="xs:ml-2" size={12} />{" "}
                    <p className="text-sm">
                      {moment(tugasSubmission.data.submittedAt).format("L")}
                    </p>
                    <ClockIcon className="ml-2" size={12} />
                    <p className="text-sm">
                      {moment(tugasSubmission.data.submittedAt).format("HH:MM")}
                    </p>
                  </div>
                </div>
              </a>
            )}
          </div>
        </Card>

        {tugasSubmission.data && (
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
                      fileUrl: res[0].fileUrl,
                      method: "PATCH",
                      submissionId: tugasSubmission.data?.id,
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
          {tugasSubmission.data?.feedback ?? "Belum ada feedback."}
        </p>
      </motion.div>
    </Container>
  );
}
