import { getServerSession } from "next-auth";
import React from "react";

import Unauthenticated from "@/components/template/unauthenticated";

export default async function UserInfo() {
  const session = await getServerSession();

  if (!session) return <Unauthenticated />;

  return (
    <div className="flex gap-2 text-sm">
      <p className="text-accent">You are now logged in as: </p>
      <p className="font-semibold">
        {session.user.name} ({session.user.nim})
      </p>
    </div>
  );
}
