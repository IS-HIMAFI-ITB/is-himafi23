"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

//create form schema with a message
const passSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().nonempty("This field must not be empty"),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password tidak sama",
        path: ["confirmPassword"],
      });
    }
  });

export default function EditProfile({ userData }: { userData: User[] }) {
  const passForm = useForm<z.infer<typeof passSchema>>({
    resolver: zodResolver(passSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof passSchema>) {
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <>
      <AlertDialogHeader>Edit Profile</AlertDialogHeader>
      {/*add div to change profile avatar */}
      <div className="flex justify-center gap-6 items-center">
        <div className="rounded-full relative group overflow-hidden">
          <Avatar className="w-20 h-20 text-3xl z-0 group-hover:cursor-pointer">
            <AvatarImage src={userData[0].image ?? undefined} />
            <AvatarFallback>{userData[0].name?.[0] ?? "?"}</AvatarFallback>
          </Avatar>
          <div className="bg-gray-200/60 w-full h-full hidden group-hover:flex justify-center absolute z-20 top-12 text-background group-hover:cursor-pointer">
            <Camera className="mt-0.5" />
          </div>
          {/*tumpukkin lagi aja div buat button/link */}
        </div>
      </div>
      <div className="w-full">
        <Form {...passForm}>
          <form
            onSubmit={passForm.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={passForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="New Password"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={passForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Save Password
            </Button>
            <AlertDialogCancel className="w-full">
              Close (Unsaved changes will be lost!)
            </AlertDialogCancel>
          </form>
        </Form>
      </div>
    </>
  );
}
