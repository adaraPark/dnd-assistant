"use client";
import { api } from "app/trpc/react";
import Link from "next/link";
import { PokemonCard } from "../PokemonCard";

export default function PokemonTable() {
  //queries
  const { data: pokemonData, isLoading } = api.pokemon.getAll.useQuery();

  if (isLoading || !pokemonData) return <div>Loading...</div>;

  const getRandomOpponent = () => {
    const randomIndex = Math.floor(Math.random() * pokemonData.length);
    return pokemonData[randomIndex]?.id;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Pokemon Battle</h1>
      <div className="text-gray text-lg">Choose your pokemon</div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pokemonData?.map((pokemon) => (
          <Link
            href={`/pokemon/battle?pokemonId=${pokemon.id}&opponentId=${getRandomOpponent()}`}
            key={pokemon.id}
          >
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          </Link>
        ))}
      </div>
    </div>
  );
}
