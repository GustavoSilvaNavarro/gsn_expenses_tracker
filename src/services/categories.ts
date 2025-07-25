import type { NewCategory } from '@interfaces';
import type { PrismaClient } from '@prisma/client';
import { BadRequestError } from '@server/errors';

export const createNewCategory = async (db: PrismaClient, payload: NewCategory) => {
  const household = await db.households.findUnique({ where: { id: payload.householdId } });

  if (!household) throw new BadRequestError(`Household was not found ID: ${payload.householdId}`);
  const newCategoryByHousehold = await db.categories.create({ data: payload });
  return newCategoryByHousehold;
};

export const retrieveCategoriesByHouseholdId = async (db: PrismaClient, householdId: string) => {
  return await db.categories.findMany({ where: { householdId } });
};
