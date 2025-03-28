import { createCallerFactory, createTRPCRouter } from "app/server/api/trpc";
import { characterRouter } from "./routers/character";
import { pokemonRouterRouter } from "./routers/pokemon";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  character: characterRouter,
  pokemon: pokemonRouterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
