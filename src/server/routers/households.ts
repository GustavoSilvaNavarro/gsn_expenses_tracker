import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const householdRoutes = (fastify: FastifyInstance) => {
  fastify.get('/household/details/:id', function (_req: FastifyRequest, _rep: FastifyReply) {
    return { msg: 'Hello World' };
  });
};

export default householdRoutes;
