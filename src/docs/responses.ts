export const unexpectedError = {
  description: 'Unexpected',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/Error' },
    },
  },
};
