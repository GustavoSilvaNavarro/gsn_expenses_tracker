export const unexpectedError = {
  description: 'Unexpected',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/Error' },
    },
  },
};

export const badRequestError = {
  description: 'Bad Request',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/Error' },
    },
  },
};
