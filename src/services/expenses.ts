import type { ExpensesQueryParams, NewExpense } from '@interfaces';
import type { PrismaClient } from '@prisma/client';
import { BadRequestError } from '@server/errors';

export const addNewExpenses = async (
  db: PrismaClient,
  payload: Array<NewExpense>,
  queryParams: ExpensesQueryParams,
) => {
  const { id, barebones } = queryParams;

  const household = await db.households.findUnique({
    where: { id },
    include: { users: { select: { id: true } }, categories: { select: { id: true } } },
  });

  if (!household) throw new BadRequestError(`Household with ID: ${id} does not exist`);
  const categoryIds = household.categories.map((category) => category.id);
  const userIds = household.users.map((user) => user.id);

  const expenses = payload.filter(
    (expense) => categoryIds.includes(expense.categoryId) && userIds.includes(expense.userId),
  );
  if (!expenses.length) throw new BadRequestError('There is no expenses, check the user or categories');

  if (barebones) {
    const { count } = await db.expenses.createMany({ data: expenses });
    return count;
  } else return await db.expenses.createManyAndReturn({ data: expenses });
};

export const retrieveAllExpensesByHouseholdId = async (db: PrismaClient, householdId: string) => {
  // return await db.expenses.findMany({ where: { }})
};
