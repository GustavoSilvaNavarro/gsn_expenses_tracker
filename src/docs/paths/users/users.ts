import { badRequestError, unexpectedError } from '../../responses';

export const userPaths = {
  '/api/users/new/user/household': {
    post: {
      tags: ['Users'],
      summary: 'Create a new user and associate with a household',
      description: 'Allows creation of a new user and a new household, it creates a link among them.',
      requestBody: {
        description: 'Data for creating a new user and household',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/BodyNewHouseholdUser',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'New user created',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/NewUserResponse',
              },
            },
          },
        },
        400: badRequestError,
        500: unexpectedError,
      },
    },
  },
};
