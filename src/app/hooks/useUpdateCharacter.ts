import { api } from "app/trpc/react";

export const useUpdateCharacter = () => {
  const { mutate } = api.character.update.useMutation();

  return { mutate };
};
