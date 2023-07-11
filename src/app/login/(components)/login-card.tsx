"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import Container from "@/components/layout/container";
import Logo from "@/components/logo";
import Loading from "@/components/template/loading";
import ThemeSwitch from "@/components/theme-switch";
import { H1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { zodResolver } from "@hookform/resolvers/zod";

import GoogleImage from "./google-icon";

interface LoginCardProps {
  className?: string;
}

const loginSchema = z.object({
  nim: z.coerce
    .number()
    .gte(10221000, "NIM must be in range of 10221000-10222120")
    .lte(10222120, "NIM must be in range of 10221000-10222120"),
  password: z.string().nonempty("Password must not be empty"),
});

const LoginCard: React.FC<LoginCardProps> = ({ className }) => {
  const router = useRouter();
  const { status } = useSession();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const { toast } = useToast();

  function onSubmit(data: z.infer<typeof loginSchema>) {
    toast({
      title: "Logging in...",
      description:
        "Tahukah kamu bahwa Prof. Ir. R.O Kosasih adalah rektor pertama ITB? Beliau merupakan guru besar Teknik Elektro.",
    });
    signIn("credentials", { callbackUrl: "/", ...data });
  }

  if (status === "loading") return <Loading />;

  if (status === "authenticated") {
    router.replace("/");
    return (
      <Container>
        <div className="flex flex-col justify-center items-center h-screen">
          <H1>You are already logged in</H1>
        </div>
      </Container>
    );
  }

  return (
    <Card className={twMerge("flex-col p-6 overflow-y-auto", className)}>
      <CardHeader>
        <ThemeSwitch />
        <div className="flex justify-center items-center">
          <Logo className="mb-12" width={100} height={100} />
        </div>
        <CardTitle>Log In</CardTitle>
        <CardDescription>Enter your login details</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="nim"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIM</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Masukkan NIM TPB kamu"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant={"link"}
              className="text-xs -mb-5 px-0 opacity-70 justify-self-end transition"
              asChild
            >
              <Link href={""}>Forgot Password</Link>
            </Button>
          </CardContent>
          <CardFooter>
            <Button type="submit">Log in</Button>
            <Button variant={"secondary"} className="ml-4">
              <GoogleImage height={20} width={20} />
              <span>Register with Google</span>
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginCard;
