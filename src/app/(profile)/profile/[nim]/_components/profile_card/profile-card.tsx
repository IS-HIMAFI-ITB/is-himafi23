import React from "react";

import { H3 } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User } from "@prisma/client";

import EditProfile from "./edit-profile";
import UserAvatar from "./user-avatar";

export default function ProfileCard({ user }: { user: User }) {
  return (
    <Card className="w-full lg:w-[600px] xl:w-[900px] bg-background">
      <CardHeader>
        <UserAvatar />
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="lg:flex">
            <H3 className="lg:text-2xl">{user.name}</H3>

            <EditProfile />
          </div>

          <div className="flex gap-2">
            <p className="text-secondary/60 text-sm relative translate-y-[1px]">
              {`@${user.nim}`}
            </p>

            <p className="relative font-extrabold"> · </p>

            <Badge>{user.role}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
