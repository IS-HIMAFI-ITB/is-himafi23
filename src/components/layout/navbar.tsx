"use client";

import { MenuIcon } from "lucide-react";
import Image, { ImageProps } from "next/image";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import logo from "@/../public/logo-bulet.svg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavbar } from "@/hooks/useNavbar";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { cn } from "@/lib/utils";
import {
  NavigationMenuLinkProps,
  NavigationMenuProps,
} from "@radix-ui/react-navigation-menu";

import ThemeSwitch from "../theme-switch";
import { Button, ButtonProps } from "../ui/button";
import { useToast } from "../ui/toast/useToast";
import UserAction from "../user-action";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

const NavbarContainer = ({ className, children, ...props }: NavbarProps) => {
  const { scrolled } = useNavbar();
  const isHome = usePathname() === "/";
  return (
    <nav
      className={cn(
        !isHome &&
          "sticky backdrop-blur-2xl backdrop-contrast-75 backdrop-brightness-150 top-0 w-full z-50",
        scrolled &&
          "shadow-lg border-b bg-background/80 backdrop-contrast-100 backdrop-brightness-100",
        !scrolled && "bg-skyBackground",
        className
      )}
      {...props}
    >
      {children}
    </nav>
  );
};

const NavbarContent = ({ className, children, ...props }: NavbarProps) => {
  return (
    <div
      className={cn(
        "container py-4 flex flex-row items-center justify-between",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface NavbarBrandProps extends ImageProps {}
const NavbarBrand = ({
  className,
  children = null,
  alt,
  ...props
}: NavbarBrandProps) => {
  return (
    <span className="flex flex-row gap-4 md:w-1/4 items-center">
      <Image
        {...props}
        alt={alt}
        className={cn("hover:cursor-pointer", className)}
      />
      {children}
    </span>
  );
};

const NavbarItems = ({ className, children, ...props }: NavbarProps) => {
  return (
    <div
      className={cn("flex flex-row gap-2 items-center mx-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
};

type NavbarLinkProps = LinkProps & ButtonProps & { active?: boolean };
const NavbarLink = ({
  className,
  children,
  href,
  ...props
}: NavbarLinkProps) => {
  const active = usePathname() === href;
  return (
    <Button
      {...props}
      variant={"ghost"}
      className={cn("hover:cursor-pointer", active && "shadow-md", className)}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

interface NavbarDropdownProps extends NavigationMenuProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
}
const NavbarDropdown = ({
  trigger,
  children,
  ...props
}: NavbarDropdownProps) => {
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            {trigger}
          </NavigationMenuTrigger>
          <NavigationMenuContent>{children}</NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuIndicator />
      </NavigationMenuList>
      <NavigationMenuViewport />
    </NavigationMenu>
  );
};

interface NavbarDropdownLinkProps extends NavigationMenuLinkProps {}
const NavbarDropdownLink = ({
  className,
  children,
  ...props
}: NavbarDropdownLinkProps) => {
  return (
    <NavigationMenuLink
      {...props}
      className={cn(
        navigationMenuTriggerStyle(),
        "w-full whitespace-nowrap justify-start"
      )}
    >
      {children}
    </NavigationMenuLink>
  );
};

const NavbarSideMenu = ({ className, children, ...props }: NavbarProps) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-4 justify-end items-center md:w-1/4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default function Navbar() {
  const { width } = useWindowDimensions();
  const isMobile = width! <= 900 ?? undefined;
  const { toast } = useToast();

  switch (isMobile) {
    case true:
      return (
        <NavbarContainer>
          <NavbarContent>
            <Sheet>
              <SheetTrigger>
                <MenuIcon />
              </SheetTrigger>
              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle>
                    <NavbarBrand src={logo} alt="logo" width={32} height={32}>
                      <p className="text-base text-left">
                        Intellektuelle Schulle
                      </p>
                    </NavbarBrand>
                  </SheetTitle>
                </SheetHeader>
                <NavbarContent className="flex-col gap-4 px-0 items-start">
                  <NavbarLink href="/">Home</NavbarLink>
                  <NavbarLink href="/tugas">Tugas</NavbarLink>
                  <NavbarDropdown
                    tabIndex={0}
                    orientation="vertical"
                    trigger="Tentang Kami"
                  >
                    <NavbarDropdownLink
                      onClick={() => {
                        toast({ title: "Coming Soon" });
                      }}
                      href="/#latar-belakang"
                    >
                      Latar Belakang
                    </NavbarDropdownLink>
                    <NavbarDropdownLink
                      onClick={() => {
                        toast({ title: "Coming Soon" });
                      }}
                      href="/#visi-misi"
                    >
                      Visi dan Misi
                    </NavbarDropdownLink>
                    <NavbarDropdownLink
                      onClick={() => {
                        toast({ title: "Coming Soon" });
                      }}
                      href="/#organogram"
                    >
                      Organogram
                    </NavbarDropdownLink>
                  </NavbarDropdown>
                  <NavbarLink
                    onClick={() => {
                      toast({ title: "Coming Soon" });
                    }}
                    href=""
                  >
                    Leaderboard
                  </NavbarLink>
                </NavbarContent>
              </SheetContent>
            </Sheet>
            <NavbarSideMenu>
              {/* <ThemeSwitch /> */}
              <UserAction loginText="Sign In" />
            </NavbarSideMenu>
          </NavbarContent>
        </NavbarContainer>
      );

    case false:
      return (
        <NavbarContainer>
          <NavbarContent>
            <NavbarBrand src={logo} alt="logo" width={40} height={40}>
              {/* <p className="font-bold leading-tight tracking-wider">
                IS HIMAFI 23
                <br />
                <span className="text-xs font-light tracking-normal">
                  Intellektuelle Schulle
                </span>
              </p> */}
            </NavbarBrand>
            <NavbarItems>
              <NavbarLink href="/">Home</NavbarLink>
              <NavbarLink href="/tugas">Tugas</NavbarLink>
              <NavbarDropdown trigger="Tentang Kami">
                <NavbarDropdownLink
                  onClick={() => {
                    toast({ title: "Coming Soon" });
                  }}
                  href="/#latar-belakang"
                >
                  Latar Belakang
                </NavbarDropdownLink>
                <NavbarDropdownLink
                  onClick={() => {
                    toast({ title: "Coming Soon" });
                  }}
                  href="/#visi-misi"
                >
                  Visi dan Misi
                </NavbarDropdownLink>
                <NavbarDropdownLink
                  onClick={() => {
                    toast({ title: "Coming Soon" });
                  }}
                  href="/#organogram"
                >
                  Organogram
                </NavbarDropdownLink>
              </NavbarDropdown>
              <NavbarLink
                onClick={() => {
                  toast({ title: "Coming Soon" });
                }}
                href=""
              >
                Leaderboard
              </NavbarLink>
            </NavbarItems>
            <NavbarSideMenu>
              {/* <ThemeSwitch /> */}
              <UserAction loginText="Sign In" />
            </NavbarSideMenu>
          </NavbarContent>
        </NavbarContainer>
      );

    default:
      return null;
  }
}
