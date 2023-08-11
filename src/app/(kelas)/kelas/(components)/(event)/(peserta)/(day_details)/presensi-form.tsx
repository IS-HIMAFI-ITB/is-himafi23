"use client";

import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast/useToast";
import { QueryEvent } from "@/hooks/useEventQuery";
import { useOpenDialogStore } from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function PresensiForm({
  eventDetails,
}: {
  eventDetails: QueryEvent;
}) {
  const [loading, setLoading] = useState(false);
  const { value: openPresensiDialog, setValue: setOpenPresensiDialog } =
    useOpenDialogStore();
  const presensiFormSchema = z.object({
    kodePresensi: z
      .string({ required_error: "Tidak boleh kosong." })
      .superRefine((values, ctx) => {
        // if not equal to eventDetails.presensiQuestionAnswer (case insensitive), throw error
        if (
          values.toLowerCase() !==
          eventDetails.presensiQuestionAnswer?.toLowerCase()
        ) {
          return ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Kode presensi salah",
          });
        }
      }), // equal to eventDetails.presensiQuestionAnswer
  });

  const session = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const isiPresensi = useMutation({
    mutationKey: [
      "presensi",
      { nim: session.data?.user.nim, eventId: eventDetails.id },
    ],
    mutationFn: () =>
      fetch(`/api/event/users/${session.data?.user.nim}/hadir`, {
        method: "POST",
        body: JSON.stringify({ eventId: eventDetails.id }),
      }).then((res) => res.json()),
    onMutate: () => setLoading(true),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "events",
        "hadir",
        { userId: session.data?.user.id },
      ]);
      queryClient.invalidateQueries([
        "events",
        "izin",
        { userId: session.data?.user.id },
      ]);
      queryClient.invalidateQueries([
        "events",
        "no-presence",
        { userId: session.data?.user.id },
      ]);
      setOpenPresensiDialog(false);
      toast({ title: "Berhasil melakukan presensi" });
    },
    onError: (error: Error) => {
      toast({ title: "Error!", description: `${error.message}` });
    },
    onSettled: () => setLoading(false),
  });

  const form = useForm<z.infer<typeof presensiFormSchema>>({
    resolver: zodResolver(presensiFormSchema),
  });

  function onSubmit() {
    isiPresensi.mutate();
  }

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>
          <h3 className="font-semibold text-lg line-clamp-1">
            {eventDetails.title}
          </h3>
        </AlertDialogTitle>
        <AlertDialogDescription>
          Masukkan kode presensi yang diberikan.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="kodePresensi"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode Presensi</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="ghost" className="w-full">
                Cancel
              </Button>
            </AlertDialogCancel>
            <Button
              disabled={loading}
              onClick={form.handleSubmit(onSubmit)}
              className="w-full"
            >
              {loading ? (
                <Loader2Icon className="animate-spin" size={16} />
              ) : (
                "Submit"
              )}
            </Button>
          </AlertDialogFooter>
        </form>
      </Form>
    </>
  );
}
