"use client";

import moment from "moment";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getAnalytics, getUser } from "@/lib/client-fetch";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

interface Analytics {
  userCount: string | number;
  postCount: string | number;
}

export default function AnalyticsSection({
  initialUserCount,
  initialPostCount,
  initialLatestUsers,
}: {
  initialUserCount: string | number;
  initialPostCount: string | number;
  initialLatestUsers: User[];
}) {
  const { data: analytics, isLoading: analyticsIsLoading } = useQuery<
    Analytics,
    Error
  >({
    queryKey: ["analytics"],
    queryFn: getAnalytics,
    initialData: {
      userCount: initialUserCount,
      postCount: initialPostCount,
    },
  });

  const { data: latestUsers, isLoading: latestUsersIsLoading } = useQuery<
    User[],
    Error
  >({
    queryKey: ["users", { limit: 5 }],
    queryFn: () => getUser(undefined, 5),
    initialData: initialLatestUsers,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex sm:flex-row flex-col w-full gap-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Jumlah Akun</CardTitle>
            <CardDescription>
              Jumlah akun yang terdaftar di aplikasi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {analyticsIsLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <p className="text-xl font-bold">{analytics?.userCount} akun</p>
            )}
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Jumlah Konten</CardTitle>
            <CardDescription>
              Jumlah konten yang ada di halaman depan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {analyticsIsLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <p className="text-xl font-bold">{analytics?.postCount} konten</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Akun Terbaru</CardTitle>
          <CardDescription>
            Akun yang baru saja terdaftar di aplikasi.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {latestUsersIsLoading ? (
            <Skeleton className="h-20 w-full" />
          ) : (
            latestUsers?.map((user) => {
              return (
                <div key={user.id} className="flex flex-row gap-4 items-center">
                  <Avatar>
                    <AvatarImage src={user.image ?? undefined} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-px">
                    <p className="font-bold">{user.name}</p>
                    <p className="text-sm">
                      {user.email}
                      <span className="mx-2">&middot;</span>
                      <span className="text-xs">
                        {moment(user.createdAt).format("LLL")}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
