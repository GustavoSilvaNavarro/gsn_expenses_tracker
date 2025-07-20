import * as z from 'zod/v4';

export const idParam = z.strictObject({
  id: z.coerce.number().int().positive(),
});

export const emailQueryParam = z.strictObject({
  email: z.email().trim().toLowerCase(),
});

export type IdParam = z.infer<typeof idParam>;
export type EmailQueryParam = z.infer<typeof emailQueryParam>;
