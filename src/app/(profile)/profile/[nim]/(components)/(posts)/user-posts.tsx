import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getUser } from "@/lib/client-fetch";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function UserPosts({ user }: { user: User }) {
  const { data, isLoading, isError, error } = useQuery<User[], Error>({
    queryKey: ["users", Number(user.nim)],
    queryFn: async () => await getUser(Number(user.nim)),
    refetchInterval: 1000 * 60 * 60, // 1 hour
    initialData: [user],
  });

  const userData = data?.[0];

  if (isLoading) {
    return (
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-36" />
        </CardContent>
      </Card>
    );
  }
  return <div>UserPosts</div>;
}
