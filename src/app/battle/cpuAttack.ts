import type { RouterOutputs } from "app/server/api";
import { AttackType } from "../types/attackType";

type Pokemon = NonNullable<RouterOutputs["pokemon"]["byId"]>;

export const cpuAttack = (pokemon: Pokemon) => {
  const randomMultiplier = Math.random() * 0.5 + 0.75; // Random multiplier between 0.75 and 1.25

  const movesWithScore = pokemon.moves.map(({ move }) => {
    const moveStat =
      move.attackType === AttackType.PHYSICAL
        ? pokemon.attack
        : pokemon.specialAttack;

    const baseScore = (move.power * move.accuracy * moveStat) / 100;

    const score = baseScore * randomMultiplier;
    return {
      move,
      score,
    };
  });

  const sortedMoves = movesWithScore.sort((a, b) => b.score - a.score);

  return sortedMoves[0]?.move;
};
