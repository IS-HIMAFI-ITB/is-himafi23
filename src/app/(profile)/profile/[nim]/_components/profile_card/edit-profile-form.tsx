"use client";

import { Camera } from "lucide-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  AlertDialogCancel,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { UserContext } from "@/context/user-provider";
import { zodResolver } from "@hookform/resolvers/zod";

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

export default function EditProfileForm() {
  const user = useContext(UserContext);

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
            <AvatarImage
              className="bg-cover"
              src={
                user.image ??
                "https://uploadthing.com/f/6d7f1d22-cf67-4159-a73e-48d18741a9c7_profile.png"
              }
            />
            <AvatarFallback>{user.name?.[0] ?? "?"}</AvatarFallback>
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
