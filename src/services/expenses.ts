import type { ExpensesQueryParams, NewExpense } from '@interfaces';
import type { Households, PrismaClient } from '@prisma/client';
import { BadRequestError } from '@server/errors';

type Household = (Households & { users: Array<{ id: number }> } & { categories: Array<{ id: number }> }) | null;

export const addNewExpenses = async (
  db: PrismaClient,
  payload: Array<NewExpense>,
  queryParams: ExpensesQueryParams,
) => {
  const { id, barebones } = queryParams;

  const household = (await db.households.findUnique({
    where: { id },
    include: { users: { select: { id: true } }, categories: { select: { id: true } } },
  })) as Household;

  console.log(household);

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
