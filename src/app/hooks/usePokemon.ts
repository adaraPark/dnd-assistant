import { api } from "app/trpc/react";

export const useUpdatePokemon = () => {
  const { mutate } = api.pokemon.update.useMutation();
  return { mutate };
};
