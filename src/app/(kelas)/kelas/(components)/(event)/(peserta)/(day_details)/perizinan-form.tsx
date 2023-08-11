"use client";

import { LinkIcon, Loader2Icon, XCircleIcon } from "lucide-react";
import moment from "moment";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast/useToast";
import { UploadDropzone } from "@/components/upload-button";
import { QueryEvent } from "@/hooks/useEventQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Izin } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function PerizinanForm({
  eventDetails,
}: {
  eventDetails: { status: string; data: QueryEvent };
}) {
  const { toast } = useToast();
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [openIzinDialog, setOpenIzinDialog] = useState(false);
  const izinDetail = useQuery<Izin[]>({
    queryKey: [
      "izinDetail",
      { userNim: session.data?.user.nim, eventId: eventDetails.data.id },
    ],
    queryFn: () => {
      return fetch(`/api/izin/nim/${session.data?.user.nim}`).then((res) =>
        res.json()
      );
    },
  });
  const perizinanFormSchema = z.object({
    keterangan: z.string({ required_error: "Tidak boleh kosong." }),
    tipe: z.string({ required_error: "Tidak boleh kosong." }),
    bukti: z.string().optional(),
  });
  const attachmentSchema = z.object({
    link: z.string({ required_error: "Tidak boleh kosong." }).url(),
  });

  const attachmentForm = useForm<z.infer<typeof attachmentSchema>>({
    resolver: zodResolver(attachmentSchema),
    defaultValues: {
      link: "",
    },
  });

  const form = useForm<z.infer<typeof perizinanFormSchema>>({
    resolver: zodResolver(perizinanFormSchema),
    defaultValues: {
      keterangan: undefined,
      tipe: undefined,
      bukti: undefined,
    },
  });

  const queryClient = useQueryClient();
  const izinMutation = useMutation({
    mutationKey: [
      "izin",
      { eventId: eventDetails.data.id, userId: session.data?.user.id },
    ],
    mutationFn: (values: z.infer<typeof perizinanFormSchema>) => {
      return fetch(`api/event/users/${session.data?.user.nim}/izin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: eventDetails.data.id, ...values }),
      }).then((res) => res.json());
    },
    onMutate: () => setLoading(true),
    onSuccess: () => {
      toast({ title: "Berhasil mengirim perizinan" });
      setOpenIzinDialog(false);
      queryClient.invalidateQueries([
        "events",
        "izin",
        { userId: session.data?.user.id },
      ]);
      queryClient.invalidateQueries([
        "events",
        "hadir",
        { userId: session.data?.user.id },
      ]);
      queryClient.invalidateQueries([
        "events",
        "no-presence",
        { userId: session.data?.user.id },
      ]);
    },
    onError: (error: Error) => {
      toast({ title: "Gagal mengirim perizinan", description: error.message });
    },
    onSettled: () => setLoading(false),
  });

  function onSubmit(data: z.infer<typeof perizinanFormSchema>) {
    izinMutation.mutate(data);
  }

  function addAttachment(values: z.infer<typeof attachmentSchema>) {
    form.setValue(
      "bukti",
      form.getValues("bukti")
        ? `${form.getValues("bukti")}|${values.link}`
        : `${values.link}`
    );

    attachmentForm.reset({ link: "" }, { keepValues: false });
  }

  return (
    <AlertDialog open={openIzinDialog} onOpenChange={setOpenIzinDialog}>
      <AlertDialogTrigger asChild>
        <Button
          disabled={
            moment(new Date(eventDetails.data.date)).diff(new Date()) <
              14399999 || eventDetails.status === "izin"
            // (eventDetails.data.izin.length > 0 &&
            //   eventDetails.status === "no-presence" &&
            //   eventDetails.data.izin[0].status === "DITOLAK")
          }
          size={"sm"}
          variant={"outline"}
          className="w-full"
        >
          {eventDetails.status === "izin" ? "Izin sudah dikirim" : "Izin"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="overflow-y-auto max-h-full">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            {eventDetails.status === "izin"
              ? "Lihat Perizinan untuk " + eventDetails.data.title
              : `Izin untuk ${eventDetails.data.title}`}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left" asChild>
            {eventDetails.status === "izin" ? (
              <p>Berikut adalah data yang kamu kirimkan</p>
            ) : (
              <p>Silakan isi data yang diminta.</p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-4">
          {eventDetails.status === "izin" && (
            <div className="flex flex-col gap-2">
              <Card className="w-full flex flex-row gap-4 justify-between py-3 px-8">
                <p>
                  Status<span className="sm:inline hidden"> Perizinan</span>:
                </p>
                <Badge
                  variant={
                    eventDetails.data.izin[0].status === "DITERIMA"
                      ? "default"
                      : eventDetails.data.izin[0].status === "MENUNGGU"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {eventDetails.data.izin[0].status === "DITERIMA"
                    ? "Diterima"
                    : eventDetails.data.izin[0].status === "MENUNGGU"
                    ? "Menunggu"
                    : "Ditolak"}
                </Badge>
              </Card>
            </div>
          )}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="keterangan"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alasan Izin</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Silakan isi dengan alasan kamu mengajukan perizinan.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="tipe"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Tipe perizinan</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={"FULL"} />
                        </FormControl>
                        <FormLabel className="font-normal">Izin full</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={"MENINGGALKAN_LEBIH_AWAL"} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Izin meninggalkan lebih awal
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={"MENYUSUL"} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Izin menyusul
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="bukti"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {eventDetails.status === "izin"
                      ? "Bukti yang diupload"
                      : "Upload bukti"}
                  </FormLabel>
                  {field.value
                    ?.split("|")
                    .filter((element) => (element === "|" ? null : element))
                    .map((attachment, i) => (
                      <div key={i} className="flex flex-row w-full gap-1">
                        <Link
                          href={attachment.split("?judultugas=")[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Card className="px-5 py-4 w-max max-w-full flex flex-row gap-4 items-center group/download hover:cursor-pointer hover:border-primary">
                            <LinkIcon
                              className="group-hover/download:text-primary"
                              size={24}
                            />

                            <div className="flex flex-col gap-1">
                              <p className="font-semibold line-clamp-1">
                                {attachment.split("_").slice(1).join("_")}
                              </p>

                              <p className="text-sm opacity-50 overflow-hidden line-clamp-1">
                                {
                                  attachment
                                    .replace("https://", "")
                                    .replace("http://", "")
                                    .split("?judultugas=")[0]
                                    .split("/")[0]
                                }
                              </p>
                            </div>
                          </Card>
                        </Link>
                        <div className="h-full w-fit flex flex-col justify-start items-start">
                          <XCircleIcon
                            onClick={() => {
                              toast({
                                title: "Menghapus attachment",
                              });
                              if (field.value!.split("|").length === 1) {
                                form.setValue("bukti", "");
                                return;
                              }
                              form.setValue(
                                "bukti",
                                form
                                  .getValues("bukti")!
                                  .split("|")
                                  .filter((att) => att !== attachment)
                                  .join("|")
                              );
                            }}
                            size={16}
                            className="hover:text-destructive"
                          />
                        </div>
                      </div>
                    ))}

                  <FormControl>
                    <div className="rounded-md border border-dashed">
                      <UploadDropzone
                        key={eventDetails.data.id}
                        endpoint="izinUploader"
                        onClientUploadComplete={(data) => {
                          if (!data) return;
                          if (
                            !form.getValues("bukti") ||
                            form.getValues("bukti")?.length === 0
                          )
                            return form.setValue("bukti", data[0].fileUrl);
                          let oldBukti = form.getValues("bukti")?.split("|");
                          data.forEach((file) => {
                            oldBukti!.push(file.fileUrl);
                          });
                          form.setValue("bukti", oldBukti?.join("|"));
                        }}
                        onUploadError={(error) => {
                          toast({
                            title: "Gagal mengunggah bukti",
                            description: error.message,
                          });
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Jika ingin mengupload lebih dari satu file, silakan upload
                    satu per satu.{" "}
                    <span className="text-destructive">
                      Kamu tidak dapat menghapus/mengubah izin ketika sudah
                      menekan tombol submit, pastikan data yang kamu masukkan
                      benar.
                    </span>
                    {/* Silakan upload bukti yang otentik. Jika ingin mengupload
                    lebih dari satu file, silakan upload satu per satu. Jika
                    kamu memiliki link bukti lain, silakan masukkan link
                    tersebut pada form di bawah.{" "}
                    <span className="text-destructive">
                      Jangan lupa untuk menekan tombol + jika ingin menambahkan
                      link. Pastikan link yang kamu masukkan sudah muncul di
                      bagian atas.
                    </span> */}
                  </FormDescription>
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel className="w-full">Batal</AlertDialogCancel>
              <Button type="submit" className="w-full">
                {!loading && "Kirim"}
                {loading && <Loader2Icon className="animate-spin" size={16} />}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
        {/* <Form {...attachmentForm}>
          <form
            onSubmit={attachmentForm.handleSubmit(addAttachment)}
            className="flex flex-row gap-2 w-full items-end"
          >
            <FormField
              name="link"
              control={attachmentForm.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Masukkan link bukti kamu (jika ada)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size={"icon"} className="max-w-full">
              <PlusIcon className="shrink-0" size={24} />
            </Button>
          </form>
        </Form> */}
      </AlertDialogContent>
    </AlertDialog>
  );
}
