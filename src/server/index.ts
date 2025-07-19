import { logger } from '@adapters';
import { ENVIRONMENT, PORT } from '@config';
import compress from '@fastify/compress';
import helmet from '@fastify/helmet';
import { customHeadersPlugin } from '@middlewares';
import { prismaPlugin } from '@plugins';
import Fastify, { type FastifyBaseLogger } from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';

import registerRoutes from './routers';

const fastify = Fastify({
  loggerInstance: logger as FastifyBaseLogger,
  disableRequestLogging: !['local', 'test'].includes(ENVIRONMENT) ? true : false,
}).withTypeProvider<ZodTypeProvider>();

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

export const serverSetup = async () => {
  // Register plugins
  fastify.register(prismaPlugin);

  fastify.register(helmet);
  fastify.register(compress);
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
