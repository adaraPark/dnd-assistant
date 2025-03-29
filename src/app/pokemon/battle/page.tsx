"use client";

import { BattleView } from "app/app/components/battle/BattleView";
import { redirect } from "next/navigation";
import { api } from "app/trpc/react";
import { useSearchParams } from "next/navigation";

export default function BattlePage() {
  //hoook todo move to a hook
  const searchParams = useSearchParams();
  const pokemonId = searchParams.get("pokemonId");
  const opponentId = searchParams.get("opponentId");
  const { data: pokemon } = api.pokemon.byId.useQuery({
    id: Number(pokemonId),
  });
  const { data: opponent } = api.pokemon.byId.useQuery({
    id: Number(opponentId),
  });

  if (!pokemonId || !opponentId) {
    redirect("/pokemon");
  }

  if (!pokemon || !opponent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-amber-100">
      <BattleView pokemon={pokemon} opponent={opponent} />
    </div>
  );
}
