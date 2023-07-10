import { ChevronRight } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";

import { H1 } from "@/components/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAnalytics, getUser } from "@/lib/server-fetch";

import GreetingsSection from "./(components)/greetings";

export default async function Dashboard() {
  const { userCount, postCount } = await getAnalytics();
  const latestUsers = await getUser(5);
  return (
    <>
      <GreetingsSection />
      <Separator className="my-6" />
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
              <p className="text-xl font-bold">{userCount} akun</p>
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
              <p className="text-xl font-bold">{postCount} konten</p>
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
            {latestUsers.map((user) => {
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
            })}
          </CardContent>
        </Card>
        <H1 className="mt-8">Navigation</H1>
        <div className="flex flex-col sm:flex-row gap-6">
          <Link href="/dashboard/contents" className="w-full">
            <Card className="w-full h-full group/card hover:bg-card-foreground/5">
              <div className="flex flex-row justify-between items-center">
                <CardHeader>
                  <CardTitle>Content Dashboard</CardTitle>
                  <CardDescription>
                    Kelola konten yang ada di halaman depan.
                  </CardDescription>
                </CardHeader>
                <ChevronRight className="sm:inline hidden mr-6 group-hover/card:translate-x-2 transition ease-out" />
              </div>
            </Card>
          </Link>
          <Link href="/dashboard/users" className="w-full">
            <Card className="w-full h-full group/card hover:bg-card-foreground/5">
              <div className="flex flex-row justify-between items-center">
                <CardHeader>
                  <CardTitle>Account Dashboard</CardTitle>
                  <CardDescription>
                    Kelola akun yang terdaftar di aplikasi.
                  </CardDescription>
                </CardHeader>
                <ChevronRight className="sm:inline hidden mr-6 group-hover/card:translate-x-2 transition ease-out" />
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </>
  );
}
