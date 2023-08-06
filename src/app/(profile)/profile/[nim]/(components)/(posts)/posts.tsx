"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getUser } from "@/lib/client-fetch";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function Posts({ initialUser }: { initialUser: User }) {
  const { data, isLoading, isError, error } = useQuery<User[], Error>({
    queryKey: ["users", Number(initialUser.nim)],
    queryFn: async () => await getUser(Number(initialUser.nim)),
    refetchInterval: 1000 * 60 * 60, // 1 hour
    initialData: [initialUser],
  });

  const user = data?.[0];
  const postPlaceholder = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet. ",
      content: "waduh 😅",
      date: "26/07/2023",
    },
    {
      id: 2,
      title: "Consectetur adipiscing. ",
      content:
        "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi at vehicula ante. Nullam vitae auctor ligula. Sed rutrum nisi tellus, eu sollicitudin enim dapibus sed. Etiam sollicitudin rhoncus vehicula. Aenean quis mollis diam, id laoreet purus. Curabitur ullamcorper tempor ipsum.",
      date: "12/12/2021",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      content:
        "Phasellus ut odio vitae justo luctus pretium. Sed pellentesque, odio et molestie finibus, quam nisi accumsan mi, nec ultricies nibh lorem sit amet leo. Nam quis venenatis dolor.",
      date: "12/12/2021",
    },
    {
      id: 4,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      content: "Maecenas sed ullamcorper libero.",
      date: "12/12/2021",
    },
  ]; // ini nanti diganti pake data dari database

  if (isLoading) {
    return <Skeleton className="w-full h-36" />;
  }

  if (isError) {
    return <p>Error! {error?.message}</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {postPlaceholder.map((post) => (
        <div key={post.id}>
          <div className="flex items-start gap-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user.image ?? undefined} />
              <AvatarFallback>{user.name?.[0] ?? "?"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 flex-wrap">
                {" "}
                {/* Profile Info */}
                <p className="font-semibold text-sm lg:text-md">{user.name}</p>
                <p className="text-secondary/50 text-sm lg:text-md">{`@${user.nim}`}</p>
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
