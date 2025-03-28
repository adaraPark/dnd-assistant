"use client";

import { Combobox } from "app/components/combobox";
import { Label } from "app/components/ui/label";
import { api } from "app/trpc/react";
import { useState } from "react";
import { CharacterCard } from "./characterCard";
import DiceRoller from "../dnd-attack/diceRoller";
import type { Character } from "@prisma/client";

export const Characters = () => {
  //queries
  const { data: heroes } = api.character.getHeroes.useQuery();
  const { data: monsters } = api.character.getMonsters.useQuery();
  //state
  const [hero, setHero] = useState<Character | null>(null);
  const [monster, setMonster] = useState<Character | null>(null);

  if (!heroes || !monsters) return <div>Loading...</div>;

  return (
    <>
      <div className="flex w-full justify-between p-4">
        <div className="flex flex-col gap-2">
          <Label>Choose your Hero</Label>
          <Combobox
            label="Select a Hero"
            data={heroes.map((character) => ({
              id: character.id,
              label: character.name,
            }))}
            onSelect={(val) => {
              setHero(heroes.find((character) => character.id === val.id)!);
            }}
          />
          {hero && <CharacterCard character={hero} />}
        </div>
        {hero && monster && <DiceRoller players={[hero, monster]} />}
        <div className="flex flex-col gap-2">
          <Label>Choose your Monster</Label>
          <Combobox
            label="Select a Monster"
            data={monsters.map((character) => ({
              id: character.id,
              label: character.name,
            }))}
            onSelect={(val) => {
              setMonster(
                monsters.find((character) => character.id === val.id)!,
              );
            }}
          />
          {monster && <CharacterCard character={monster} />}
        </div>
      </div>
    </>
  );
};
