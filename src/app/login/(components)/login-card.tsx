"use client";

import { Loader2Icon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import Container from "@/components/layout/container";
import Logo from "@/components/logo";
import Loading from "@/components/template/loading";
import ThemeSwitch from "@/components/theme-switch";
import { H1, P } from "@/components/typography";
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
  nim: z.union([
    z.coerce
      .number()
      .gte(10221000, "Format NIM salah")
      .lte(10222120, "Format NIM salah"),
    z.coerce
      .number()
      .gte(16022001, "Format NIM salah")
      .lte(16022999, "Format NIM salah"),
  ]),
  password: z.string().nonempty("Password must not be empty"),
});

const LoginCard: React.FC<LoginCardProps> = ({ className }) => {
  const router = useRouter();
  const { status } = useSession();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      ...data,
    });

    if (res?.error) {
      setLoading(false);
      toast({
        title: "Failed to login",
        description: res.error,
        variant: "destructive",
      });
    }
  }

  if (status === "loading") return <Loading />;

  if (status === "authenticated") {
    router.replace("/");
    return (
      <Container>
        <div className="flex flex-col justify-center items-center h-screen">
          <H1>You are already logged in</H1>
          <P>Please wait, we are redirecting you</P>
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
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2Icon className="animate-spin" /> : "Log in"}
            </Button>
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
