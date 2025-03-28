import { z } from "zod";
import { ElementType } from "./elementType";
import { AttackType } from "./attackType";

export type moveCreateRequest = z.infer<typeof moveCreateRequestSchema>;

export const moveCreateRequestSchema = z.object({
  name: z.string(),
  type: z.nativeEnum(ElementType),
  power: z.number(),
  accuracy: z.number(),
  attackType: z.nativeEnum(AttackType),
});
