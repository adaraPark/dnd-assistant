import { z } from "zod";
import { Species } from "./species";
import { ElementType } from "./elementType";

export const basePokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  species: z.nativeEnum(Species),
  type: z.nativeEnum(ElementType),
  level: z.number(),
  baseHp: z.number(),
  attack: z.number(),
  defense: z.number(),
  specialAttack: z.number(),
  specialDefense: z.number(),
  speed: z.number(),
  imageUrl: z.string(),
  battlesWon: z.number(),
  battlesLost: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const pokemonCreateRequestSchema = z.object({
  name: z.string(),
  species: z.nativeEnum(Species),
  type: z.nativeEnum(ElementType),
  level: z.number(),
  baseHp: z.number(),
  attack: z.number(),
  defense: z.number(),
  specialAttack: z.number(),
  specialDefense: z.number(),
  speed: z.number(),
  imageUrl: z.string(),
});

export const pokemonUpdateRequestSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  species: z.nativeEnum(Species).optional(),
  type: z.nativeEnum(ElementType).optional(),
  level: z.number().optional(),
  baseHp: z.number().optional(),
  attack: z.number().optional(),
  defense: z.number().optional(),
  specialAttack: z.number().optional(),
  specialDefense: z.number().optional(),
  speed: z.number().optional(),
  imageUrl: z.string().optional(),
  battlesWon: z.number().optional(),
  battlesLost: z.number().optional(),
});
