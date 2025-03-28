import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "app/server/api/trpc";
import { Character } from "app/app/types/character";

export const characterRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.character.create({
        data: {
          name: input.name,
          health: 100,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.character.findMany();
    } catch (error) {
      throw new Error("Failed to fetch characters", { cause: error });
    }
  }),

  getHeroes: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.character.findMany({
      where: {
        type: Character.HERO,
      },
    });
  }),

  getMonsters: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.character.findMany({
      where: { type: Character.MONSTER },
    });
  }),

  update: publicProcedure
    .input(z.object({ id: z.number(), health: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.character.update({
        where: { id: input.id },
        data: {
          health: input.health,
        },
      });
    }),
});
