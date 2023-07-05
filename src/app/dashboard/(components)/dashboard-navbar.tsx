"use client";

import { useSession } from "next-auth/react";
import React from "react";

import ThemeSwitch from "@/components/theme-switch";
import UserAction from "@/components/user-action";
import { cn } from "@/lib/utils";

type NavbarProps = React.HTMLAttributes<HTMLDivElement>;

const NavbarContainer = ({ children, className, ...props }: NavbarProps) => {
  return (
    <nav className={cn("w-full bg-foreground/5", className)} {...props}>
      {children}
    </nav>
  );
};

const NavbarContent = ({ children, className, ...props }: NavbarProps) => {
  return (
    <div
      className={cn(
        "container py-2 flex flex-row w-full justify-between items-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const NavbarAction = ({ children, className, ...props }: NavbarProps) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-2 justify-end w-full items-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default function DashboardNavbar() {
  const { data: session } = useSession();
  return (
    <NavbarContainer>
      <NavbarContent>
        <NavbarAction>
          <ThemeSwitch />
          <UserAction loginText="Sign In" />
        </NavbarAction>
      </NavbarContent>
    </NavbarContainer>
  );
}
