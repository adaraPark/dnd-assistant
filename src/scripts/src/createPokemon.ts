import { ElementType, Species } from "app/app/types";
import { db, type Prisma } from "app/server/db";
import { PromisePool } from "@supercharge/promise-pool";

const pokemon: Prisma.PokemonCreateInput[] = [
  {
    name: "Pikachu",
    species: Species.PIKACHU,
    type: ElementType.ELECTRIC,
    baseHp: 35,
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
    attack: 130,
    defense: 80,
    specialAttack: 65,
    specialDefense: 85,
    speed: 55,
    level: 1,
    imageUrl:
      "https://assets.pokemon.com/assets/cms2/img/pokedex/full//068.png",
  },
  {
    name: "Piplup",
    species: Species.PIPLUP,
    type: ElementType.WATER,
    baseHp: 53,
    attack: 51,
    defense: 53,
    specialAttack: 61,
    specialDefense: 56,
    speed: 40,
    level: 1,
    imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/393.png",
  },
  {
    name: "Jigglypuff",
    species: Species.JIGGLYPUFF,
    type: ElementType.FAIRY,
    baseHp: 115,
    attack: 45,
    defense: 20,
    specialAttack: 45,
    specialDefense: 25,
    speed: 20,
    level: 1,
    imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png",
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

type createPokemonMoves = {
  pokemonName: string;
  moveName: string;
};

const createPokemonToMoves: createPokemonMoves[] = [
  { pokemonName: "Pikachu", moveName: "Thunderbolt" },
  { pokemonName: "Pikachu", moveName: "Quick Attack" },
  { pokemonName: "Pikachu", moveName: "Volt Tackle" },
  { pokemonName: "Pikachu", moveName: "Iron Tail" },

  { pokemonName: "Charmander", moveName: "Flamethrower" },
  { pokemonName: "Charmander", moveName: "Dragon Claw" },
  { pokemonName: "Charmander", moveName: "Scratch" },
  { pokemonName: "Charmander", moveName: "Ember" },

  { pokemonName: "Squirtle", moveName: "Water Gun" },
  { pokemonName: "Squirtle", moveName: "Bubble Beam" },
  { pokemonName: "Squirtle", moveName: "Ice Beam" },
  { pokemonName: "Squirtle", moveName: "Hydro Pump" },

  { pokemonName: "Charizard", moveName: "Flamethrower" },
  { pokemonName: "Charizard", moveName: "Air Slash" },
  { pokemonName: "Charizard", moveName: "Dragon Claw" },
  { pokemonName: "Charizard", moveName: "Earthquake" },

  { pokemonName: "Blastoise", moveName: "Hydro Pump" },
  { pokemonName: "Blastoise", moveName: "Ice Beam" },
  { pokemonName: "Blastoise", moveName: "Surf" },
  { pokemonName: "Blastoise", moveName: "Body Slam" },

  { pokemonName: "Venusaur", moveName: "SolarBeam" },
  { pokemonName: "Venusaur", moveName: "Sludge Bomb" },
  { pokemonName: "Venusaur", moveName: "Razor Leaf" },

  { pokemonName: "Dragonite", moveName: "Dragon Claw" },
  { pokemonName: "Dragonite", moveName: "Hyper Beam" },
  { pokemonName: "Dragonite", moveName: "Earthquake" },
  { pokemonName: "Dragonite", moveName: "Fire Blast" },

  { pokemonName: "Gengar", moveName: "Shadow Ball" },
  { pokemonName: "Gengar", moveName: "Sludge Bomb" },
  { pokemonName: "Gengar", moveName: "Dazzling Gleam" },

  { pokemonName: "Alakazam", moveName: "Psychic" },
  { pokemonName: "Alakazam", moveName: "Shadow Ball" },
  { pokemonName: "Alakazam", moveName: "Focus Blast" },
  { pokemonName: "Alakazam", moveName: "Energy Ball" },

  { pokemonName: "Snorlax", moveName: "Body Slam" },
  { pokemonName: "Snorlax", moveName: "Hyper Beam" },
  { pokemonName: "Snorlax", moveName: "Earthquake" },
  { pokemonName: "Snorlax", moveName: "Crunch" },

  { pokemonName: "Tyranitar", moveName: "Stone Edge" },
  { pokemonName: "Tyranitar", moveName: "Crunch" },
  { pokemonName: "Tyranitar", moveName: "Earthquake" },
  { pokemonName: "Tyranitar", moveName: "Fire Blast" },

  { pokemonName: "Machamp", moveName: "Dynamic Punch" },
  { pokemonName: "Machamp", moveName: "Close Combat" },
  { pokemonName: "Machamp", moveName: "Earthquake" },
  { pokemonName: "Machamp", moveName: "Stone Edge" },

  { pokemonName: "Piplup", moveName: "Hydro Pump" },
  { pokemonName: "Piplup", moveName: "Ice Beam" },
  { pokemonName: "Piplup", moveName: "Bubble Beam" },
  { pokemonName: "Piplup", moveName: "Aqua Jet" },

  { pokemonName: "Jigglypuff", moveName: "Body Slam" },
  { pokemonName: "Jigglypuff", moveName: "Hyper Voice" },
  { pokemonName: "Jigglypuff", moveName: "Dazzling Gleam" },
];

export async function createPokemonMoves() {
  await PromisePool.withConcurrency(20)
    .for(createPokemonToMoves)
    .process(async (createPokemonToMoves) => {
      await db.pokemonToMove.create({
        data: {
          pokemon: { connect: { name: createPokemonToMoves.pokemonName } },
          move: { connect: { name: createPokemonToMoves.moveName } },
        },
      });
    });
}
