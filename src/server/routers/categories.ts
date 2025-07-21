import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const categoryRoutes = (fastify: FastifyInstance) => {
  fastify.post('/new/categories', function (_req: FastifyRequest, _rep: FastifyReply) {
    return { ms: 'Hello World' };
  });
};

export default categoryRoutes;
