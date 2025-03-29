import { ElementTypeDisplayNames } from "app/app/types";
import { AttackTypeDisplayNames } from "app/app/types/attackType";
import { PokemonTooltip } from "app/components/pokemonTooltip";
import { Button } from "app/components/ui/button";
import { api, type RouterOutputs } from "app/trpc/react";

type Move = NonNullable<RouterOutputs["move"]["byPokemonId"]>[number];

export const ActionBar = ({
  pokemonId,
  attack,
  isPlayersTurn,
}: {
  pokemonId: number;
  attack: (move: Move) => void;
  isPlayersTurn: boolean;
}) => {
  const { data: moves } = api.move.byPokemonId.useQuery({ pokemonId });

  return (
    <div className="flex h-[100px] w-full flex-col gap-2 overflow-y-auto rounded-lg border border-gray-300 bg-white p-2 shadow-md">
      {isPlayersTurn ? (
        <div className="flex justify-center text-lg font-bold">
          Make your move
        </div>
      ) : (
        <div className="flex justify-center text-lg font-bold">
          Waiting for opponent...
        </div>
      )}
      <div className="flex flex-row flex-wrap items-center justify-center gap-2">
        {moves?.map((move) => (
          <div className="flex flex-col gap-2" key={move.id}>
            <PokemonTooltip
              buttonProps={{
                disabled: !isPlayersTurn,
                variant: "outline",
                onClick: () => {
                  attack(move);
                },
                label: move.name,
              }}
            >
              <div className="flex flex-col gap-2">
                <div className="text-sm font-bold">{move.name} Stats</div>
                <div>Power: {move.power}</div>
                <div>Accuracy: {move.accuracy}</div>
                <div>Type: {ElementTypeDisplayNames[move.type]}</div>
                <div>
                  Attack type: {AttackTypeDisplayNames[move.attackType]}
                </div>
              </div>
            </PokemonTooltip>
          </div>
        ))}
      </div>
    </div>
  );
};
