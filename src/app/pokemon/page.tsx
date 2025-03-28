import { HydrateClient } from "app/trpc/server";
import { Characters } from "../components/table/characters";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] p-4 text-white">
        <div className="text-3xl font-semibold">
          Welcome to the Dungeon and Dragons Assistant
        </div>
        <Characters />
      </main>
    </HydrateClient>
  );
}
