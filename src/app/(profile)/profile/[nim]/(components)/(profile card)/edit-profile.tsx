import { Settings2 } from "lucide-react";
import { getServerSession } from "next-auth";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";

import EditProfileForm from "./edit-profile-form";

export default async function EditProfile({ user }: { user: User }) {
  const session = await getServerSession();

  if (!session || session.user.nim !== user.nim) {
    return null;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="ml-auto p-2" variant="outline">
          <Settings2 />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <EditProfileForm user={user} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
