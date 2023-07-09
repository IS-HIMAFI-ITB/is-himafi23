import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

import Container from "../layout/container";
import Logo from "../logo";
import ThemeSwitch from "../theme-switch";
import { H1, H3, P } from "../typography";
import { Button } from "../ui/button";

export default function Unauthenticated() {
  return (
    <Container>
      <Button
        variant={"link"}
        className="mt-4 absolute top-0 left-0 m-12 group/back"
      >
        <div className="flex flex-row items-center gap-2">
          <ArrowLeft className="w-6 h-6 group-hover/back:-translate-x-2 transition ease-out" />
          Back to home
        </div>
      </Button>

      <Logo width={50} height={50} className="absolute top-0 right-0 m-12" />
      <ThemeSwitch className="absolute bottom-0 right-0 m-12" />

      <Link
        href={"/"}
        className="flex flex-col items-center justify-center h-screen"
      >
        <H1 className="text-destructive">Access not allowed!</H1>
        <P className="text-center">
          You are either not logged in or not{" "}
          <br className="sm:hidden inline" /> authorized to access this page.
        </P>
      </Link>
    </Container>
  );
}
