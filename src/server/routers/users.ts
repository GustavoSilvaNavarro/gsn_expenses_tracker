import { type NewHouseholdUser, newHouseholdUser } from '@interfaces';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const userRoutes = (fastify: FastifyInstance) => {
  fastify.post(
    '/new/user/household',
    { schema: { body: newHouseholdUser } },
    function (req: FastifyRequest<{ Body: NewHouseholdUser }>, reply: FastifyReply) {
      const payload = req.body;

      console.log(payload);
      reply.status(201);
      return { msg: 'Hello World' };
    },
  );
};

export default userRoutes;
