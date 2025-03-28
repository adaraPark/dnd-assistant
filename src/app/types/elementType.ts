import { z } from "zod";

/**
 * Use this if you need to loop through all the options
 */
export const ElementTypeValues = [
  "NORMAL",
  "FIRE",
  "WATER",
  "GRASS",
  "ELECTRIC",
  "ICE",
  "FIGHTING",
  "POISON",
  "GROUND",
  "FLYING",
  "PSYCHIC",
  "BUG",
  "ROCK",
  "GHOST",
  "DRAGON",
  "DARK",
  "STEEL",
  "FAIRY",
] as const;
/**
 * Use this if you need to zod parse it
 */
export const ElementTypeSchema = z.enum(ElementTypeValues);

export const ElementType = ElementTypeSchema.enum;

export type ElementType = (typeof ElementTypeValues)[number];

/**
 * Use this if you need to display a human-readable name
 */
export const ElementTypeDisplayNames: Readonly<Record<ElementType, string>> = {
  NORMAL: "Normal",
  FIRE: "Fire",
  WATER: "Water",
  GRASS: "Grass",
  ELECTRIC: "Electric",
  ICE: "Ice",
  FIGHTING: "Fighting",
  POISON: "Poison",
  GROUND: "Ground",
  FLYING: "Flying",
  PSYCHIC: "Psychic",
  BUG: "Bug",
  ROCK: "Rock",
  GHOST: "Ghost",
  DRAGON: "Dragon",
  DARK: "Dark",
  STEEL: "Steel",
  FAIRY: "Fairy",
};
