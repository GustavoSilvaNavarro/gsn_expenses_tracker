import * as z from 'zod/v4';

export const idParam = z.strictObject({
  id: z.coerce.number().int().positive(),
});

export const emailQueryParam = z.strictObject({
  email: z.email().trim().toLowerCase(),
});

export const householdId = z.strictObject({
  id: z.ulid().trim(),
});

export const userIdQuery = z.strictObject({
  userId: z.coerce.number().int().positive(),
});

export const barebonesIdQuery = z
  .preprocess(
    (val) => {
      if (typeof val === 'string') {
        if (val.toLowerCase() === 'true') return true;
        if (val.toLowerCase() === 'false') return false;
      }
      return val; // Pass other values (undefined, null, numbers, etc.) to the next schema
    },
    z.boolean(), // After preprocessing, expect a boolean
  )
  .optional()
  .default(false);

export const expensesQueryParams = userIdQuery.extend({ barebones: barebonesIdQuery });

export type IdParam = z.infer<typeof idParam>;
export type UserIdQueryParam = z.infer<typeof userIdQuery>;
export type EmailQueryParam = z.infer<typeof emailQueryParam>;
export type HouseholdIdParam = z.infer<typeof householdId>;
export type ExpensesQueryParams = z.infer<typeof expensesQueryParams>;
