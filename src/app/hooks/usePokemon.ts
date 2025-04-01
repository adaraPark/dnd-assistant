import { api } from "app/trpc/react";

export const useUpdatePokemon = () => {
  const utils = api.useUtils();
  const { mutateAsync } = api.pokemon.update.useMutation({
    onSuccess: () => {
      void utils.pokemon.byId.invalidate();
      void utils.pokemon.getAll.invalidate();
    },
    onError: () => {
      void utils.pokemon.byId.invalidate();
      void utils.pokemon.getAll.invalidate();
      console.error("Failed to update pokemon");
    },
  });
  return { mutateAsync };
};
