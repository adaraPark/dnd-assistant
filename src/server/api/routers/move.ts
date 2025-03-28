import { createTRPCRouter, publicProcedure } from "app/server/api/trpc";
import { moveCreateRequestSchema } from "app/app/types";

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

  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.move.findMany();
    } catch (error) {
      throw new Error("Failed to fetch moves", { cause: error });
    }
  }),
});
