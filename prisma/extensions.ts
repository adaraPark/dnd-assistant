import type { PrismaClient } from "@prisma/client";
import { ElementTypeSchema, SpeciesSchema } from "app/app/types";
import { AttackTypeSchema } from "app/app/types/attackType";

/**
 * Take in the base prisma client and return an extended client
 */
export const createClientExtensions = (client: PrismaClient) => {
  return client.$extends({
    result: {
      pokemon: {
        type: {
          needs: { type: true },
          compute(data) {
            return ElementTypeSchema.parse(data.type);
          },
        },
        species: {
          needs: { species: true },
          compute(data) {
            return SpeciesSchema.parse(data.species);
          },
        },
      },
      move: {
        type: {
          needs: { type: true },
          compute(data) {
            return ElementTypeSchema.parse(data.type);
          },
        },
        attackType: {
          needs: { attackType: true },
          compute(data) {
            return AttackTypeSchema.parse(data.attackType);
          },
        },
      },
    },
  });
};
