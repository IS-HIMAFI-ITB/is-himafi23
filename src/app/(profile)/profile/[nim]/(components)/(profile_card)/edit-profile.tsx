"use client";

import { Settings2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useContext } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/context/user-provider";

import EditProfileForm from "./edit-profile-form";

export default function EditProfile() {
  const session = useSession();
  const user = useContext(UserContext);

  if (session.data?.user.nim !== user.nim) return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="ml-auto p-2" variant="outline">
          <Settings2 />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <EditProfileForm />
      </AlertDialogContent>
    </AlertDialog>
  );
}
