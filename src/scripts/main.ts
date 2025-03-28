// Don't commit your changes so that this file remains empty

import { createMoves } from "./src/createMoves";
import { createPokemon } from "./src/createPokemon";

export async function main() {
  console.log("Hello, world!");
  await createMoves();
  await createPokemon();
}

// Add this line at the end of the file
main().catch(console.error);
