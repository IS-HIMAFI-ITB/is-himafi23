"use client";

import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast/useToast";
import { SubmissionDetailsContext } from "@/context/submission-details-provider";
import { SubmissionQuery } from "@/types/query-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const FormSchema = z.object({
  content: z
    .string()
    .min(1, {
      message: "Must be at least 1 character.",
    })
    .max(720, {
      message: "Must not be longer than 720 characters.",
    }),
});

export function CommentForm() {
  const { data, status } = useSession();
  const initialSubmissionData = useContext(SubmissionDetailsContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const queryClient = useQueryClient();
  const userData = data?.user;
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { data: submissionData, isLoading } = useQuery<SubmissionQuery, Error>({
    queryKey: ["tugasSubmission", { tugasId: params.id, userId: userData?.id }],
    queryFn: async () => {
      const res = await fetch(`/api/submissions/${userData?.id}/${params.id}`);
      return res.json();
    },
    initialData: initialSubmissionData,
  });

  const replyFeedback = useMutation({
    mutationFn: async (data: z.infer<typeof FormSchema>) => {
      return fetch("/api/submissions/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: data.content,
          authorId: userData?.id,
          submissionId: submissionData?.id,
        }),
      });
    },
    onMutate: () => {
      setLoading(true);
      toast({
        title: "Mengirim pesan...",
      });
    },
    onSuccess: () => {
      toast({
        title: "Pesan terkirim!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Gagal mengirim pesan",
        description: error.message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      form.reset();
      queryClient.invalidateQueries({
        queryKey: [
          "tugasSubmission",
          { tugasId: params.id, userId: userData?.id },
        ],
      });
      setLoading(false);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!userData) {
      return toast({
        title: "Gagal mengirim pesan",
        description: "Silakan login ulang, atau login jika belum login.",
      });
    }
    replyFeedback.mutate(data);
  }

  if (!submissionData) return null;

  return (
    <div className="flex flex-row gap-2">
      <Avatar className="w-10 h-10">
        <AvatarImage src={userData?.image ?? undefined} />
        <AvatarFallback>{userData?.name?.[0] ?? "?"}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-2 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan tanggapan feedback di sini"
                      className="resize-none backdrop-blur-sm bg-slate-950/30"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full mt-2 flex justify-end">
              <Button disabled={loading} type="submit" variant={"default"}>
                {loading ? <Loader2Icon className="animate-spin" /> : "Kirim"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
