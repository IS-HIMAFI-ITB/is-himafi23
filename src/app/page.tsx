import Image from "next/image";
import Slider from "@/components/home-slider";
import hero from "@/../public/images/hero.png";
import Container from "@/components/layout/container";
import Navbar from "@/components/layout/navbar";
import { H1, P } from "@/components/typography";

export default function Home() {
  return (
    <>
      <Navbar />
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
        <div className="absolute dark w-full h-full bg-gradient-to-t from-background to-transparent" />
        <div className="absolute w-full h-full bg-gradient-to-b from-background/30 to-transparent" />
        <div className="absolute dark w-full h-full bg-background/5" />
      </section>
      <section id="hero" className="relative w-full h-full py-12">
        <Container className="flex flex-col px-24 justify-start items-center h-full">
          <H1 className="text-center">
            Intellektuelle
            <br className="sm:hidden" /> Schulle 2023
          </H1>
          <P className="sm:block hidden max-w-2xl text-center opacity-70">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, magnam
            cupiditate pariatur ex tenetur, sit eligendi totam molestias
            voluptatibus, exercitationem aliquid? Id eos omnis aspernatur
            tenetur aut cupiditate ipsa velit.
          </P>
        </Container>
      </section>
    </>
  );
}
