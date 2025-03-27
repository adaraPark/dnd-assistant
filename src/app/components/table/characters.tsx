"use client";

import { Combobox } from "app/components/combobox";
import { api } from "app/trpc/react";

export const Characters = () => {
  const { data: characters } = api.character.getAll.useQuery();
  console.log(characters, characters);

  if (!characters) return null;
  return (
    <div className="w-full max-w-xs">
      {characters.map((character) => (
        <div key={character.id}>
          <p>{character.name}</p>
          <p>{character.health}</p>
          <p>{character.type}</p>
        </div>
      ))}
      <Combobox
        label="Select a Hero"
        data={characters.map((character) => ({
          id: character.id,
          label: character.name,
        }))}
        onSelect={(id) => {
          console.log(id, "id");
        }}
      />
      <Combobox
        label="Select a Hero"
        data={characters.map((character) => ({
          id: character.id,
          label: character.name,
        }))}
        onSelect={(id) => {
          console.log(id, "id");
        }}
      />
    </div>
  );
};
