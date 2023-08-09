"use client";

import Link from "next/link";
import { useContext } from "react";
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
import UserProvider, { UserContext } from "@/context/user-provider";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  content: z
    .string()
    .min(10, {
      message: "Reply must be at least 10 characters.",
    })
    .max(720, {
      message: "Reply must not be longer than 720 characters.",
    }),
});

export function CommentForm() {
  const userData = useContext(UserContext);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

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
                      placeholder="Masukkan reply untuk grader disini"
                      className="resize-none backdrop-blur-sm bg-slate-950/30"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full mt-2 flex justify-end">
              <Button
                type="submit"
                variant={"default"}
                className="rounded-full"
              >
                Reply
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
