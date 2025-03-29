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
    <div className="flex w-full flex-col gap-2 rounded-lg border border-gray-300 bg-white p-2 shadow-md">
      <div className="flex justify-center text-lg font-bold">
        Make your move
      </div>
      <div className="flex flex-row gap-2">
        {moves?.map((move) => (
          <div className="flex flex-col gap-2" key={move.id}>
            <Button
              disabled={!isPlayersTurn}
              variant="outline"
              onClick={() => {
                attack(move);
              }}
            >
              {move.name}
            </Button>
            <div>{move.power}</div>
            <div>{move.accuracy}</div>
            <div>{move.type}</div>
            <div>{move.attackType}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
