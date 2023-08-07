import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import SocialMediaList from "./social-media-list";

export default function SocialMedia() {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Social Media</CardTitle>
      </CardHeader>
      <CardContent>
        <SocialMediaList />
      </CardContent>
    </Card>
  );
}
