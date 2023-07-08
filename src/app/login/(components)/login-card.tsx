import Link from "next/link";
import * as React from "react";
import { twMerge } from "tailwind-merge";

import Logo from "@/components/logo";
import ThemeSwitch from "@/components/theme-switch";
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
  return (
    <Card className={twMerge("flex-col p-6", className)}>
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
              <Input id="name" placeholder="Enter your username" />
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
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button>Log in</Button>
        <Button variant={"secondary"} className="ml-4">
          <GoogleImage height={20} width={20} />
          <span>Register with Google</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginCard;
