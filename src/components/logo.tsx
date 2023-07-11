"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

import logo from "@/../public/logo-bulet.svg";
import logoDark from "@/../public/logo.svg";

interface LogoProps {
  width: number;
  height: number;
  src?: string;
  alt?: string;
  className?: string;
}
const Logo = ({ width, height, src, className, alt = "logo" }: LogoProps) => {
  const { theme } = useTheme();
  return (
    <Image
      className={className}
      src={src ? src : theme === "dark" ? logoDark : logo}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

export default Logo;
