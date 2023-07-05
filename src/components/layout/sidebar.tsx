import { LayoutDashboardIcon } from "lucide-react";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import React from "react";

import logo from "@/../public/logo.svg";
import { cn } from "@/lib/utils";

import { Button, ButtonProps } from "../ui/button";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

type SidebarLinkProps = SidebarProps &
  ButtonProps & {
    href: string;
    icon?: React.ReactNode;
  };

type SidebarBrandProps = SidebarProps & ImageProps;

const SidebarContainer = ({ children, className, ...props }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "flex flex-col py-6 px-2 h-full bg-foreground/10 shadow",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
};

const SidebarContent = ({ children, className, ...props }: SidebarProps) => {
  return (
    <div
      className={cn(
        "flex flex-col mt-9 pb-4 justify-start items-start",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const SidebarBrand = ({ src, alt, ...props }: SidebarBrandProps) => {
  return (
    <Link href={"/"}>
      <Image src={src} alt={alt} {...props} />
    </Link>
  );
};

const SidebarLinks = ({
  children,
  href,
  icon,
  className,
  ...props
}: SidebarLinkProps) => {
  return (
    <Link href={href} passHref>
      <Button
        variant={"link"}
        className={cn(
          "flex flex-row items-center gap-2 [&>svg]:hover:fill-foreground",
          className
        )}
        {...props}
      >
        {icon} {children}
      </Button>
    </Link>
  );
};

const SidebarAction = ({ children, className, ...props }: SidebarProps) => {
  return (
    <div className={cn("mt-auto", className)} {...props}>
      {children}
    </div>
  );
};

export default function Sidebar() {
  return (
    <SidebarContainer>
      <SidebarBrand
        src={logo}
        alt="IS HIMAFI 2023"
        width={40}
        height={40}
        className="mx-auto"
      />
      <SidebarContent>
        <SidebarLinks href="/dashboard" icon={<LayoutDashboardIcon />} />
      </SidebarContent>
    </SidebarContainer>
  );
}
