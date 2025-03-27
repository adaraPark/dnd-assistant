"use client";

import { Combobox } from "app/components/combobox";
import { Label } from "app/components/ui/label";
import { api } from "app/trpc/react";
import { useState } from "react";
import { CharacterCard } from "./characterCard";
import DiceRoller from "../dnd-attack/diceRoller";
// import { type Character } from "@prisma/client";

export const Characters = () => {
  //queries
  const { data: heroes } = api.character.getHeroes.useQuery();
  const { data: monsters } = api.character.getMonsters.useQuery();
  //state
  const [heroId, setHeroId] = useState<number | null>(null);
  const [monsterId, setMonsterId] = useState<number | null>(null);

  if (!heroes || !monsters) return <div>Loading...</div>;

  return (
    <>
      <div className="flex w-full justify-between p-4">
        <div className="flex flex-col gap-2">
          <Label>Choose your Hero</Label>
          <Combobox
            label="Select a Hero"
            data={heroes.map((character) => ({
              id: character.id.toString(),
              label: character.name,
            }))}
            onSelect={(id) => {
              setHeroId(Number(id));
            }}
          />
          {heroId && (
            <CharacterCard
              character={heroes.find((character) => character.id === heroId)!}
            />
          )}
        </div>
        {heroId && monsterId && <DiceRoller />}
        <div className="flex flex-col gap-2">
          <Label>Choose your Monster</Label>
          <Combobox
            label="Select a Monster"
            data={monsters.map((character) => ({
              id: character.id.toString(),
              label: character.name,
            }))}
            onSelect={(id) => {
              setMonsterId(Number(id));
            }}
          />
          {monsterId && (
            <CharacterCard
              character={
                monsters.find((character) => character.id === monsterId)!
              }
            />
          )}
        </div>
      </div>
    </>
  );
};
