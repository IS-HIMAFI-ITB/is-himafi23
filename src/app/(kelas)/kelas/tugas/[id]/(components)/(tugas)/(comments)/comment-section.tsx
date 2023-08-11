"use client";

import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const FormSchema = z.object({
  content: z
    .string()
    .min(1, {
      message: "Reply must be at least 1 character.",
    })
    .max(720, {
      message: "Reply must not be longer than 720 characters.",
    }),
});

export function CommentForm() {
  const { data, status } = useSession();
  const userData = data?.user;
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const params = useParams();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const postComment = useMutation({
    mutationFn: async (data: z.infer<typeof FormSchema>) => {
      return fetch(`/api/posts/tugas/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: data.content,
          authorId: userData?.id,
          tugasId: params.id,
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
      form.reset({
        content: "",
      });
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
      queryClient.invalidateQueries({
        queryKey: ["tugas", { id: params.id }],
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
    postComment.mutate(data);
  }

  return (
    <div className="flex flex-row gap-2 mt-2">
      <Avatar>
        <AvatarImage
          className="bg-cover"
          src={
            userData?.image ??
            "https://uploadthing.com/f/6d7f1d22-cf67-4159-a73e-48d18741a9c7_profile.png"
          }
        />
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
                      placeholder="Masukkan pertanyaan/komentar kamu di sini"
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
