import Image from "next/image";
import { PokemonCard } from "../PokemonCard";
import { type RouterOutputs } from "app/trpc/react";
import ProgressBar from "app/components/ui/progress";

type pokemon = NonNullable<RouterOutputs["pokemon"]["byId"]>;

export const PokemonBattleView = ({
  pokemon,
  battleHp,
}: {
  pokemon: pokemon;
  battleHp: number;
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <PokemonCard pokemon={pokemon} />
      </div>
      <div className="flex flex-2 items-center justify-center">
        <Image
          src={pokemon.imageUrl}
          alt={pokemon.name}
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col">
        <div className="text-gray-600">Hp: {battleHp}</div>
        <ProgressBar highestValue={pokemon.baseHp} currentValue={battleHp} />
      </div>
    </div>
  );
};
