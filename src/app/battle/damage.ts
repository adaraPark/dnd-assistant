import { typeEffectivenessMultiplier } from "./typeEffectivenessMultiplier";
import type { RouterOutputs } from "app/server/api";

/**
 * The minimum damage a move will always at least do
 */
const MIN_DAMAGE = 2;

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
  //base level calculations
  const levelImpact = (2 * attacker.level) / 5 + 2;
  const powerImpact = levelImpact * moveUsed.power * attacker.attack;
  const defenseImpact = powerImpact / defender.defense;

  const baseDamage = defenseImpact / 50;

  //multiplier calculations
  const typeMultiplier =
    typeEffectivenessMultiplier[moveUsed.type][defender.type] ??
    typeEffectivenessMultiplier[moveUsed.type].defaultImpact;

  const totalDamage = Math.floor(baseDamage * typeMultiplier);

  return Math.max(totalDamage, MIN_DAMAGE);
};
