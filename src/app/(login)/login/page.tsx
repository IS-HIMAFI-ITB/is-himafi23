import Image from "next/image";

import hero from "@/../public/images/cityscape.png";

import LoginCard from "./(components)/login-card";

export default function Home() {
  return (
    <section className="h-full w-full bg-contain">
      <section
        id="hero-background"
        className="absolute w-full left-0 top-0 p-0 h-screen -z-50"
      >
        <Image
          src={hero}
          alt="hero"
          fill
          style={{ objectFit: "cover" }}
          className="relative"
        />
      </section>
      <div className="h-screen flex flex-col justify-center items-center md:items-end">
        <LoginCard className="shrink md:shrink-0 md:w-[600px] md:h-screen" />
      </div>
    </section>
  );
}
