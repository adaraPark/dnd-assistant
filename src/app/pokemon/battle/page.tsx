"use client";

import { ElementTypeDisplayNames } from "app/app/types";
import { api } from "app/trpc/react";
import Image from "next/image";

export default function BattlePage() {
  const { data: pokemonData, isLoading } = api.pokemon.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Pokemon Battle</h1>
      <div className="text-gray text-lg">Choose your pokemon</div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {pokemonData?.map((pokemon) => (
          <div
            key={pokemon.id}
            className="flex rounded-lg border p-4 shadow-sm"
          >
            <div>
              <h2 className="text-xl font-semibold">{pokemon.name}</h2>
              <p>Health: {pokemon.battleHp}</p>
              <p>Type: {ElementTypeDisplayNames[pokemon.type]}</p>
              <p>
                Moves:{" "}
                {pokemon.moves
                  .map((moveRelation) => moveRelation.move.name)
                  .join(", ")}
              </p>
              <p>Level: {pokemon.level}</p>
              <p>battles won: {pokemon.battlesWon}</p>
              <p>battles lost: {pokemon.battlesLost}</p>
            </div>
            {pokemon.imageUrl && (
              <div className="flex items-center justify-center">
                <Image
                  src={pokemon.imageUrl ?? ""}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
