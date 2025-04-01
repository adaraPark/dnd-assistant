import { cpuAttack } from "app/app/battle/cpuAttack";
import { ElementTypeDisplayNames } from "app/app/types";
import { AttackTypeDisplayNames } from "app/app/types/attackType";
import { PokemonTooltip } from "app/components/pokemonTooltip";
import { type RouterOutputs } from "app/trpc/react";
import { useEffect, useState } from "react";

type Move = NonNullable<RouterOutputs["move"]["byPokemonId"]>[number];
type Pokemon = NonNullable<RouterOutputs["pokemon"]["byId"]>;

export const MoveActionPanel = ({
  pokemon,
  attack,
  isPlayersTurn,
  isCpu = false,
  opponentType,
}: {
  pokemon: Pokemon;
  attack: (move: Move) => void;
  isPlayersTurn: boolean;
  isCpu?: boolean;
  opponentType: Pokemon["type"];
}) => {
  const [cpuMoveName, setCpuMoveName] = useState<string | null>(null);
  useEffect(() => {
    if (isPlayersTurn && isCpu) {
      const timeoutId = setTimeout(() => {
        const cpuMove = cpuAttack(pokemon, opponentType);
        if (cpuMove) {
          attack(cpuMove);
          setCpuMoveName(String(cpuMove.name));
        }
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [isPlayersTurn, isCpu, attack, pokemon, opponentType]);

  const attackDisplay = isCpu
    ? `${pokemon.name} is attacking ${cpuMoveName ? `with ${cpuMoveName}` : "..."}`
    : "Make your move";

  return (
    <div className="flex h-[100px] w-full flex-col gap-2 overflow-y-auto rounded-lg border border-gray-300 bg-white p-2 shadow-md">
      {isPlayersTurn ? (
        <div className="flex justify-center text-lg font-bold">
          {attackDisplay}
        </div>
      ) : (
        <div className="flex justify-center text-lg font-bold">
          Waiting for opponent...
        </div>
      )}

      <div className="flex flex-row flex-wrap items-center justify-center gap-2">
        {pokemon.moves.map(({ move }) => (
          <div className="flex flex-col gap-2" key={move.id}>
            <PokemonTooltip
              buttonProps={{
                disabled: !isPlayersTurn || isCpu,
                variant: "outline",
                onClick: () => {
                  attack(move);
                },
                label: move.name,
              }}
            >
              <MoveStats move={move} />
            </PokemonTooltip>
          </div>
        ))}
      </div>
    </div>
  );
};

const MoveStats = ({ move }: { move: Move }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm font-bold">{move.name} Stats</div>
      <div>Power: {move.power}</div>
      <div>Accuracy: {move.accuracy}</div>
      <div>Type: {ElementTypeDisplayNames[move.type]}</div>
      <div>Attack type: {AttackTypeDisplayNames[move.attackType]}</div>
    </div>
  );
};
