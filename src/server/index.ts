import { logger } from '@adapters';
import { ENVIRONMENT, PORT } from '@config';
import { swaggerDefinition } from '@docs';
import compress from '@fastify/compress';
// import helmet from '@fastify/helmet';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { customHeadersPlugin } from '@middlewares';
import { prismaPlugin } from '@plugins';
import Fastify, { type FastifyBaseLogger } from 'fastify';

import { registerGraphQlAndRoutes } from './registration';

const fastify = Fastify({
  loggerInstance: logger as FastifyBaseLogger,
  disableRequestLogging: !['local', 'test'].includes(ENVIRONMENT),
});

export const serverSetup = async () => {
  // Register plugins
  fastify.register(prismaPlugin);

  // fastify.register(helmet);
  fastify.register(compress);
  fastify.register(swagger, { mode: 'static', specification: { document: swaggerDefinition } });
  fastify.register(swaggerUI, {
    routePrefix: '/docs',
  });

  // custom plugins
  fastify.register(customHeadersPlugin);

  // Register graphql and routes
  await registerGraphQlAndRoutes(fastify);

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
