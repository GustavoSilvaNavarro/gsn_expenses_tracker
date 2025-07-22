import type { ExpensesQueryParams, NewExpense } from '@interfaces';
import type { PrismaClient } from '@prisma/client';
import { BadRequestError } from '@server/errors';

export const addNewExpenses = async (
  db: PrismaClient,
  payload: Array<NewExpense>,
  queryParams: ExpensesQueryParams,
) => {
  const { userId, barebones } = queryParams;
  const uniqueCategoryIds = Array.from(new Set(payload.map((item) => item.categoryId)));

  const [user, ids] = await Promise.all([
    db.users.findUnique({ where: { id: userId } }),
    db.categories.findMany({ where: { id: { in: uniqueCategoryIds } }, select: { id: true } }),
  ]);

  if (!user || !ids.length) {
    throw new BadRequestError(`User with ID: ${userId} does not exist or the categories do not exist.`);
  }

  const categoryIds = ids.map((id) => id.id);
  const expenses = payload.filter((expense) => categoryIds.includes(expense.categoryId));

  if (barebones) {
    const { count } = await db.expenses.createMany({ data: expenses.map((expense) => ({ ...expense, userId })) });
    return count;
  } else return await db.expenses.createManyAndReturn({ data: expenses.map((expense) => ({ ...expense, userId })) });
};
