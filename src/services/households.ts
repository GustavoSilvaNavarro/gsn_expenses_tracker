import type { PrismaClient } from '@prisma/client';

export const getHouseholdsData = async (db: PrismaClient, id: string) => {
  return await db.households.findFirstOrThrow({ where: { id }, include: { users: true } });
};
