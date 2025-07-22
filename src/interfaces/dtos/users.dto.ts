import * as z from 'zod/v4';

export const newHouseholdUser = z.strictObject({
  email: z.email().trim(),
  name: z.string().trim().toLowerCase().min(1, { error: 'Name cannot be empty' }),
  lastname: z.string().trim().toLowerCase().min(1, { error: 'Lastname cannot be empty' }),
  householdName: z.nullish(z.string().trim().toLowerCase().min(1, { error: 'Household name cannot be empty' })),
});

export type NewHouseholdUser = z.infer<typeof newHouseholdUser>;
