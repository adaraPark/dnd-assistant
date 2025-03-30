import { createTRPCRouter, publicProcedure } from "app/server/api/trpc";
import { moveCreateRequestSchema } from "app/app/types";
import { z } from "zod";

export const moveRouterRouter = createTRPCRouter({
  create: publicProcedure
    .input(moveCreateRequestSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.move.create({
        data: {
          ...input,
        },
      });
    }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.move.findUnique({
        where: { id: input.id },
      });
    }),

  byPokemonId: publicProcedure
    .input(z.object({ pokemonId: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.move.findMany({
        where: {
          Pokemon: {
            some: {
              pokemonId: input.pokemonId,
            },
          },
        },
      });
    }),
});
