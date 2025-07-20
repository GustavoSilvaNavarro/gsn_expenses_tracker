import { BadRequestError } from '@errors';
import type { NewHouseholdUser } from '@interfaces';
import type { PrismaClient } from '@prisma/client';

export const addNewUserAndHousehold = async (db: PrismaClient, payload: NewHouseholdUser) => {
  const { householdName, ...rest } = payload;
  const familyName = householdName ?? payload.lastname;

  const user = await db.users.findUnique({ where: { email: payload.email } });
  if (user) throw new BadRequestError(`User with email ${payload.email} is already in use`);

  const newHousehold = await db.households.create({ data: { householdName: familyName } });
  const newUser = await db.users.create({
    data: { ...rest, householdId: newHousehold.id },
    include: { household: true },
  });
  return newUser;
};

export const getUserDetails = async (db: PrismaClient, email: string) => {
  const userDetails = await db.users.findFirstOrThrow({ where: { email } });

  return userDetails;
};
