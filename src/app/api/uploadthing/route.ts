import { joinflowAppRouter } from "@/lib/api/uploadthing/core";
import { createNextRouteHandler } from "uploadthing/next";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: joinflowAppRouter,
});
