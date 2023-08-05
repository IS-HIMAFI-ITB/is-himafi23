"use client";

import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useViewAsStore } from "@/lib/store";
import { Role } from "@prisma/client";

export default function UserInfo() {
  const session = useSession();

  const { viewAs, setViewAs } = useViewAsStore();
  return (
    <>
      <Card className="p-4 flex flex-row gap-4 justify-center items-center">
        <Avatar className="md:w-12 md:h-12">
          <AvatarFallback>
            {session?.data?.user.name?.split(" ")[0][0] ?? (
              <Loader2Icon className="animate-spin" size={16} />
            )}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-2">
          {!session && <Skeleton className="w-24 h-4" />}

          {session && (
            <p className="line-clamp-1 font-semibold">
              {session?.data?.user.name}
            </p>
          )}

          <div className="flex flex-row flex-wrap-reverse w-full items-center gap-x-4 gap-y-2">
            <Badge>
              {!session && <Loader2Icon className="animate-spin" size={16} />}{" "}
              {session &&
                (session?.data?.user.role === Role.PESERTA ? (
                  <p>{session.data.user.role}</p>
                ) : (
                  <Select defaultValue={viewAs} onValueChange={setViewAs}>
                    <SelectTrigger className="text-sm flex flex-row gap-1 focus:ring-offset-0 w-fit h-fit px-0 py-px border-none ring-0 focus:ring-0">
                      <SelectValue placeholder={viewAs} />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value={Role.PESERTA}>
                        {Role.PESERTA}
                      </SelectItem>

                      <SelectItem value={session?.data?.user.role!}>
                        {session?.data?.user.role}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                ))}
            </Badge>

            {!session && <Skeleton className="w-24 h-4" />}

            {session && (
              <p className="line-clamp-1">{session?.data?.user.nim}</p>
            )}
          </div>
        </div>
      </Card>
    </>
  );
}
