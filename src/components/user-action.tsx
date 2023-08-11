"use client";

import { BellDotIcon, BellIcon, Loader2Icon, LogInIcon } from "lucide-react";
import moment from "moment";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";
import { Notification, User } from "@prisma/client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, ButtonProps } from "./ui/button";
import { DropdownMenu, DropdownMenuContent } from "./ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Separator } from "./ui/separator";
import { useToast } from "./ui/toast/useToast";

interface UserActionProps extends ButtonProps {
  loginText?: string;
}

interface QueryNotification extends Notification {
  readBy: User[];
}
export default function UserAction({
  className,
  loginText = undefined,
  ...props
}: UserActionProps) {
  const { data, status } = useSession();
  const { toast } = useToast();

  const notifications = useQuery<QueryNotification[], Error>({
    queryKey: ["notifications", { id: data?.user.id }],
    queryFn: () => {
      return fetch(`/api/notifications/${data?.user.id}`).then((res) =>
        res.json()
      );
    },
    refetchInterval: 1000 * 60 * 5, // 10 minutes
  });

  const readNotification = useMutation({
    mutationKey: ["readNotification"],
    mutationFn: (id: string[] | undefined) => {
      if (!id) return Promise.resolve();
      if (data?.user.id === undefined) {
        return Promise.reject(new Error("User is not authenticated"));
      }

      return fetch(`/api/notifications/${data?.user.id}`, {
        method: "PATCH",
        body: JSON.stringify({ id }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      notifications.refetch();
    },
  });

  const unreadNotifications = notifications.data?.filter(
    (notification) =>
      !notification.readBy.some((user) => user.id === data?.user.id)
  );

  // sort by date
  const readNotifications =
    notifications.data && notifications.data.length > 3
      ? notifications.data
          ?.sort(
            (a, b) =>
              -(
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
              )
          )
          .slice(0, 3)
      : notifications.data;

  switch (status) {
    case "authenticated":
      return (
        <>
          {!(notifications.status === "error") && (
            <DropdownMenu
              // Sent a request to mark all notifications as read when the dropdown menu is opened
              onOpenChange={() =>
                readNotification.mutate(
                  unreadNotifications?.map((notif) => notif.id)
                )
              }
            >
              <DropdownMenuTrigger>
                {unreadNotifications && unreadNotifications?.length > 0 ? (
                  <BellDotIcon className="text-accent" size={24} />
                ) : (
                  <BellIcon size={24} />
                )}
              </DropdownMenuTrigger>

              <DropdownMenuContent className="text-center px-5 py-3 overflow-y-auto max-h-full text-sm max-w-sm">
                <div className="flex flex-col w-full">
                  {notifications.status === "loading" && "Loading..."}

                  {notifications.data?.length === 0 && "No notifications"}

                  {/* Unread notifications selalu di atas */}

                  {readNotifications &&
                    readNotifications.map((notification, i) => (
                      <>
                        <div
                          className={cn(
                            "flex flex-col gap-1 justify-start items-start text-left py-3"
                          )}
                          key={i}
                        >
                          <p className="text-primary font-bold">
                            {notification.title}
                          </p>
                          <p className="text-muted-foreground">
                            {notification.description}
                          </p>
                          <div className="flex flex-row gap-3 items-center text-xs mt-1">
                            <p className="opacity-50 text-primary">
                              {notification.type}
                            </p>
                            <p className="opacity-50">
                              {moment(notification.createdAt).fromNow()}
                            </p>
                          </div>
                        </div>
                        <Separator className="last:hidden" />
                      </>
                    ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:text-foreground hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent">
                  <Avatar className={cn("w-9 h-9", className)} {...props}>
                    <AvatarImage
                      src={
                        data.user?.image ??
                        "https://uploadthing.com/f/6d7f1d22-cf67-4159-a73e-48d18741a9c7_profile.png"
                      }
                    />
                    <AvatarFallback>
                      {data.user?.name?.[0] ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <Link href={`/profile/${data.user.nim}`} passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full justify-start whitespace-nowrap"
                      )}
                    >
                      Profile
                    </NavigationMenuLink>
                  </Link>
                  {data.user.role === "IT" && (
                    <Link href={"/dashboard"} passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "w-full justify-start whitespace-nowrap"
                        )}
                      >
                        Dashboard
                      </NavigationMenuLink>
                    </Link>
                  )}
                  <Link href={""} onClick={() => signOut()}>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full justify-start whitespace-nowrap"
                      )}
                    >
                      Sign Out
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </>
      );

    case "loading":
      return <Loader2Icon className={cn("animate-spin", className)} />;

    case "unauthenticated":
      return (
        <Button
          variant="ghost"
          className={cn("space-x-2", className)}
          onClick={() => signIn()}
          {...props}
        >
          <LogInIcon />
          <span>{loginText}</span>
        </Button>
      );

    default:
      return null;
  }
}
