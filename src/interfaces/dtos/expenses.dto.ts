import * as z from 'zod/v4';

export const newExpense = z.strictObject({
  amount: z.number().positive(),
  timestamp: z.iso.datetime(),
  categoryId: z.int().positive(),
});

export const newExpensesArr = z.strictObject({
  expenses: z.array(newExpense).min(1),
});

export type NewExpense = z.infer<typeof newExpense>;
export type NewExpensesArr = z.infer<typeof newExpensesArr>;
