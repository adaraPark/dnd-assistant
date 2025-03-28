import { ElementType, Species } from "app/app/types";
import { db, type Prisma } from "app/server/db";
import { PromisePool } from "@supercharge/promise-pool";

const pokemon: Prisma.PokemonCreateInput[] = [
  {
    name: "Pikachu",
    species: Species.PIKACHU,
    type: ElementType.ELECTRIC,
    baseHp: 35,
    battleHp: 35,
    attack: 55,
    defense: 40,
    specialAttack: 50,
    specialDefense: 50,
    speed: 90,
    level: 1,
    imageUrl:
      "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png",
  },
  {
    name: "Charizard",
    species: Species.CHARIZARD,
    type: ElementType.FIRE,
    baseHp: 78,
    battleHp: 78,
    attack: 84,
    defense: 78,
    specialAttack: 109,
    specialDefense: 85,
    speed: 100,
    level: 1,
    imageUrl:
      "https://assets.pokemon.com/assets/cms2/img/pokedex/full//006.png",
  },
  {
    name: "Blastoise",
    species: Species.BLASTOISE,
    type: ElementType.WATER,
    baseHp: 79,
    battleHp: 79,
    attack: 83,
    defense: 100,
    specialAttack: 85,
    specialDefense: 105,
    speed: 78,
    level: 1,
    imageUrl:
      "https://img.pokemondb.net/sprites/scarlet-violet/normal/blastoise.png",
  },
  {
    name: "Venusaur",
    species: Species.VENUSAUR,
    type: ElementType.GRASS,
    baseHp: 80,
    battleHp: 80,
    attack: 82,
    defense: 83,
    specialAttack: 100,
    specialDefense: 100,
    speed: 80,
    level: 1,
    imageUrl:
      "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/003.png",
  },
  {
    name: "Dragonite",
    species: Species.DRAGONITE,
    type: ElementType.DRAGON,
    baseHp: 91,
    battleHp: 91,
    attack: 134,
    defense: 95,
    specialAttack: 100,
    specialDefense: 100,
    speed: 80,
    level: 1,
    imageUrl:
      "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/149.png",
  },
  {
    name: "Gengar",
    species: Species.GENGAR,
    type: ElementType.GHOST,
    baseHp: 60,
    battleHp: 60,
    attack: 65,
    defense: 60,
    specialAttack: 130,
    specialDefense: 75,
    speed: 110,
    level: 1,
    imageUrl: "https://img.pokemondb.net/sprites/sun-moon/normal/gengar.png",
  },
  {
    name: "Alakazam",
    species: Species.ALAKAZAM,
    type: ElementType.PSYCHIC,
    baseHp: 55,
    battleHp: 55,
    attack: 50,
    defense: 45,
    specialAttack: 135,
    specialDefense: 95,
    speed: 120,
    level: 1,
    imageUrl:
      "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/065.png",
  },
  {
    name: "Snorlax",
    species: Species.SNORLAX,
    type: ElementType.NORMAL,
    baseHp: 160,
    battleHp: 160,
    attack: 110,
    defense: 65,
    specialAttack: 65,
    specialDefense: 110,
    speed: 30,
    level: 1,
    imageUrl:
      "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/143.png",
  },
  {
    name: "Tyranitar",
    species: Species.TYRANITAR,
    type: ElementType.ROCK,
    baseHp: 100,
    battleHp: 100,
    attack: 134,
    defense: 110,
    specialAttack: 95,
    specialDefense: 100,
    speed: 61,
    level: 1,
    imageUrl:
      "https://assets.pokemon.com/assets/cms2/img/pokedex/full//248.png",
  },
  {
    name: "Machamp",
    species: Species.MACHAMP,
    type: ElementType.FIGHTING,
    baseHp: 90,
    battleHp: 90,
    attack: 130,
    defense: 80,
    specialAttack: 65,
    specialDefense: 85,
    speed: 55,
    level: 1,
    imageUrl:
      "https://assets.pokemon.com/assets/cms2/img/pokedex/full//068.png",
  },
];

export async function createPokemon() {
  await PromisePool.withConcurrency(20)
    .for(pokemon)
    .process(async (pokemon) => {
      await db.pokemon.upsert({
        where: { name: pokemon.name },
        update: {},
        create: pokemon,
      });
    });
}
