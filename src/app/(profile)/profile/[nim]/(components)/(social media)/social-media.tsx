import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@prisma/client";

import SocialMediaList from "./social-media-list";

export default function SocialMedia({ user }: { user: User }) {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Social Media</CardTitle>
      </CardHeader>
      <CardContent>
        <SocialMediaList initialUser={user} />
      </CardContent>
    </Card>
  );
}
