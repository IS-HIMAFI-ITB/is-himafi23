import Image from "next/image";

import google from "@/../public/google.svg";
import { cn } from "@/lib/utils";

interface LogoProps {
  width: number;
  height: number;
  src?: string;
  alt?: string;
  className?: string;
}

const GoogleImage = ({
  width,
  height,
  alt,
  className,
  ...props
}: LogoProps) => {
  return (
    <Image
      src={google}
      alt={alt ?? "google"}
      width={width}
      height={height}
      className={cn("mr-2", className)}
    />
  );
};

export default GoogleImage;
