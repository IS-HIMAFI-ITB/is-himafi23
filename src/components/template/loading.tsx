import React from "react";

import LoadingPage from "../loading-spin";
import { H1 } from "../typography";

export default function Loading() {
  return (
    <div className="flex flex-col gap-12 items-center justify-center w-full h-screen">
      <LoadingPage />
      <H1 className="text-center">Loading...</H1>
    </div>
  );
}
