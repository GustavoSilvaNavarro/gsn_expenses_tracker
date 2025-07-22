import { type EmailQueryParam, emailQueryParam, type NewHouseholdUser, newHouseholdUser } from '@interfaces';
import { addNewUserAndHousehold, getUserDetails } from '@services/users';
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
  fastify.get(
    '/user/details',
    { schema: { querystring: emailQueryParam } },
    async function (req: FastifyRequest<{ Querystring: EmailQueryParam }>, reply: FastifyReply) {
      const userDetails = await getUserDetails(this.prisma, req.query.email);
      return reply.status(200).send(userDetails);
    },
  );
};

export default userRoutes;
