import type { IResolvers, MercuriusContext } from 'mercurius';

type HouseholdId = {
  householdId: string;
};

export const graphQlResolvers: IResolvers = {
  Query: {
    getUsersWithExpenses: async (_parent, { householdId }: HouseholdId, ctx: MercuriusContext) => {
      console.log('Resolver called for householdId:', householdId);
      const users = await ctx.app.prisma.users.findMany({ where: { householdId }, include: { expenses: true } });
      return users;
    },
  },
};
