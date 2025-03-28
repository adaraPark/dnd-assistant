import { createTRPCRouter, publicProcedure } from "app/server/api/trpc";
import {
  pokemonCreateRequestSchema,
  pokemonUpdateRequestSchema,
} from "app/app/types";
import { z } from "zod";

export const pokemonRouterRouter = createTRPCRouter({
  create: publicProcedure
    .input(pokemonCreateRequestSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.pokemon.create({
        data: {
          ...input,
        },
      });
    }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.pokemon.findUnique({
        where: { id: input.id },
        include: {
          moves: {
            include: {
              move: true,
            },
          },
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.pokemon.findMany({
        include: {
          moves: {
            include: {
              move: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error("Failed to fetch pokemon", { cause: error });
    }
  }),

  update: publicProcedure
    .input(pokemonUpdateRequestSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return await ctx.db.pokemon.update({
        where: { id },
        data: {
          ...data,
        },
      });
    }),
});
