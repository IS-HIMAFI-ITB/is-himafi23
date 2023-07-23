import { NextRequest, NextResponse } from "next/server";
import { createNextRouteHandler } from "uploadthing/next";
import { utapi } from "uploadthing/server";

import { ourFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const deleteFile = await utapi.deleteFiles(body.files);

  return NextResponse.json(deleteFile);
}
