// import { URL_PREFIX } from '@config';
import type { FastifyInstance } from 'fastify';

import monitoringRoutes from './monitoring';

const registerRoutes = async (fastify: FastifyInstance) => {
  // Register all routes with /api prefix
  await fastify.register(monitoringRoutes);
};

export default registerRoutes;
