import * as z from 'zod/v4';

export const newUser = z.strictObject({
  email: z.email().trim(),
  name: z.string().trim().toLowerCase().min(1, { error: 'Name cannot be empty' }),
  lastname: z.string().trim().toLowerCase().min(1, { error: 'Lastname cannot be empty' }),
});

export const houseHoldName = z.strictObject({
  householdName: z.nullish(z.string().trim().toLowerCase().min(1, { error: 'Household name cannot be empty' })),
});

export const newHouseholdUser = newUser.extend(houseHoldName.shape);

export type NewUser = z.infer<typeof newUser>;
export type NewHouseholdUser = z.infer<typeof newHouseholdUser>;
