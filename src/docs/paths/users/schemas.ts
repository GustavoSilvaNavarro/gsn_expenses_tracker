export const userSchemas = {
  NewUser: {
    type: 'object' as const,
    description: 'Schema for a new user',
    properties: {
      email: {
        type: 'string' as const,
        format: 'email',
        description: 'User email address',
        example: 'test@test.com',
      },
      name: {
        type: 'string' as const,
        description: 'User first name',
        minLength: 1,
        example: 'Test',
      },
      lastname: {
        type: 'string' as const,
        description: 'User last name',
        minLength: 1,
        example: 'Mc Testerson',
      },
    },
    required: ['email', 'name', 'lastname'],
    additionalProperties: false,
  },
  HouseholdName: {
    type: 'object' as const,
    description: 'Schema for household name',
    properties: {
      householdName: {
        type: 'string' as const,
        description: 'Name of the household (optional)',
        minLength: 1,
        example: 'Testerson Giver',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  BodyNewHouseholdUser: {
    type: 'object' as const,
    title: 'New Household User',
    description: 'Schema for creating a new user and associating them with a household.',
    allOf: [{ $ref: '#/components/schemas/NewUser' }, { $ref: '#/components/schemas/HouseholdName' }],
  },
  NewUserResponse: {
    type: 'object' as const,
    title: 'New User Response',
    description: 'Details of the newly created user and user.',
    allOf: [
      { $ref: '#/components/schemas/NewUser' },
      {
        properties: {
          id: {
            type: 'string' as const,
            format: 'uuid',
            example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
          },
          createdAt: {
            type: 'string' as const,
            format: 'date-time',
            example: '2023-10-27T10:00:00.000Z',
          },
          updatedAt: {
            type: 'string' as const,
            format: 'date-time',
            example: '2023-10-27T10:00:00.000Z',
          },
        },
      },
    ],
    additionalProperties: false,
    example: {
      id: 'e1f2g3h4-i5j6-7890-5678-90abcdef0123',
      name: 'Test',
      lastname: 'Mc Testerson',
      email: 'test@test.com',
      createdAt: '2023-10-27T10:30:00.000Z',
      updatedAt: '2023-10-27T10:30:00.000Z',
    },
  },
};
