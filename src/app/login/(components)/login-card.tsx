"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import GoogleImage from "./google-icon";

interface LoginCardProps {
  className?: string;
}

const LoginCard: React.FC<LoginCardProps> = ({ className }) => {
  const router = useRouter();
  const { status } = useSession();
  const [form, setForm] = useState({
    nim: Number(),
    password: "",
  });

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
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Username</Label>
              <Input
                id="name"
                placeholder="Enter your username"
                onChange={(e) =>
                  setForm({ ...form, nim: Number(e.target.value) })
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">
                <div className="flex flex-row justify-between">
                  <span>Password</span>
                  <Button
                    variant={"link"}
                    className="text-xs -mt-3 -mb-5 px-0 opacity-70 justify-self-end transition"
                    asChild
                  >
                    <Link href={""}>Forgot Password</Link>
                  </Button>
                </div>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() =>
            signIn("credentials", {
              nim: form.nim,
              password: form.password,
              callbackUrl: "/",
            })
          }
        >
          Log in
        </Button>
        <Button variant={"secondary"} className="ml-4">
          <GoogleImage height={20} width={20} />
          <span>Register with Google</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginCard;
