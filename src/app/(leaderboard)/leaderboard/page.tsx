"use client";

import Container from "@/components/layout/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { H1 } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import Loading from "@/components/template/loading";
import { boardPlaceholder } from "./(components)/board-placeholder";
import { cn } from "@/lib/utils";
import Unauthenticated from "@/components/template/unauthenticated";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal } from "@/components/animation/reveal";
import { AutoReveal } from "@/components/animation/autoreveal";

export default function LeaderboardPage() {
  const { data, status } = useSession();
  const profileboard = boardPlaceholder.firstPhase; // ini ntar diganti pake data dari database
  const sortedProfileboard = profileboard.sort((a, b) => b.score - a.score);
  const userRank =
    sortedProfileboard.findIndex((profile) => profile.nim === data?.user.nim) +
    1;

  if (status === "loading") return <Loading />;
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="1">Fase 1</TabsTrigger>
            <TabsTrigger value="2">Fase 2</TabsTrigger>
          </TabsList>
          <TabsContent value="1">
            <div>
              <div className="my-4 font-semibold text-end text-sm md:text-xl flex gap-2 justify-end items-center">
                <p>Current rank: </p>
                {userRank ? (
                  <Badge
                    className={cn(
                      "text-sm",
                      userRank === 1 &&
                        "bg-amber-300 text-black hover:bg-amber-400",
                      userRank === 2 &&
                        "bg-slate-300 text-black hover:bg-slate-400",
                      userRank === 3 &&
                        "bg-yellow-700 text-black hover:bg-yellow-800"
                    )}
                  >{`#${userRank}`}</Badge>
                ) : (
                  <p>Unranked</p>
                )}
              </div>

              {sortedProfileboard.map((profile, index) => (
                <Link key={profile.userId} href={`/profile/${profile.nim}`}>
                  <Card
                    className={cn(
                      "mt-2 bg-black/40 backdrop-blur-md hover:bg-slate-950/60",
                      index === 0 && "bg-gradient-to-l from-amber-300/10",
                      index === 1 && "bg-gradient-to-l from-slate-300/10",
                      index === 2 && "bg-gradient-to-l from-yellow-700/10 mb-4"
                    )}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div className="w-4/5 md:w-max grid lg:flex gap-4 items-center">
                          <Avatar className="w-8 h-8 hidden lg:flex">
                            <AvatarImage src={profile?.image ?? undefined} />
                            <AvatarFallback>
                              {profile?.name?.[0] ?? "?"}
                            </AvatarFallback>
                          </Avatar>

                          <p
                            className={cn(
                              data?.user.nim === profile.nim
                                ? "text-accent"
                                : null,
                              index < 3
                                ? "text-sm md:text-lg font-bold"
                                : "text-sm md:text-base font-semibold"
                            )}
                          >
                            {profile.name}
                          </p>

                          <div className="flex gap-4">
                            <p className="text-foreground/40 text-xs md:text-base">{`@${profile.nim}`}</p>
                            <div className="md:hidden flex gap-4 items-center justify-end">
                              <p className="text-xs">Total Nilai:</p>
                              <p className="-ml-2 text-accent text-xs">
                                {profile.score}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 items-end md:items-center">
                          <div className="hidden md:flex gap-4 items-end justify-end">
                            <p className="text-sm">Total Nilai:</p>
                            <p className="-ml-2 text-accent text-sm">
                              {profile.score}
                            </p>
                          </div>

                          <Badge
                            className={cn(
                              index === 0 &&
                                "bg-amber-300 text-black hover:bg-amber-400 text-lg",
                              index === 1 &&
                                "bg-slate-300 text-black hover:bg-slate-400 text-lg",
                              index === 2 &&
                                "bg-yellow-700 text-black hover:bg-yellow-800 text-lg"
                            )}
                          >
                            {`#${index + 1}`}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="2">
            <div className="flex justify-center">
              <H1>Data Unavailable</H1>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
}
