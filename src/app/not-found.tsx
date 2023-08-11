import Link from "next/link";

import Logo from "@/components/logo";
import { H1, LargeParagraph } from "@/components/typography";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="h-screen bg-cover bg-errorBackground flex items-center justify-center">
      <div className="flex flex-col h-full w-full p-16 items-start justify-start">
        <H1 className="tracking-wide">LOST IN SPACE AND TIME?</H1>
        <LargeParagraph className="mt-4 font-light">
          It looks like the page doesn&apos;t exist — or maybe it doesn&apos;t
          yet?
        </LargeParagraph>
        <Button
          asChild
          size={"lg"}
          className="mt-8 bg-foreground text-background hover:bg-foreground/90 hover:text-background/90"
        >
          <Link href={"/"}>The Beginning of Time</Link>
        </Button>
      </div>
      {/* <div className="flex flex-col items-center justify-center">
        <div className="flex justify-center items-center">
          <Logo className="mb-12" width={100} height={100} />
        </div>
        <H1>Error 404</H1>
        <p className="mt-2">The page you were looking does not exist</p>
        <Button asChild className="mt-2">
          <Link href={"/"}>Return to home</Link>
        </Button>
      </div> */}
    </section>
  );
}
