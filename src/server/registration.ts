import { registerGraphQl } from '@graphql';
import type { FastifyInstance } from 'fastify';

import { registerRoutes } from './routers';

export const registerGraphQlAndRoutes = async (fastify: FastifyInstance) => {
  fastify.register(registerGraphQl);
  await fastify.register(registerRoutes);
};
