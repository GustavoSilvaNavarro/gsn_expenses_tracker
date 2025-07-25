// NOTE: Common schemas
export const schemas = {
  Error: {
    type: 'object' as const,
    properties: {
      statusCode: { type: 'number' as const, description: 'HTTP status code', example: 500 },
      error: {
        type: 'string' as const,
        description: 'Error type (e.g., "Service Unavailable")',
        example: 'Internal Server Error',
      },
      message: {
        type: 'string' as const,
        description: 'Detailed error message',
        example: 'An unexpected error occurred on the server',
      },
    },
    required: ['statusCode', 'error', 'message'],
  },
};
