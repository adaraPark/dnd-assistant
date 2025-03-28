"use client";

import { api } from "app/trpc/react";
export default function BattlePage() {
  const { data: pokemonData, isLoading } = api.pokemon.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Pokemon Battle</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {pokemonData?.map((pokemon) => (
          <div key={pokemon.id} className="rounded-lg border p-4 shadow-sm">
            <h2 className="text-xl font-semibold">{pokemon.name}</h2>
            <p>Health: {pokemon.battleHp}</p>
            <p>Type: {pokemon.type}</p>
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
        ))}
      </div>
    </div>
  );
}
