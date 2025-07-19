import { API_URL } from '@config';

export const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'GSN Expenses Tracker API Reference',
    version: '1.0.0',
    description: 'Expenses Tracker API service to help track daily expenses.',
  },
  servers: [{ url: API_URL, description: 'Base no version server' }],
  tags: [
    { name: 'Monitoring', description: 'API health checks.' },
    { name: 'Users', description: 'User management endpoints.' },
    { name: 'Households', description: 'Households management endpoints.' },
  ],
  components: {
    schemas: {
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
    },
  },
};
