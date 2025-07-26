import { URL_PREFIX } from '@config';
import helmet from '@fastify/helmet';
import type { FastifyInstance } from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';

import categoryRoutes from './categories';
import expensesRoutes from './expenses';
import householdRoutes from './households';
import monitoringRoutes from './monitoring';
import userRoutes from './users';

export const registerRoutes = async (fastify: FastifyInstance) => {
  fastify.register(helmet);
  await fastify.register(monitoringRoutes);

  // Register all other routes with global /api prefix
  await fastify.register(
    async (fastify) => {
      // NOTE: Encapsulating fastify instance to use zod
      // Allow only my routes to use zod as a validator
      const apiFastify = fastify.withTypeProvider<ZodTypeProvider>();
      apiFastify.setValidatorCompiler(validatorCompiler);
      apiFastify.setSerializerCompiler(serializerCompiler);

      await apiFastify.register(userRoutes, { prefix: '/users' });
      await apiFastify.register(householdRoutes, { prefix: '/households' });
      await apiFastify.register(categoryRoutes, { prefix: '/categories' });
      await apiFastify.register(expensesRoutes, { prefix: '/expenses' });
    },
    { prefix: `/${URL_PREFIX}` },
  );
};
