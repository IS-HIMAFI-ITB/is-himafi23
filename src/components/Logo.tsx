import Image from "next/image";

import logo from "@/../public/logo.svg";

interface LogoProps {
  width: number;
  height: number;
  src?: string;
  alt?: string;
  className?: string;
}
const Logo = ({
  width,
  height,
  src = logo,
  alt = "logo",
  ...props
}: LogoProps) => {
  return <Image {...props} src={src} alt={alt} width={width} height={height} />;
};

export default Logo;
