"use client"

import Image, { ImageProps } from "next/image";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import logo from "@/../public/logo.svg";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport
} from "@/components/ui/navigation-menu";
import { useNavbar } from "@/hooks/useNavbar";
import { cn } from "@/lib/utils";
import { NavigationMenuLinkProps } from "@radix-ui/react-navigation-menu";

import ThemeSwitch from "../theme-switch";
import { Button, ButtonProps } from "../ui/button";
import UserAction from "../user-action";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> { }

const NavbarContainer = ({ className, children, ...props }: NavbarProps) => {
    const { scrolled } = useNavbar()
    return <div className={cn("sticky backdrop-blur-2xl bg-background/10 backdrop-contrast-75 backdrop-brightness-150 top-0 w-full transition ease-in", scrolled && 'shadow-lg border-b bg-background/80 backdrop-contrast-100 backdrop-brightness-100', className)} {...props}>{children}</div>
}

const NavbarContent = ({ className, children, ...props }: NavbarProps) => {
    return <div className={cn("container py-4 flex flex-row items-center justify-evenly", className)} {...props}>{children}</div>
}

interface NavbarBrandProps extends ImageProps { }
const NavbarBrand = ({ className, children = null, alt, ...props }: NavbarBrandProps) => {
    return (
        <>
            <Image {...props} alt={alt} className={cn("hover:cursor-pointer", className)} />
            {children}
        </>
    )
}

const NavbarItems = ({ className, children, ...props }: NavbarProps) => {
    return <div className={cn("flex flex-row gap-2 items-center mx-auto", className)} {...props}>{children}</div>
}

type NavbarLinkProps = LinkProps & ButtonProps & { active?: boolean }
const NavbarLink = ({ className, children, href, ...props }: NavbarLinkProps) => {
    const active = (usePathname() === href)
    return (
        <Button {...props}
            variant={"link"}
            className={
                cn("hover:cursor-pointer",
                    active && "underline",
                    className)
            }
            asChild
        >
            <Link href={href}>{children}</Link>
        </Button>
    )
}

interface NavbarDropdownProps { children: React.ReactNode, trigger: React.ReactNode }
const NavbarDropdown = ({ trigger, children }: NavbarDropdownProps) => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">
                        {trigger}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        {children}
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuIndicator />
            </NavigationMenuList>
            <NavigationMenuViewport />
        </NavigationMenu>
    )
}

interface NavbarDropdownLinkProps extends NavigationMenuLinkProps { }
const NavbarDropdownLink = ({ className, children, ...props }: NavbarDropdownLinkProps) => {
    return (
        <NavigationMenuLink {...props} className={cn(navigationMenuTriggerStyle(), "w-full whitespace-nowrap justify-start")}>{children}</NavigationMenuLink>
    )
}

const NavbarSideMenu = ({ className, children, ...props }: NavbarProps) => {
    return <div className={cn("flex flex-row gap-4 items-center", className)} {...props}>{children}</div>
}

export default function Navbar() {
    return (
        <NavbarContainer>
            <NavbarContent>
                <NavbarBrand src={logo} alt="logo" width={32} height={32} />
                <NavbarItems>
                    <NavbarLink href="/">Home</NavbarLink>
                    <NavbarLink href="/materi">Materi</NavbarLink>
                    <NavbarDropdown trigger="Tentang Kami">
                        <NavbarDropdownLink href="/#latar-belakang">Latar Belakang</NavbarDropdownLink>
                        <NavbarDropdownLink href="/#visi-misi">Visi dan Misi</NavbarDropdownLink>
                        <NavbarDropdownLink href="/#organogram">Organogram</NavbarDropdownLink>
                    </NavbarDropdown>
                    <NavbarLink href="/leaderboard">Leaderboard</NavbarLink>
                </NavbarItems>
                <NavbarSideMenu>
                    <ThemeSwitch />
                    <UserAction loginText="Sign In" />
                </NavbarSideMenu>
            </NavbarContent>
        </NavbarContainer>
    )
}
