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

export type IdParam = z.infer<typeof idParam>;
export type EmailQueryParam = z.infer<typeof emailQueryParam>;
export type HouseholdIdParam = z.infer<typeof householdId>;
