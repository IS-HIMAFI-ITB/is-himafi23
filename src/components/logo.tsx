import Image from "next/image";

import logo from "@/../public/logo.svg";
import { cn } from "@/lib/utils";

interface LogoProps {
  width: number;
  height: number;
  src?: string;
  alt?: string;
  className?: string;
  withBackground?: boolean;
}
const Logo = ({
  width,
  height,
  src = logo,
  className,
  alt = "logo",
  withBackground = false,
  ...props
}: LogoProps) => {
  if (withBackground) {
    return (
      <div className={cn(`rounded-full dark:bg-foreground p-3`, className)}>
        <Image src={src} alt={alt} width={width} height={height} />
      </div>
    );
  }

  return (
    <Image
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

export default Logo;
