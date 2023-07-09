import React from "react";

import { H1 } from "../typography";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <H1 className="text-center">Loading...</H1>
    </div>
  );
}
