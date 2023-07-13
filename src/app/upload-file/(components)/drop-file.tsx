"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UploadDropzone } from "@/components/upload-button";
import Logo from "@/components/logo";
import ThemeSwitch from "@/components/theme-switch";
import { twMerge } from "tailwind-merge";
import "@uploadthing/react/styles.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserAction from "@/components/user-action";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast/useToast";

interface DropFileProps {
  className?: string;
}

const DropFile: React.FC<DropFileProps> = ({ className }) => {
  const { toast } = useToast();
  const { status } = useSession();

  if (status == "loading") {
    return (
      <Card className={twMerge("flex-col p-6 overflow-y-auto", className)}>
        <CardHeader>
          <ThemeSwitch />
          <div className="flex justify-center items-center">
            <Logo width={50} height={50} className="mb-2" />
          </div>
          <Skeleton className="w-[150px] h-[20px]" />
          <Skeleton className="w-[200px] h-[20px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-[240px]" />
          <Skeleton className="w-[150px] h-[10px] mt-2" />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Skeleton className="w-[75px] h-[30px] mr-4" />
        </CardFooter>
      </Card>
    );
  }

  if (status == "authenticated") {
    return (
      <Card className={twMerge("flex-col p-6 overflow-y-auto", className)}>
        <CardHeader>
          <ThemeSwitch />
          <div className="flex justify-center items-center">
            <Logo width={50} height={50} className="mb-2" />
          </div>
          <CardTitle>Upload and attach files</CardTitle>
          <CardDescription>Upload and attach your files here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 border-dashed border-2 p-4 pt-2 rounded-md border-primary/20">
              <UploadDropzone
                endpoint="fileUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  toast({
                    title: "Upload Successful",
                    description: "Your files have been uploaded",
                  });
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  toast({
                    title: "Upload failed",
                    description: "There was a problem with your upload",
                    variant: "destructive",
                  });
                }}
              />
            </div>
          </div>
          <CardDescription className="text-xs mt-2">
            Format nama: NIM_Nama_Jenis tugas.pdf
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button asChild variant="outline">
            <Link href={"/"}>Back</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }
  return (
    <Card className={twMerge("flex-col p-6 overflow-y-auto", className)}>
      <CardHeader>
        <ThemeSwitch />
        <div className="flex justify-center items-center">
          <Logo width={50} height={50} className="mb-2" />
        </div>
        <CardTitle className="flex justify-center items-center">
          You are not signed in
        </CardTitle>
        <CardDescription className="flex justify-center items-center">
          Please sign in to upload files
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button asChild variant="outline">
          <Link href={"/"}>Back</Link>
        </Button>
        <UserAction loginText="Sign In" />
      </CardFooter>
    </Card>
  );
};

export default DropFile;
