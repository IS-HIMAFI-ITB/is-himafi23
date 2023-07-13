import DropFile from "./(components)/drop-file";
import hero from "@/../public/images/hero.png";
import Image from "next/image";

const Page = () => {
  return (
    <>
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
      <div className="flex items-center justify-center h-screen">
        <DropFile className="md:w-[550px]" />
      </div>
    </>
  );
};

export default Page;
