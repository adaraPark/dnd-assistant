/*
  Warnings:

  - You are about to drop the `Character` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `battleHp` on the `Pokemon` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Move` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pokemonId,moveId]` on the table `PokemonToMove` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageUrl` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Character_name_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Character";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "baseHp" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "specialAttack" INTEGER NOT NULL,
    "specialDefense" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "battlesWon" INTEGER NOT NULL DEFAULT 0,
    "battlesLost" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Pokemon" ("attack", "baseHp", "battlesLost", "battlesWon", "createdAt", "defense", "id", "level", "name", "specialAttack", "specialDefense", "species", "speed", "type", "updatedAt") SELECT "attack", "baseHp", "battlesLost", "battlesWon", "createdAt", "defense", "id", "level", "name", "specialAttack", "specialDefense", "species", "speed", "type", "updatedAt" FROM "Pokemon";
DROP TABLE "Pokemon";
ALTER TABLE "new_Pokemon" RENAME TO "Pokemon";
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");
CREATE INDEX "Pokemon_name_idx" ON "Pokemon"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Move_name_key" ON "Move"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PokemonToMove_pokemonId_moveId_key" ON "PokemonToMove"("pokemonId", "moveId");
