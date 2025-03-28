import { z } from "zod";
import { Species } from "./species";
import { ElementType } from "./elementType";

export type pokemonCreateRequest = z.infer<typeof pokemonCreateRequestSchema>;

export type pokemonUpdateRequest = z.infer<typeof pokemonUpdateRequestSchema>;

export const pokemonCreateRequestSchema = z.object({
  name: z.string(),
  species: z.nativeEnum(Species),
  type: z.nativeEnum(ElementType),
  level: z.number(),
  baseHp: z.number(),
  battleHp: z.number(),
  attack: z.number(),
  defense: z.number(),
  specialAttack: z.number(),
  specialDefense: z.number(),
  speed: z.number(),
});

export const pokemonUpdateRequestSchema = pokemonCreateRequestSchema
  .partial()
  .extend({
    id: z.number(),
  });
