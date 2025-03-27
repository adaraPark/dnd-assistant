import { z } from "zod";

/**
 * Use this if you need to loop through all the options
 */
export const CharacterValues = ["HERO", "MONSTER"] as const;
/**
 * Use this if you need to zod parse it
 */
export const CharacterSchema = z.enum(CharacterValues);

export const Character = CharacterSchema.enum;

export type Character = (typeof CharacterValues)[number];

/**
 * Use this if you need to display a human-readable name
 */
export const CharacterDisplayNames: Readonly<Record<Character, string>> = {
  HERO: "Hero",
  MONSTER: "Monster",
};
