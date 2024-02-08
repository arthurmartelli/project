import { clientsRouter } from "~/server/api/routers/client";
import { receiptRouter } from "~/server/api/routers/receipt";

import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  clients: clientsRouter,
  receipt: receiptRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
