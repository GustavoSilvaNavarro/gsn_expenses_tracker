import * as z from 'zod/v4';

export const newCategory = z.strictObject({
  category: z.string().trim().min(1, { error: 'Category can not be empty' }),
  householdId: z.ulid().trim(),
});

export type NewCategory = z.infer<typeof newCategory>;
