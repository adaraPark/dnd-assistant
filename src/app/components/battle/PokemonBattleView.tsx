import Image from "next/image";
import { PokemonCard } from "../PokemonCard";
import { type RouterOutputs } from "app/trpc/react";
import ProgressBar from "app/components/ui/progress";
import { MoveActionPanel } from "./MoveActionPanel";

type pokemon = NonNullable<RouterOutputs["pokemon"]["byId"]>;
type Move = NonNullable<RouterOutputs["move"]["byPokemonId"]>[number];

export const PokemonBattleView = ({
  pokemon,
  battleHp,
  isPlayersTurn,
  damage,
  attack,
  isCpu = false,
}: {
  pokemon: pokemon;
  battleHp: number;
  isPlayersTurn: boolean;
  damage: number;
  attack: (move: Move) => void;
  isCpu?: boolean;
}) => {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-grow flex-col">
        <div className="flex">
          <PokemonCard pokemon={pokemon} />
        </div>
        <div className="flex flex-2 items-center justify-center gap-2">
          <Image
            src={pokemon.imageUrl}
            alt={pokemon.name}
            width={300}
            height={300}
          />
          {!isPlayersTurn && damage > 0 && (
            <div className="rounded-lg bg-white p-2 text-gray-600 shadow-lg">
              Damage inflicted: {damage}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="text-gray-600">Hp: {battleHp}</div>
          <ProgressBar highestValue={pokemon.baseHp} currentValue={battleHp} />
        </div>
      </div>
      <MoveActionPanel
        pokemon={pokemon}
        attack={attack}
        isPlayersTurn={isPlayersTurn}
        isCpu={isCpu}
      />
    </div>
  );
};
