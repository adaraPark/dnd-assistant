"use client";

import { PokemonBattleView } from "app/app/components/battle/PokemonBattleView";
import { redirect, useSearchParams } from "next/navigation";
export default function BattlePage() {
  const searchParams = useSearchParams();
  const pokemonId = searchParams.get("pokemonId");
  const opponentId = searchParams.get("opponentId");

  if (!pokemonId || !opponentId) {
    redirect("/pokemon");
  }

  return (
    <main className="flex h-full flex-col gap-4 bg-amber-100 p-4 md:flex-row">
      <div className="flex-1">
        <PokemonBattleView pokemonId={Number(pokemonId)} />
      </div>
      <div className="flex-1">
        <PokemonBattleView pokemonId={Number(opponentId)} />
      </div>
    </main>
  );
}
