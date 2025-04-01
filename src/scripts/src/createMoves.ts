import { ElementType } from "app/app/types";
import { AttackType } from "app/app/types/attackType";
import { db, type Prisma } from "app/server/db";
import { PromisePool } from "@supercharge/promise-pool";

const moves: Prisma.MoveCreateInput[] = [
  // PIKACHU
  {
    name: "Thunderbolt",
    type: ElementType.ELECTRIC,
    power: 90,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Quick Attack",
    type: ElementType.NORMAL,
    power: 40,
    accuracy: 100,
    attackType: AttackType.PHYSICAL,
  },
  {
    name: "Volt Tackle",
    type: ElementType.ELECTRIC,
    power: 120,
    accuracy: 100,
    attackType: AttackType.PHYSICAL,
  },
  {
    name: "Iron Tail",
    type: ElementType.STEEL,
    power: 100,
    accuracy: 75,
    attackType: AttackType.PHYSICAL,
  },

  // CHARMANDER
  {
    name: "Flamethrower",
    type: ElementType.FIRE,
    power: 90,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Dragon Claw",
    type: ElementType.DRAGON,
    power: 80,
    accuracy: 100,
    attackType: AttackType.PHYSICAL,
  },
  {
    name: "Scratch",
    type: ElementType.NORMAL,
    power: 40,
    accuracy: 100,
    attackType: AttackType.PHYSICAL,
  },
  {
    name: "Ember",
    type: ElementType.FIRE,
    power: 40,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },

  // SQUIRTLE
  {
    name: "Water Gun",
    type: ElementType.WATER,
    power: 40,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Bubble Beam",
    type: ElementType.WATER,
    power: 65,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Ice Beam",
    type: ElementType.ICE,
    power: 90,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Hydro Pump",
    type: ElementType.WATER,
    power: 110,
    accuracy: 80,
    attackType: AttackType.SPECIAL,
  },

  // CHARIZARD
  {
    name: "Flamethrower",
    type: ElementType.FIRE,
    power: 90,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Air Slash",
    type: ElementType.FLYING,
    power: 75,
    accuracy: 95,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Dragon Claw",
    type: ElementType.DRAGON,
    power: 80,
    accuracy: 100,
    attackType: AttackType.PHYSICAL,
  },
  {
    name: "Earthquake",
    type: ElementType.GROUND,
    power: 100,
    accuracy: 100,
    attackType: AttackType.PHYSICAL,
  },

  // BLASTOISE
  {
    name: "Hydro Pump",
    type: ElementType.WATER,
    power: 110,
    accuracy: 80,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Ice Beam",
    type: ElementType.ICE,
    power: 90,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Surf",
    type: ElementType.WATER,
    power: 90,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Body Slam",
    type: ElementType.NORMAL,
    power: 85,
    accuracy: 100,
    attackType: AttackType.PHYSICAL,
  },

  // VENUSAUR
  {
    name: "SolarBeam",
    type: ElementType.GRASS,
    power: 120,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Sludge Bomb",
    type: ElementType.POISON,
    power: 90,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Razor Leaf",
    type: ElementType.GRASS,
    power: 55,
    accuracy: 95,
    attackType: AttackType.PHYSICAL,
  },

  // DRAGONITE
  {
    name: "Dragon Claw",
    type: ElementType.DRAGON,
    power: 80,
    accuracy: 100,
    attackType: AttackType.PHYSICAL,
  },
  {
    name: "Hyper Beam",
    type: ElementType.NORMAL,
    power: 150,
    accuracy: 90,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Earthquake",
    type: ElementType.GROUND,
    power: 100,
    accuracy: 100,
    attackType: AttackType.PHYSICAL,
  },
  {
    name: "Fire Blast",
    type: ElementType.FIRE,
    power: 110,
    accuracy: 85,
    attackType: AttackType.SPECIAL,
  },

  // GENGAR
  {
    name: "Shadow Ball",
    type: ElementType.GHOST,
    power: 80,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Sludge Bomb",
    type: ElementType.POISON,
    power: 90,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Dazzling Gleam",
    type: ElementType.FAIRY,
    power: 80,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },

  // ALAKAZAM
  {
    name: "Psychic",
    type: ElementType.PSYCHIC,
    power: 90,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Shadow Ball",
    type: ElementType.GHOST,
    power: 80,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Focus Blast",
    type: ElementType.FIGHTING,
    power: 120,
    accuracy: 70,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Energy Ball",
    type: ElementType.GRASS,
    power: 90,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },

  // SNORLAX
  {
    name: "Body Slam",
    type: ElementType.NORMAL,
    power: 85,
    accuracy: 100,
    attackType: AttackType.PHYSICAL,
  },
  {
    name: "Hyper Beam",
    type: ElementType.NORMAL,
    power: 150,
    accuracy: 90,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Earthquake",
    type: ElementType.GROUND,
    power: 100,
    accuracy: 100,
    attackType: AttackType.PHYSICAL,
  },
  {
    name: "Crunch",
    type: ElementType.DARK,
    power: 80,
    accuracy: 100,
    attackType: AttackType.PHYSICAL,
  },

  // TYRANITAR
  {
    name: "Stone Edge",
    type: ElementType.ROCK,
    power: 100,
    accuracy: 80,
    attackType: AttackType.PHYSICAL,
  },
  {
    name: "Crunch",
    type: ElementType.DARK,
    power: 80,
    accuracy: 100,
    attackType: AttackType.PHYSICAL,
  },
  {
    name: "Earthquake",
    type: ElementType.GROUND,
    power: 100,
    accuracy: 100,
    attackType: AttackType.PHYSICAL,
  },
  {
    name: "Fire Blast",
    type: ElementType.FIRE,
    power: 110,
    accuracy: 85,
    attackType: AttackType.SPECIAL,
  },

  // MACHAMP
  {
    name: "Dynamic Punch",
    type: ElementType.FIGHTING,
    power: 100,
    accuracy: 50,
    attackType: AttackType.PHYSICAL,
  },
  {
    name: "Close Combat",
    type: ElementType.FIGHTING,
    power: 120,
    accuracy: 100,
    attackType: AttackType.PHYSICAL,
  },
  {
    name: "Earthquake",
    type: ElementType.GROUND,
    power: 100,
    accuracy: 100,
    attackType: AttackType.PHYSICAL,
  },
  {
    name: "Stone Edge",
    type: ElementType.ROCK,
    power: 100,
    accuracy: 80,
    attackType: AttackType.PHYSICAL,
  },

  // PIPLUP
  {
    name: "Hydro Pump",
    type: ElementType.WATER,
    power: 110,
    accuracy: 80,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Ice Beam",
    type: ElementType.ICE,
    power: 90,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Bubble Beam",
    type: ElementType.WATER,
    power: 65,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Aqua Jet",
    type: ElementType.WATER,
    power: 40,
    accuracy: 100,
    attackType: AttackType.PHYSICAL,
  },

  // JIGGLYPUFF
  {
    name: "Body Slam",
    type: ElementType.NORMAL,
    power: 85,
    accuracy: 100,
    attackType: AttackType.PHYSICAL,
  },
  {
    name: "Hyper Voice",
    type: ElementType.NORMAL,
    power: 90,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Dazzling Gleam",
    type: ElementType.FAIRY,
    power: 80,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },
];

export async function createMoves() {
  await PromisePool.withConcurrency(20)
    .for(moves)
    .process(async (move) => {
      await db.move.upsert({
        where: { name: move.name },
        update: {},
        create: move,
      });
    });
}
