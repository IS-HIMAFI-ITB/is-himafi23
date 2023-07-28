"use client";

import { BellIcon, Loader2Icon, LogInIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

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
import { useToast } from "./ui/toast/useToast";

interface UserActionProps extends ButtonProps {
  loginText?: string;
}
export default function UserAction({
  className,
  loginText = undefined,
  ...props
}: UserActionProps) {
  const { data, status } = useSession();
  const { toast } = useToast();

  switch (status) {
    case "authenticated":
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BellIcon size={24} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-center px-5 py-3 text-sm">
              No unread notification
            </DropdownMenuContent>
          </DropdownMenu>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:text-foreground hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent">
                  <Avatar className={cn("w-9 h-9", className)} {...props}>
                    <AvatarImage src={data.user?.image ?? undefined} />
                    <AvatarFallback>
                      {data.user?.name?.[0] ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <Link href={"/#profile"} passHref>
                    <NavigationMenuLink
                      onClick={() => {
                        toast({ title: "Coming Soon" });
                      }}
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
