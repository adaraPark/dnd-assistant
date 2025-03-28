import type { Character } from "@prisma/client";

export const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <div className="transform rounded-lg bg-white p-6 shadow-lg hover:scale-105 hover:shadow-2xl">
      <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">
        {character.name}
      </h2>
      <div className="space-y-4">
        <CharacterLineItem label="Health" value={character.health} />
      </div>
    </div>
  );
};

const CharacterLineItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-lg font-semibold text-gray-900">{value}</div>
    </div>
  );
};
