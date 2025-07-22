import { logger } from '@adapters';
import { BadRequestError } from '@errors';
import type { NewHouseholdUser, NewUser } from '@interfaces';
import { Prisma, type PrismaClient } from '@prisma/client';

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

export const addNewUserToHousehold = async (db: PrismaClient, payload: NewUser, householdId: string) => {
  try {
    const newUser = await db.users.create({ data: { ...payload, householdId } });
    return newUser;
  } catch (err) {
    logger.error(`New user with email: ${payload.email} could not get created`, err);
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new BadRequestError(`Email: ${payload.email} already exist`);
    }
    throw err;
  }
};

export const getUserDetails = async (db: PrismaClient, email: string) => {
  const userDetails = await db.users.findFirstOrThrow({ where: { email } });

  return userDetails;
};
