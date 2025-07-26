import { ENVIRONMENT } from '@config';
import helmet from '@fastify/helmet';
import type { FastifyInstance } from 'fastify';
import mercurius from 'mercurius';

import { graphQlResolvers } from './resolvers';
import { graphQlSchemas } from './schemas';

export const registerGraphQl = (fastify: FastifyInstance) => {
  // NOTE: Helmet blocks the UI from graphql it should deactivate it for local env
  if (!['local', 'test'].includes(ENVIRONMENT)) fastify.register(helmet);
  fastify.register(mercurius, {
    schema: graphQlSchemas,
    resolvers: graphQlResolvers,
    graphiql: true,
  });
};
