import { Combobox } from "app/components/combobox";
import { Button } from "app/components/ui/button";
import type { Character } from "@prisma/client";
import React, { useState } from "react";

// Dice options
const diceTypes = [4, 6, 8, 10, 12, 20];

const DiceRoller = ({ players }: { players: Character[] }) => {
  //state
  const [selectedDie, setSelectedDie] = useState<number>(20);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = (sides: number) => {
    setIsRolling(true);
    setTimeout(() => {
      const roll = Math.floor(Math.random() * sides) + 1;
      setResult(roll);
      setIsRolling(false);
    }, 1500);
  };

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 shadow-xl">
      <h1 className="text-center text-4xl font-bold text-white">
        Dungeons & Dragons Dice Roller
      </h1>

      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-2">
          <div className="mb-2 text-lg font-medium text-white">
            Choose a die:
          </div>
          <Combobox
            label="Select a die"
            data={diceTypes.map((sides) => ({
              id: sides,
              label: `d${sides}`,
            }))}
            onSelect={(val) => setSelectedDie(val.id)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="mb-2 text-lg font-medium text-white">
            Choose a player:
          </div>
          <Combobox
            label="Select a player"
            data={players.map((player) => ({
              id: player.id,
              label: player.name,
            }))}
            onSelect={(val) => setSelectedPlayer(val.id)}
          />
        </div>
      </div>

      <Button
        onClick={() => rollDice(selectedDie)}
        disabled={isRolling || selectedPlayer === null || selectedDie === null}
        className="w-full hover:scale-105"
      >
        {result ? "Roll Again" : "Roll the Dice"}
      </Button>

      {result && (
        <div className="text-center">
          <p className="text-3xl font-bold text-white">
            {isRolling ? "Rolling..." : `You rolled: ${result}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default DiceRoller;
