import { AttackType } from "../types/attackType";
import { typeEffectivenessMultiplier } from "./typeEffectivenessMultiplier";
import type { RouterOutputs } from "app/server/api";

/**
 * constants for damage calculations
 */
const MIN_DAMAGE = 2;
const DAMAGE_REDUCTION = 50;
const LEVEL_MULTIPLIER = 2;
const LEVEL_REDUCTION = 5;
const MIN_LEVEL_ADDITION = 2;

type pokemonType = NonNullable<RouterOutputs["pokemon"]["byId"]>;
type moveType = NonNullable<RouterOutputs["move"]["byId"]>;

/**
 * Calculate the damage a move will do
 * @param attacker - The pokemon performing the move
 * @param defender - The pokemon being attacked and defending
 * @param moveUsed - The move used
 * @returns The damage the move will do
 */
export const calculateDamage = ({
  attacker,
  defender,
  moveUsed,
}: {
  attacker: pokemonType;
  defender: pokemonType;
  moveUsed: moveType;
}) => {
  // if pokemon misses, return minimum damage
  if (!accuracyCheck(moveUsed.accuracy)) {
    return MIN_DAMAGE;
  }

  // determine if the move is a special or physical attack
  const isSpecialMove = moveUsed.attackType === AttackType.SPECIAL;
  const attackStat = isSpecialMove ? attacker.specialAttack : attacker.attack;
  const defenseStat = isSpecialMove
    ? defender.specialDefense
    : defender.defense;

  //base level calculations
  const levelImpact =
    (LEVEL_MULTIPLIER * attacker.level) / LEVEL_REDUCTION + MIN_LEVEL_ADDITION;
  const powerImpact = levelImpact * moveUsed.power * attackStat;
  const defenseImpact = powerImpact / defenseStat;

  const baseDamage = defenseImpact / DAMAGE_REDUCTION;

  //multiplier calculations
  const randomMultiplier = getRandomMultiplier();
  const typeMultiplier = getTypeEffectivenessMultiplier(
    moveUsed.type,
    defender.type,
  );

  const totalDamage = Math.floor(
    baseDamage * typeMultiplier * randomMultiplier,
  );

  return Math.max(totalDamage, MIN_DAMAGE);
};

/*
/*
 * Check if the move is going to hit and cause damage based on move accuracy
 * @returns True if the move hits, false otherwise

 */
const accuracyCheck = (accuracy: moveType["accuracy"]) => {
  const randomChance = Math.random() * 100;

  if (randomChance < accuracy) {
    return true;
  }

  return false;
};

/**
 * Get a random multiplier for the damage
 * @returns A random multiplier between 0.85 and 1.15
 */
const getRandomMultiplier = () => {
  const random = Math.random() * 20;
  if (random < 3) {
    return 0.85;
  } else if (random > 17) {
    return 1.15;
  }
  return 1;
};

/**
 * Get the type effectiveness multiplier for a move
 * @returns The type effectiveness multiplier
 */
const getTypeEffectivenessMultiplier = (
  moveType: moveType["type"],
  defenderType: pokemonType["type"],
) => {
  return (
    typeEffectivenessMultiplier[moveType][defenderType] ??
    typeEffectivenessMultiplier[moveType].defaultImpact
  );
};
