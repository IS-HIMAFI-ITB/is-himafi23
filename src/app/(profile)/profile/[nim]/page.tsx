// Nanti buat params id ini bakal pake NIM, jadi klo mau liat profile orang lain tinggal masukin NIMnya aja, sama kalo pake UUID ribet awikwok
"use client";

import { H1, H3 } from "@/components/typography";
import Container from "@/components/layout/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Settings2, Camera } from "lucide-react";
import { getUser } from "@/lib/client-fetch";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import UserPosts from "./(components)/user-posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Unauthenticated from "@/components/template/unauthenticated";
import { motion } from "framer-motion";

export default function ProfilePage({ params }: { params: { nim: number } }) {
  const session = useSession();
  const { data, isLoading, isError, error } = useQuery<User[], Error>({
    queryKey: ["users", params.nim],
    queryFn: async () => await getUser(params.nim),
    refetchInterval: 1000 * 60 * 60, // 1 hour
  });

  if (session.status === "unauthenticated") return <Unauthenticated />;

  if (isLoading)
    //Return skeleton
    return (
      <Container className="min-h-[calc(100vh-72.6px-4rem)] h-screen flex flex-col gap-3 justify-center w-max">
        <div className="flex flex-col md:flex-row gap-4 mt-40">
          <Card className="w-full lg:w-[900px] bg-background">
            <CardHeader>
              <div className="rounded-full w-20 h-20 text-black flex items-center justify-center">
                <Skeleton className="w-20 h-20 rounded-full" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="flex">
                  <Skeleton className="w-64 h-8" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="w-20 h-4" />
                  <Skeleton className="w-8 h-4" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background">
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {/* ini ntar ganti pake array dari database kalo udah ada*/}

                <Skeleton className="w-32 h-3" />
                <Skeleton className="w-32 h-3" />

                <Skeleton className="w-32 h-3" />
                <Skeleton className="w-32 h-3" />
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-background">
          <CardHeader>
            <CardTitle className="text-xl">Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Skeleton className="w-40 h-4" />
              <Skeleton className="w-40 h-4" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-36" />
          </CardContent>
        </Card>
      </Container>
    );

  if (isError) return <H1>Error: {error?.message}</H1>;

  return (
    <Container className="min-h-[calc(100vh-72.6px-4rem)] h-full flex flex-col gap-3 justify-center w-max">
      <motion.div
        className="flex flex-col lg:flex-row gap-4 justify-between mt-40"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
          delay: 0,
        }}
      >
        <Card className="w-full lg:w-[600px] xl:w-[900px] bg-background">
          <CardHeader>
            <Avatar className="w-20 h-20 text-3xl">
              <AvatarImage src={data[0].image ?? undefined} />
              <AvatarFallback>{data[0].name?.[0] ?? "?"}</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="lg:flex">
                <H3 className="lg:text-2xl">{data[0].name}</H3>
                {session.status === "authenticated" &&
                  session.data?.user.nim === data[0].nim && (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button className="ml-auto p-2" variant="outline">
                          <Settings2 />
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-max">
                        <p className="text-xs">Edit profile</p>
                      </HoverCardContent>
                    </HoverCard>
                  )}
              </div>
              <div className="flex gap-2">
                <p className="text-secondary/60 text-sm relative translate-y-[1px]">
                  {`@${data[0].nim}`}
                </p>
                <p className="relative font-extrabold"> · </p>
                <Badge>{data[0].role}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {/* ini ntar ganti pake array dari database kalo udah ada*/}
              <div className="flex justify-between gap-6 w-full text-sm">
                <p className="font-semibold">Instagram</p>
                <p>@username</p>
              </div>
              <div className="flex justify-between gap-6 w-full text-sm">
                <p className="font-semibold">LINE</p>
                <p>@username</p>
              </div>
              <div className="flex justify-between gap-6 w-full text-sm">
                <p className="font-semibold">Twitter</p>
                <p>@username</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
          delay: 0.2,
        }}
      >
        <Card className="bg-background">
          <CardHeader>
            <CardTitle className="text-xl">Info</CardTitle>
          </CardHeader>
          <CardContent>
            {/*ntar bisa ditambah lagi */}
            <div>
              <span>Nomor HP: </span>
              <span>{data[0].phoneNumber}</span>
            </div>
            <div>
              <span>Alamat: </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
          delay: 0.4,
        }}
      >
        <Card className="bg-background w-[370px] lg:w-[836px] xl:w-[1136px]">
          <CardHeader>
            <CardTitle>Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <UserPosts data={data} />
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
}
