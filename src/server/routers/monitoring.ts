import { unexpectedError } from '@docs/responses';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const monitoringRoutes = (fastify: FastifyInstance) => {
  fastify.get(
    '/healthz',
    {
      schema: {
        tags: ['Monitoring'],
        summary: 'API Health Check',
        description: 'Checks the health of the API service.',
        response: {
          204: { description: 'Success' },
          500: unexpectedError,
        },
      },
    },
    (_req: FastifyRequest, reply: FastifyReply) => {
      reply.header('Content-Length', 0).status(204).send();
    },
  );
};

export default monitoringRoutes;
