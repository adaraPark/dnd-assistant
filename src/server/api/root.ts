import { postRouter } from "app/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "app/server/api/trpc";
import { characterRouter } from "./routers/character";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  character: characterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
