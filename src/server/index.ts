import { logger } from '@adapters';
import { buildRouter } from '@adminjs/fastify';
import { PORT, URL_PREFIX } from '@config';
import helmet from '@fastify/helmet';
import { customHeadersPlugin } from '@middlewares';
import { prismaPlugin } from '@plugins';
import Fastify, { type FastifyBaseLogger } from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';

import { setupAdminJs } from './admin/index.ts';
import registerRoutes from './routers/index.ts';

const fastify = Fastify({
  loggerInstance: logger as FastifyBaseLogger,
  disableRequestLogging: true,
}).withTypeProvider<ZodTypeProvider>();

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

export const serverSetup = async () => {
  // Register plugins
  fastify.register(prismaPlugin);

  // AdminJs Setup
  const admin = setupAdminJs();
  await buildRouter(admin, fastify);

  fastify.register(helmet, {
    contentSecurityPolicy: false,
    prefix: URL_PREFIX ? `/${URL_PREFIX}/admin` : '/admin',
  });
  fastify.register(customHeadersPlugin);

  // Register all routes
  await registerRoutes(fastify);

  return fastify;
};

export const startServer = async () => {
  try {
    const fastify = await serverSetup();

    await fastify.listen({ port: PORT });
    fastify.log.info(`🚀 Expense Tracker API is running, listening on ${PORT}`);
  } catch (err) {
    fastify.log.error('Error starting fastify server', err);
    process.exit(1);
  }
};
