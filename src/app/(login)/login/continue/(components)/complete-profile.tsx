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

interface CompleteProfileProps {
  className?: string;
}

const CompleteProfile: React.FC<CompleteProfileProps> = ({ className }) => {
  return (
    <Card className={twMerge("flex-col p-6", className)}>
      <CardHeader>
        {/* <ThemeSwitch /> */}
        <div className="flex justify-center items-center">
          <Logo className="mb-12" width={100} height={100} />
        </div>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>
          Complete the remaining data to continue registration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" placeholder="Masukkan nama lengkap" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">NIM</Label>
              <Input id="name" placeholder="Masukkan NIM" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nomor HP</Label>
              <Input
                id="name"
                placeholder="Masukkan nomor HP yang dapat dihubungi"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button>Continue</Button>
        <Button
          variant={"secondary"}
          asChild
          className="ml-2 bg-secondary hover:bg-destructive"
        >
          <Link href={"/login"}>Back</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompleteProfile;
