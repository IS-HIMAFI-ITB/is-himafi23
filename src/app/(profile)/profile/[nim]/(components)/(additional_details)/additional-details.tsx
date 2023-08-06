import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import DetailsList from "./details-list";

export default function AdditionalDetails() {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle className="text-xl">Info</CardTitle>
      </CardHeader>
      <CardContent>
        <DetailsList />
      </CardContent>
    </Card>
  );
}
