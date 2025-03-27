"use client";

import { api } from "app/trpc/react";

export const Characters = () => {
  const characters = api.character.getAll.useQuery();
  console.log(characters, characters.data);
  if (!characters.data) return null;
  return (
    <div className="w-full max-w-xs">
      {characters.data?.map((character) => (
        <div key={character.id}>
          <p>{character.name}</p>
          <p>{character.health}</p>
        </div>
      ))}
    </div>
  );
};
