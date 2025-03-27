import { PrismaClient } from "@prisma/client";
import { env } from "app/env";
import { createClientExtensions } from "prisma/extensions";

export * from "@prisma/client";

const createPrismaClient = () => {
  const client = new PrismaClient({
    log:
      env.NODE_ENV === "development"
        ? [
            "error",
            "warn",
            {
              emit: "event",
              level: "query",
            },
          ]
        : [
            "error",
            {
              emit: "event",
              level: "query",
            },
          ],
  });

  return createClientExtensions(client);
};

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient>;
};

export type GlobalPrismaClient = ReturnType<typeof createPrismaClient>;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
