import { HydrateClient } from "app/trpc/server";
import PokemonTable from "../components/PokemonTable";

export default async function Home() {
  return (
    <HydrateClient>
      <PokemonTable />
    </HydrateClient>
  );
}
