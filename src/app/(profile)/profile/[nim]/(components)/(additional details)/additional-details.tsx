import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@prisma/client";

import DetailsList from "./details-list";

export default function AdditionalDetails({ user }: { user: User }) {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle className="text-xl">Info</CardTitle>
      </CardHeader>
      <CardContent>
        <DetailsList user={user} />
      </CardContent>
    </Card>
  );
}
