import { createCallerFactory, createTRPCRouter } from "app/server/api/trpc";
import { pokemonRouterRouter } from "./routers/pokemon";
import type { inferRouterOutputs } from "@trpc/server";
import { moveRouterRouter } from "./routers/move";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  pokemon: pokemonRouterRouter,
  move: moveRouterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const createCaller = createCallerFactory(appRouter);
