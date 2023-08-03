"use client";

import Container from "@/components/layout/container";
import { H1 } from "@/components/typography";
import { useSession } from "next-auth/react";
import Loading from "@/components/template/loading";
import Unauthenticated from "@/components/template/unauthenticated";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FirstLeaderboard from "./(components)/first-leaderboard";
import SecondLeaderboard from "./(components)/second-leaderboard";
import ThirdLeaderboard from "./(components)/third-leaderboard";
import { Skeleton } from "@/components/ui/skeleton";

export default function LeaderboardPage() {
  const { status } = useSession();

  if (status === "loading")
    return (
      <Container className="py-12">
        <Loading />
      </Container>
    );

  if (status === "unauthenticated") return <Unauthenticated />;

  return (
    <Container className="py-12">
      <div>
        <div className="flex before:content-['Leaderboard'] before:absolute before:text-accent before:-z-20 before:text-5xl before:font-bold before:-translate-y-0.5 md:before:-translate-x-1 mb-2 justify-center md:justify-start">
          <H1 className="text-5xl">Leaderboard</H1>
        </div>
        <div className="flex text-center md:text-start mb-6">
          <p className="font-semibold">
            Berikut adalah leaderboard untuk peserta Intellektuelle Schule
            HIMAFI ITB 2023
          </p>
        </div>
        <Separator className="mb-6" />

        <Tabs defaultValue="1">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="1">Tahap Pencerahan</TabsTrigger>
            <TabsTrigger value="2">Tahap Penguatan</TabsTrigger>
            <TabsTrigger value="3">Tahap Berkarya</TabsTrigger>
          </TabsList>
          <TabsContent value="1">
            <FirstLeaderboard />
          </TabsContent>
          <TabsContent value="2">
            <SecondLeaderboard />
          </TabsContent>
          <TabsContent value="3">
            <ThirdLeaderboard />
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
}
