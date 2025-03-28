import { Button } from "app/components/ui/button";
import { api } from "app/trpc/react";

export const ActionBar = ({ pokemonId }: { pokemonId: number }) => {
  const { data: moves } = api.move.byPokemonId.useQuery({ pokemonId });

  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-white p-2 shadow-md">
      <div className="flex justify-center text-lg font-bold">
        Make your move
      </div>
      <div className="flex flex-row gap-2">
        {moves?.map((move) => (
          <Button variant="outline" key={move.id}>
            {move.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
