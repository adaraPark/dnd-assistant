import { HydrateClient } from "app/trpc/server";
import PokemonTable from "../components/battle/PokemonTable";

export default async function Home() {
  return (
    <HydrateClient>
      <PokemonTable />
    </HydrateClient>
  );
}
