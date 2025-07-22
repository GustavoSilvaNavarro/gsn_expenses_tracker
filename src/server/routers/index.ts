import { URL_PREFIX } from '@config';
import type { FastifyInstance } from 'fastify';

import categoryRoutes from './categories';
import expensesRoutes from './expenses';
import householdRoutes from './households';
import monitoringRoutes from './monitoring';
import userRoutes from './users';

const registerRoutes = async (fastify: FastifyInstance) => {
  await fastify.register(monitoringRoutes);

  // Register all other routes with global /api prefix
  await fastify.register(
    async (fastify) => {
      await fastify.register(userRoutes, { prefix: '/users' });
      await fastify.register(householdRoutes, { prefix: '/households' });
      await fastify.register(categoryRoutes, { prefix: '/categories' });
      await fastify.register(expensesRoutes, { prefix: '/expenses' });
    },
    { prefix: `/${URL_PREFIX}` },
  );
};

export default registerRoutes;
