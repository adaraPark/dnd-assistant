import Image from "next/image";
import { ActionBar } from "./ActionBar";
import { PokemonCard } from "../PokemonCard";
import { api } from "app/trpc/react";

export const PokemonBattleView = ({ pokemonId }: { pokemonId: number }) => {
  const { data: pokemon } = api.pokemon.byId.useQuery({ id: pokemonId });

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex">
        <PokemonCard pokemon={pokemon} />
      </div>

      <div className="flex flex-2 items-center justify-center">
        <Image
          src={pokemon.imageUrl}
          alt={pokemon.name}
          width={300}
          height={300}
        />
      </div>

      <div className="my-4 flex flex-1 rounded-lg border border-gray-300 bg-white">
        <ActionBar pokemonId={pokemon.id} />
      </div>
    </div>
  );
};
