import { z } from "zod";

/**
 * Use this if you need to loop through all the options
 */
export const AttackTypeValues = ["PHYSICAL", "SPECIAL"] as const;
/**
 * Use this if you need to zod parse it
 */
export const AttackTypeSchema = z.enum(AttackTypeValues);

export const AttackType = AttackTypeSchema.enum;

export type AttackType = (typeof AttackTypeValues)[number];

/**
 * Use this if you need to display a human-readable name
 */
export const AttackTypeDisplayNames: Readonly<Record<AttackType, string>> = {
  PHYSICAL: "Physical",
  SPECIAL: "Special",
};
