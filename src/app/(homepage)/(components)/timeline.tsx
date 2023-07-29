"use client";

import { H3, H4 } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import { User } from "@prisma/client";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/components/logo";
import { useSession } from "next-auth/react";
import { stat } from "fs";
import { TextareaForm } from "./text-area";
import { Badge } from "@/components/ui/badge";

export default function Timeline() {
  const { data, status } = useSession();
  const postPlaceholder = [
    {
      id: 1,
      content: "waduh 😅",
      date: "26/07/2023",
      user: "10221000",
      name: "Kumala",
      role: "MENTOR",
      image: "/google.svg",
    },
    {
      id: 2,
      content:
        "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi at vehicula ante. Nullam vitae auctor ligula. Sed rutrum nisi tellus, eu sollicitudin enim dapibus sed. Etiam sollicitudin rhoncus vehicula. Aenean quis mollis diam, id laoreet purus. Curabitur ullamcorper tempor ipsum.",
      date: "12/12/2021",
      user: "10220000",
      name: "Clara",
      role: "MENTOR",
      image: null,
    },
    {
      id: 3,
      content:
        "Phasellus ut odio vitae justo luctus pretium. Sed pellentesque, odio et molestie finibus, quam nisi accumsan mi, nec ultricies nibh lorem sit amet leo. Nam quis venenatis dolor.",
      date: "12/12/2021",
      user: "10219000",
      name: "Bronya",
      role: "KETUA",
      image: null,
    },
    {
      id: 4,
      content: "Maecenas sed ullamcorper libero.",
      date: "12/12/2021",
      user: "10222000",
      name: "Savesta",
      role: "PESERTA",
      image: null,
    },
    {
      id: 5,
      content:
        "This lists of posts are currently hardcoded. Please wait for the backend to be finished.",
      date: "12/12/2019",
      user: "10221057",
      name: "Jiro",
      role: "IT",
      image: null,
    },
  ]; // ini nanti diganti pake data dari database

  return (
    <div className="flex flex-col">
      {/*Create post area */}
      {status === "loading" && (
        <>
          <H3>Loading...</H3>
        </>
      )}

      {status === "unauthenticated" && (
        <>
          <H3>Sign in to create a new Post</H3>
        </>
      )}

      {status === "authenticated" && (
        <div>
          <div className="flex items-start gap-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={data.user.image ?? undefined} />
              <AvatarFallback>{data.user.name?.[0] ?? "?"}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-2 w-full">
              <H3>Create a new Post</H3>
              <TextareaForm />
            </div>
          </div>
          <Separator className="my-4" />
        </div>
      )}
      {/*Posts List */}
      {postPlaceholder.map((post) => (
        <div key={post.id} className="backdrop-blur-md rounded-md p-2">
          <div className="flex items-start gap-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.image ?? undefined} />
              <AvatarFallback>{post.name?.[0] ?? "?"}</AvatarFallback>
            </Avatar>
            {/* Profile Picture, ntar ganti pake avatar asli */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 flex-wrap">
                {" "}
                {/* Profile Info */}
                <p className="font-semibold text-sm lg:text-md">{post.name}</p>
                <Badge className="text-xs">{post.role}</Badge>
                <p className="text-secondary/50 text-sm lg:text-md">
                  {`@${post.user}`}
                </p>
                <p className="font-bold text-secondary/50 text-sm lg:text-md">
                  {" "}
                  ·{" "}
                </p>
                <p className="text-secondary/50 text-sm lg:text-md">
                  {post.date}
                </p>
              </div>
              <p>{post.content}</p> {/* Post Content */}
            </div>
          </div>
          <Separator className="my-4" />
        </div>
      ))}
    </div>
  );
}
