"use client";

import { Loader2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast/useToast";
import { SubmissionDetailsContext } from "@/context/submission-details-provider";
import { SubmissionQuery } from "@/types/query-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const FormSchema = z.object({
  nilai: z.coerce
    .number()
    .gte(0, "Nilai melewati range")
    .lte(100, "Nilai melewati range"),
});

export default function InputNilai() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const initialSubmissionData = useContext(SubmissionDetailsContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const { data: submission, isLoading } = useQuery<SubmissionQuery, Error>({
    queryKey: [
      "tugasSubmission",
      { tugasId: params.id, userId: params.userId },
    ],
    queryFn: async () => {
      const res = await fetch(`/api/submissions/${params.userId}/${params.id}`);
      return res.json();
    },
    initialData: initialSubmissionData,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const nilai = useMutation({
    mutationFn: (data: z.infer<typeof FormSchema>) => {
      return fetch(`/api/submissions/nilai`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: submission?.id,
          score: data.nilai,
        }),
      });
    },
    onMutate: () => {
      setLoading(true);
      toast({
        title: "Memberikan nilai...",
      });
    },
    onSuccess: () => {
      toast({
        title: "Berhasil memberikan nilai",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Gagal memberikan nilai",
        description: error.message,
      });
    },
    onSettled: () => {
      form.reset({
        nilai: 0,
      });
      setLoading(false);
      queryClient.invalidateQueries([
        "tugasSubmission",
        { tugasId: params.id, userId: params.userId },
      ]);
      queryClient.invalidateQueries(["tugasSubmission", { id: params.id }]);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    nilai.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nilai"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Input nilai</FormLabel>
              <FormControl>
                <Input
                  placeholder="0 - 100"
                  {...field}
                  className="bg-transparent backdrop-blur-sm"
                />
              </FormControl>
              <FormDescription>
                Nilai akan diberikan kepada peserta ini
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? <Loader2Icon className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
