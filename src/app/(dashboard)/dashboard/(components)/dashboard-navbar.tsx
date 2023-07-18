"use client";
import React from "react";

import ThemeSwitch from "@/components/theme-switch";
import UserAction from "@/components/user-action";
import { cn } from "@/lib/utils";

type NavbarProps = React.HTMLAttributes<HTMLDivElement>;

/** Bagian belakang navbar yang memanjang sampai ujung layar. Ini tidak mempengaruhi posisi konten dalam navbar. */
const NavbarContainer = ({ children, className, ...props }: NavbarProps) => {
  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full bg-card backdrop-blur border-b",
        className
      )}
      {...props}
    >
      {children}
    </nav>
  );
};

/** Ini div yang mengatur posisi konten pada navbar */
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

/** Ini bagian tombol navbar di sebelah kanan */
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
  return (
    <NavbarContainer>
      <NavbarContent>
        <NavbarAction>
          {/* <ThemeSwitch /> */}
          <UserAction loginText="Sign In" />
        </NavbarAction>
      </NavbarContent>
    </NavbarContainer>
  );
}
