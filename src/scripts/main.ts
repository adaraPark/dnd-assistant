// Don't commit your changes so that this file remains empty

import { createMoves } from "./src/createMoves";
import { createPokemon } from "./src/createPokemon";
import { createPokemonMoves } from "./src/createPokemon";
export async function main() {
  await createMoves();
  await createPokemon();
  await createPokemonMoves();
}

// Add this line at the end of the file
main().catch(console.error);
