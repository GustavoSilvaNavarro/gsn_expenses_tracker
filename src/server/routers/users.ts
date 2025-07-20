import { type NewHouseholdUser, newHouseholdUser } from '@interfaces';
import { addNewUserAndHousehold } from '@services/users';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const userRoutes = (fastify: FastifyInstance) => {
  fastify.post(
    '/new/user/household',
    { schema: { body: newHouseholdUser } },
    async function (req: FastifyRequest<{ Body: NewHouseholdUser }>, reply: FastifyReply) {
      const payload = req.body;
      const newUser = await addNewUserAndHousehold(this.prisma, payload);

      reply.status(201).send(newUser);
    },
  );
};

export default userRoutes;
