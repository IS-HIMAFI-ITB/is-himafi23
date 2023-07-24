import Link from "next/link";
import React from "react";

import Container from "../layout/container";
import Logo from "../logo";
import ThemeSwitch from "../theme-switch";
import { H1, P } from "../typography";
import { Button } from "../ui/button";

export default function Unauthenticated() {
  return (
    <Container className="h-[calc(100vh-72.6px)] flex flex-col items-center justify-center">
      {/* <Button
        variant={"link"}
        className="mt-4 absolute top-0 left-0 m-12 group/back"
        asChild
      >
        <Link href={"/"} className="flex flex-row items-center gap-2">
          <ArrowLeft className="w-6 h-6 group-hover/back:-translate-x-2 transition ease-out" />
          Back to home
        </Link>
      </Button>

      <Logo width={50} height={50} className="absolute top-0 right-0 m-12" /> */}
      {/* <ThemeSwitch className="absolute bottom-0 right-0 m-12" /> */}

      <H1 className="text-destructive text-center">Access not allowed!</H1>
      <P className="text-center">
        You are either not logged in or not authorized to access this page.
      </P>
      <div className="flex flex-col mt-6 gap-4 items-center w-full max-w-md">
        <Button className="w-full" asChild>
          <Link href={"/login"}>Login</Link>
        </Button>
        <Button className="w-full" variant={"outline"} asChild>
          <Link href={"/"}>Back to home</Link>
        </Button>
      </div>
    </Container>
  );
}
