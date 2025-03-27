/**
 * Take in the base prisma client and return an extended client
 */
export const createClientExtensions = (client: PrismaClient) => {
  client.$extends({
    character: {
      needs: { type: true },
      compute(data) {
        return CharacterSchema.parse(data.type);
      },
    },
  });
  return client;
};
