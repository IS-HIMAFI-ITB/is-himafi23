import { H1 } from "@/components/typography";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="h-screen bg-contain bg-gradient-to-r from-indigo-500 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-center items-center">
          <Logo className="mb-12" width={100} height={100} />
        </div>
        <H1>Error 404</H1>
        <p className="mt-2">The page you were looking does not exist</p>
        <Button asChild className="mt-2">
          <Link href={"/"}>Return to home</Link>
        </Button>
      </div>
    </section>
  );
}
