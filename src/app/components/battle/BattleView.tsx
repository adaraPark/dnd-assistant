import { useState } from "react";

import { PokemonBattleView } from "app/app/components/battle/PokemonBattleView";
import { redirect } from "next/navigation";
import React from "react";
import { calculateDamage } from "app/app/battle/damage";
import useBattle from "app/app/hooks/useBattle";
import { type RouterOutputs } from "app/trpc/react";
import Modal from "app/components/modal";
import { useUpdatePokemon } from "app/app/hooks/usePokemon";

type Move = NonNullable<RouterOutputs["move"]["byPokemonId"]>[number];
type pokemon = NonNullable<RouterOutputs["pokemon"]["byId"]>;

export const BattleView = ({
  pokemon,
  opponent,
}: {
  pokemon: pokemon;
  opponent: pokemon;
}) => {
  //state
  const { state, playerMove, cpuMove, resetGame } = useBattle({
    initialPlayerCp: pokemon.baseHp,
    initialOpponentCp: opponent.baseHp,
    isPlayersTurn: pokemon.speed >= opponent.speed,
  });
  const [damage, setDamage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  //mutations
  const updatePokemon = useUpdatePokemon();

  const attack = async (chosenMove: Move) => {
    const attacker = state.isPlayersTurn ? pokemon : opponent;
    const defender = state.isPlayersTurn ? opponent : pokemon;

    const damage = calculateDamage({
      attacker,
      defender,
      moveUsed: chosenMove,
    });
    setDamage(damage);

    if (state.isPlayersTurn) {
      playerMove(damage);
      if (state.opponentCp - damage <= 0) {
        setOpenModal(true);
        await updatePokemonStats({ playerWins: true });
      }
    } else {
      cpuMove(damage);
      if (state.playerCp - damage <= 0) {
        setOpenModal(true);
        await updatePokemonStats({ playerWins: false });
      }
    }
  };

  const updatePokemonStats = async ({
    playerWins,
  }: {
    playerWins: boolean;
  }) => {
    await updatePokemon.mutateAsync({
      id: pokemon.id,
      battlesWon: playerWins ? pokemon.battlesWon + 1 : pokemon.battlesWon,
      battlesLost: playerWins ? pokemon.battlesLost : pokemon.battlesLost + 1,
    });
    await updatePokemon.mutateAsync({
      id: opponent.id,
      battlesLost: playerWins ? opponent.battlesLost + 1 : opponent.battlesLost,
      battlesWon: playerWins ? opponent.battlesWon : opponent.battlesWon + 1,
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:h-screen md:flex-row">
      <div className="flex flex-1 flex-col gap-4">
        <PokemonBattleView
          pokemon={pokemon}
          battleHp={state.playerCp}
          isPlayersTurn={state.isPlayersTurn}
          damage={damage}
          attack={attack}
          opponentType={opponent.type}
        />
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <PokemonBattleView
          pokemon={opponent}
          battleHp={state.opponentCp}
          isPlayersTurn={!state.isPlayersTurn && !state.isGameOver}
          damage={damage}
          attack={attack}
          isCpu={true}
          opponentType={pokemon.type}
        />
      </div>
      <Modal
        isOpen={openModal}
        closeProps={{
          onClick: () => {
            setOpenModal(false);
            redirect("/pokemon");
          },
          label: "Exit game",
        }}
        confirmProps={{
          onClick: () => {
            setOpenModal(false);
            resetGame(Number(pokemon.baseHp), Number(opponent.baseHp));
          },
          label: "Play again",
        }}
      >
        <div>
          <p className="mb-4 font-semibold text-gray-700">
            Game over!{" "}
            {state.playerCp > state.opponentCp
              ? `You beat ${opponent.name}!`
              : `You lost to ${opponent.name}!`}
          </p>
        </div>
      </Modal>
    </div>
  );
};
