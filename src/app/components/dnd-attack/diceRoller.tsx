import { Combobox } from "app/components/combobox";
import { Button } from "app/components/ui/button";
import React, { useState } from "react";

const DiceRoller = () => {
  // List of dice types (D&D standard dice)
  const diceTypes = [4, 6, 8, 10, 12, 20];

  // State to keep track of selected dice type and the roll result
  const [selectedDie, setSelectedDie] = useState<number>(20); // Default to d20
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

      <div className="flex gap-2">
        <div className="mb-2 text-lg font-medium text-white">Choose a die:</div>
        <Combobox
          label="Select a die"
          data={diceTypes.map((sides) => ({
            id: sides.toString(),
            label: `d${sides}`,
          }))}
          onSelect={(id) => {
            setSelectedDie(Number(id));
          }}
        />
      </div>

      <Button
        onClick={() => rollDice(selectedDie)}
        className="w-full hover:scale-105"
      >
        {result !== null ? "Roll the Dice" : "Roll Again"}
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
