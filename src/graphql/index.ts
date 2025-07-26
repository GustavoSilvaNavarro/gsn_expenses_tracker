import type { FastifyInstance } from 'fastify';
import mercurius from 'mercurius';

import { graphQlResolvers } from './resolvers';
import { graphQlSchemas } from './schemas';

export const registerGraphQl = (fastify: FastifyInstance) => {
  fastify.register(mercurius, {
    schema: graphQlSchemas,
    resolvers: graphQlResolvers,
    graphiql: true,
  });
};
