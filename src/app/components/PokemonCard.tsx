import type { RouterOutputs } from "app/server/api";
import { ElementTypeDisplayNames } from "../types";
import Image from "next/image";

type pokemon = RouterOutputs["pokemon"]["getAll"][number];

export const PokemonCard = ({ pokemon }: { pokemon: pokemon }) => {
  return (
    <div
      key={pokemon.id}
      className="flex items-center space-x-8 overflow-x-hidden rounded-lg border bg-white p-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <Image
          src={pokemon.imageUrl ?? ""}
          alt={pokemon.name}
          width={120}
          height={120}
          className="rounded-lg p-2 shadow-md"
        />
        <h2 className="text-2xl font-semibold text-gray-800">{pokemon.name}</h2>
      </div>

      <div className="w-fit text-gray-600">
        <div className="text-xl font-semibold text-gray-800">Stats</div>
        <PokemonLineItem
          label="Type"
          value={ElementTypeDisplayNames[pokemon.type]}
        />
        <PokemonLineItem label="Level" value={pokemon.level} />
        <PokemonLineItem label="Health" value={pokemon.baseHp} />
        <PokemonLineItem label="Speed" value={pokemon.speed} />
        <PokemonLineItem label="Physical Att." value={pokemon.attack} />
        <PokemonLineItem label="Physical Def." value={pokemon.defense} />
        <PokemonLineItem label="Special Att." value={pokemon.specialAttack} />
        <PokemonLineItem label="Special Def." value={pokemon.specialDefense} />
        <PokemonLineItem label="Battles Won" value={pokemon.battlesWon} />
      </div>
    </div>
  );
};

const PokemonLineItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="flex gap-2 text-sm">
      <div className="w-24 font-semibold">{label}</div>
      <div className="truncate">{value}</div>
    </div>
  );
};
