import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Posts from "./posts";

export default function UserPosts() {
  return (
    <Card className="bg-background w-[370px] lg:w-[836px] xl:w-[1136px]">
      <CardHeader>
        <CardTitle>Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <Posts />
      </CardContent>
    </Card>
  );
}
