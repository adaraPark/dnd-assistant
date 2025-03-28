import { z } from "zod";

/**
 * Use this if you need to loop through all the options
 */
export const SpeciesValues = ["PIKACHU", "CHARMANDER", "SQUIRTLE"] as const;
/**
 * Use this if you need to zod parse it
 */
export const SpeciesSchema = z.enum(SpeciesValues);

export const Species = SpeciesSchema.enum;

export type Species = (typeof SpeciesValues)[number];

/**
 * Use this if you need to display a human-readable name
 */
export const SpeciesDisplayNames: Readonly<Record<Species, string>> = {
  PIKACHU: "Pikachu",
  CHARMANDER: "Charmander",
  SQUIRTLE: "Squirtle",
};
