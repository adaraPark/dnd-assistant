import type { RouterOutputs } from "app/server/api";
import { AttackType } from "../types/attackType";
import { getTypeEffectivenessMultiplier } from "./damage";

type Pokemon = NonNullable<RouterOutputs["pokemon"]["byId"]>;

/*
 * CPU attack logic
 * 1. Determine the moves with the highest score based on the move's base value, accuracy, and type effectiveness
 * 2. Random multiplier (50%) used to provide a more dynamic attack
 * 3. Return the move with the highest score
 */
export const cpuAttack = (pokemon: Pokemon, opponentType: Pokemon["type"]) => {
  const movesWithScore = pokemon.moves.map(({ move }) => {
    //determine moves base value score for cpu attack
    const moveStat =
      move.attackType === AttackType.PHYSICAL
        ? pokemon.attack
        : pokemon.specialAttack;

    const typeEffectivenessMultiplier = getTypeEffectivenessMultiplier(
      move.type,
      opponentType,
    );

    const randomMultiplier = Math.random() * 0.5 + 0.75; // Random multiplier between 0.75 and 1.25

    const baseScore = (move.power * move.accuracy * moveStat) / 100;
    const score = baseScore * randomMultiplier * typeEffectivenessMultiplier;

    return {
      move,
      score,
    };
  });

  const sortedMoves = movesWithScore.sort((a, b) => b.score - a.score);

  return sortedMoves[0]?.move;
};
