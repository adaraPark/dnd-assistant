import { z } from "zod";
import { ElementType } from "./elementType";
import { AttackType } from "./attackType";

export const moveSchema = z.object({
  id: z.number(),
  name: z.string(),
  power: z.number(),
  accuracy: z.number(),
  type: z.nativeEnum(ElementType),
  attackType: z.nativeEnum(AttackType),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type moveCreateRequest = z.infer<typeof moveCreateRequestSchema>;

export const moveCreateRequestSchema = z.object({
  name: z.string(),
  type: z.nativeEnum(ElementType),
  power: z.number(),
  accuracy: z.number(),
  attackType: z.nativeEnum(AttackType),
});
