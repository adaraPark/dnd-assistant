import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "app/server/api/trpc";

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
});
