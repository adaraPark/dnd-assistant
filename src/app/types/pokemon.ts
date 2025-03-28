import { z } from "zod";

export type pokemonCreateRequest = z.infer<typeof pokemonCreateRequestSchema>;

export type pokemonUpdateRequest = z.infer<typeof pokemonUpdateRequestSchema>;

export const pokemonCreateRequestSchema = z.object({
  name: z.string(),
  species: z.string(), //enum
  type: z.string(), //enum
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
