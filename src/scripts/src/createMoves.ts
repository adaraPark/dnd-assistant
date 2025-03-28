import { ElementType } from "app/app/types";
import { AttackType } from "app/app/types/attackType";
import { db, type Prisma } from "app/server/db";
import { PromisePool } from "@supercharge/promise-pool";

const moves: Prisma.MoveCreateInput[] = [
  {
    name: "Tackle",
    type: ElementType.NORMAL,
    power: 40,
    accuracy: 100,
    attackType: AttackType.PHYSICAL,
  },
  {
    name: "Thunderbolt",
    type: ElementType.ELECTRIC,
    power: 90,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Flamethrower",
    type: ElementType.FIRE,
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
  {
    name: "Ice Beam",
    type: ElementType.ICE,
    power: 90,
    accuracy: 100,
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
    name: "Psychic",
    type: ElementType.PSYCHIC,
    power: 90,
    accuracy: 100,
    attackType: AttackType.SPECIAL,
  },
  {
    name: "Close Combat",
    type: ElementType.FIGHTING,
    power: 120,
    accuracy: 100,
    attackType: AttackType.PHYSICAL,
  },
  {
    name: "Leaf Blade",
    type: ElementType.GRASS,
    power: 90,
    accuracy: 100,
    attackType: AttackType.PHYSICAL,
  },
  {
    name: "Dragon Claw",
    type: ElementType.DRAGON,
    power: 80,
    accuracy: 100,
    attackType: AttackType.PHYSICAL,
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
