import { ChevronRight } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";

import { H1 } from "@/components/typography";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAnalytics, getUser } from "@/lib/server-fetch";

import AnalyticsSection from "./(components)/analytics-section";
import GreetingsSection from "./(components)/greetings";

export default async function Dashboard() {
  const { userCount, postCount } = await getAnalytics();
  /** Ambil 5 user yang terakhir terdaftar. */
  const latestUsers = await getUser(5);
  return (
    <>
      <GreetingsSection />

      <Separator className="my-6" />

      <AnalyticsSection
        initialLatestUsers={latestUsers}
        initialPostCount={postCount}
        initialUserCount={userCount}
      />

      <H1 className="my-8">Navigation</H1>

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
    </>
  );
}
