import { useEffect, useState } from "react";

import { PokemonBattleView } from "app/app/components/battle/PokemonBattleView";
import { redirect } from "next/navigation";
import React from "react";
import { ActionBar } from "./ActionBar";
import { calculateDamage } from "app/app/battle/damage";
import useBattle from "app/app/hooks/useBattle";
import { api, type RouterOutputs } from "app/trpc/react";
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
  });
  const [openModal, setOpenModal] = useState(false);
  //mutations
  const updatePokemon = useUpdatePokemon();

  //todo clean this up make sure its straight forward
  const attack = (chosenMove: Move) => {
    const attacker = state.isPlayersTurn ? pokemon : opponent;
    const defender = state.isPlayersTurn ? opponent : pokemon;

    const damage = calculateDamage({
      attacker,
      defender,
      moveUsed: chosenMove,
    });
    console.log("damage", damage);

    if (state.isPlayersTurn) {
      playerMove(damage);
    } else {
      cpuMove(damage);
    }

    if (state.isGameOver) {
      console.log("game over");
      setOpenModal(true);
    }
  };

  //   //todo change how this works
  useEffect(() => {
    if (state.isGameOver) {
      setOpenModal(true);

      const playerWins = state.playerCp >= state.opponentCp;

      if (playerWins) {
        updatePokemon.mutate({
          id: pokemon.id,
          battlesWon: pokemon.battlesWon + 1,
        });
        updatePokemon.mutate({
          id: opponent.id,
          battlesLost: opponent.battlesLost + 1,
        });
      } else {
        updatePokemon.mutate({
          id: pokemon.id,
          battlesLost: pokemon.battlesLost + 1,
        });
        updatePokemon.mutate({
          id: opponent.id,
          battlesWon: opponent.battlesWon + 1,
        });
      }
    }
  }, [state.isGameOver, state.playerCp, state.opponentCp]);

  return (
    <div className="flex h-full flex-col gap-4 bg-amber-100 p-4 md:flex-row">
      <div className="flex flex-1 flex-col gap-4">
        <PokemonBattleView pokemon={pokemon} battleCp={state.playerCp} />
        <ActionBar
          pokemonId={pokemon.id}
          attack={attack}
          isPlayersTurn={state.isPlayersTurn}
        />
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <PokemonBattleView pokemon={opponent} battleCp={state.opponentCp} />
        <ActionBar
          pokemonId={opponent.id}
          attack={attack}
          isPlayersTurn={!state.isPlayersTurn}
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
          Game Over!{" "}
          {state.playerCp > state.opponentCp ? "You win" : "You lose"}
        </div>
      </Modal>
    </div>
  );
};
