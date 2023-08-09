"use client";

import {
  DownloadIcon,
  ExternalLink,
  Loader2Icon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import DropFile from "@/components/drop-file";
import {
  AlertDialogCancel,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/toast/useToast";
import { UploadDropzone } from "@/components/upload-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Submission } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const linkSchema = z.object({ link: z.string().url().nonempty() });
export default function SubmitTugasCard({
  params,
  tugasSubmission,
  variant,
  setOpen,
  uploadedFileKey,
  setUploadedFileKey,
  attachments,
  setAttachments,
  edit,
  setEdit,
  loading,
  setLoading,
}: {
  params: { id: string };
  tugasSubmission: Submission | undefined;
  variant: "edit" | "submit";
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uploadedFileKey?: string;
  setUploadedFileKey: React.Dispatch<React.SetStateAction<string | undefined>>;
  attachments?: string;
  setAttachments: React.Dispatch<React.SetStateAction<string | undefined>>;
  edit?: string;
  setEdit: React.Dispatch<React.SetStateAction<string | undefined>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { toast } = useToast();
  const session = useSession();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof linkSchema>>({
    resolver: zodResolver(linkSchema),
  });

  function onSubmit(data: z.infer<typeof linkSchema>) {
    if (!data.link) return;
    if (!attachments) {
      setAttachments(data.link);
      form.reset();
      return;
    }

    setAttachments(attachments + `|${data.link}`);
    form.reset();
  }

  const handleCancel = async () => {
    if (uploadedFileKey && tugasSubmission?.files !== uploadedFileKey) {
      const res = await fetch("/api/uploadthing", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ files: uploadedFileKey }),
      }).then((res) => res.json());
      if (res.success) {
        setUploadedFileKey(undefined);
      }
    }
    setAttachments(tugasSubmission?.links ?? undefined);
  };

  const submitTugas = useMutation({
    mutationKey: [
      "submitTugas",
      { tugasId: params.id, userId: session.data?.user.id },
    ],
    mutationFn: async ({
      linkUrl,
      fileUrl,
      method,
      submissionId,
    }: {
      linkUrl?: string;
      fileUrl?: string;
      method: string;
      submissionId?: string;
    }) => {
      setLoading(true);
      const res = await fetch(
        `/api/submissions/${session.data?.user.id}/${params.id}`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            files: fileUrl ?? undefined,
            links: linkUrl ?? undefined,
            submittedAt: new Date(),
            id: submissionId,
          }),
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
        (oldData: Submission | undefined) => {
          return oldData
            ? {
                ...oldData,
                files: data.files,
                links: data.links,
                submittedAt: data.submittedAt,
              }
            : oldData;
        }
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
      setLoading(false);
      queryClient.invalidateQueries({
        queryKey: [
          "tugasSubmission",
          { tugasId: params.id, userId: session.data?.user.id },
        ],
      });
    },
  });

  return (
    <AlertDialogContent className="overflow-y-auto h-full md:max-h-[80vh] max-w-3xl">
      <div className="rounded-md border-dashed border-2 border-primary/20">
        <UploadDropzone
          endpoint="fileUploader"
          onClientUploadComplete={(res) => {
            if (!res) return;
            toast({
              title: "Berhasil mengupload tugas",
              description: (
                <>
                  File tugas kamu{" "}
                  <code>{res[0].fileKey.split("_").slice(1).join("_")}</code>{" "}
                  berhasil diupload
                </>
              ),
            });
            if (uploadedFileKey) {
              handleCancel().then(() => {
                setUploadedFileKey(res[0].fileKey);
              });
              return;
            }

            setUploadedFileKey(res[0].fileKey);
          }}
          onUploadError={(err) => {
            toast({
              title: "Gagal mengupload tugas",
              description: err.message,
            });
          }}
        />
      </div>
      <Card className="flex flex-row justify-between flex-wrap items-center gap-x-8 gap-y-2 px-6 py-3">
        <p className="font-semibold">
          {uploadedFileKey ? "Uploaded file" : "No uploaded file"}
        </p>
        {uploadedFileKey && (
          <Link
            href={`https://uploadthing.com/f/${uploadedFileKey}`}
            className="flex flex-row gap-2 items-center hover:text-primary"
          >
            <DownloadIcon size={16} />{" "}
            <span className="line-clamp-1">
              {uploadedFileKey?.split("_").slice(1).join("_")}
            </span>
          </Link>
        )}
      </Card>
      <Card className="p-6 space-y-4">
        <p className="font-semibold">
          {attachments ? "Attachments" : "No attachments"}
        </p>
        <Separator />
        {attachments && (
          <div className="flex flex-col items-start gap-4">
            {attachments.split("|").map((attachment) => (
              <div
                key={attachment}
                className="flex flex-row justify-between items-center w-full"
              >
                <Link
                  href={`//${attachment
                    .replace("https://", "")
                    .replace("http://", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row gap-3 items-center hover:text-primary"
                >
                  <ExternalLink size={16} />{" "}
                  <span className="line-clamp-1 max-w-sm">
                    {
                      attachment
                        .replace("https://", "")
                        .replace("http://", "")
                        .split("/")[0]
                    }
                  </span>
                </Link>
                <XIcon
                  onClick={() => {
                    if (attachments.split("|").length === 1) {
                      setAttachments(undefined);
                      return;
                    }
                    setAttachments(
                      attachments
                        .split("|")
                        .filter((att) => att !== attachment)
                        .join("|")
                    );
                  }}
                  className="hover:text-accent hover:cursor-pointer"
                  size={16}
                />
              </div>
            ))}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add attachments</FormLabel>
                  <div className="flex flex-row justify-between items-center gap-4">
                    <FormControl>
                      <Input {...field} placeholder="Masukkan link" />
                    </FormControl>
                    <Button type="submit" size={"icon"} variant={"secondary"}>
                      <PlusIcon className="aspect-square" size={16} />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </Card>
      <div className="flex flex-row gap-2 items-center">
        <AlertDialogCancel
          disabled={loading}
          onClick={() => handleCancel()}
          className="w-full my-0"
        >
          Batal
        </AlertDialogCancel>
        <Button
          disabled={loading}
          className="w-full"
          onClick={() => {
            if (!uploadedFileKey && !attachments) {
              toast({
                title: "Kamu tidak mengumpulkan apapun",
                description:
                  "Jika ingin menghapus submisi, klik tombol hapus submisi",
                variant: "destructive",
              });
              return;
            }
            if (variant === "edit") {
              setLoading(true);
              submitTugas.mutate({
                linkUrl: attachments,
                fileUrl: uploadedFileKey,
                method: "PATCH",
                submissionId: tugasSubmission?.id,
              });
              return;
            }

            if (variant === "submit") {
              setLoading(true);
              submitTugas.mutate({
                linkUrl: attachments,
                fileUrl: uploadedFileKey,
                method: "POST",
              });
              return;
            }
          }}
        >
          {loading ? (
            <Loader2Icon className="animate-spin" />
          ) : variant === "edit" ? (
            "Edit"
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </AlertDialogContent>
  );
}
