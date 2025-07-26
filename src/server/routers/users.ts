import {
  type EmailQueryParam,
  emailQueryParam,
  householdId,
  type HouseholdIdParam,
  type NewHouseholdUser,
  newHouseholdUser,
  type NewUser,
  newUser,
} from '@interfaces';
import { addNewUserAndHousehold, addNewUserToHousehold, getUserDetails } from '@services/users';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const userRoutes = (fastify: FastifyInstance) => {
  fastify.post(
    '/new/user/household',
    { schema: { body: newHouseholdUser } },
    async function (req: FastifyRequest<{ Body: NewHouseholdUser }>, reply: FastifyReply): Promise<void> {
      const payload = req.body;
      const newUser = await addNewUserAndHousehold(this.prisma, payload);

      reply.status(201).send(newUser);
    },
  );
  fastify.get(
    '/user/details',
    { schema: { querystring: emailQueryParam } },
    async function (req: FastifyRequest<{ Querystring: EmailQueryParam }>, reply: FastifyReply) {
      const query = req.query;
      const userDetails = await getUserDetails(this.prisma, query.email);
      return reply.status(200).send(userDetails);
    },
  );
  fastify.post(
    '/add/new',
    { schema: { querystring: householdId, body: newUser } },
    async function (req: FastifyRequest<{ Querystring: HouseholdIdParam; Body: NewUser }>, reply: FastifyReply) {
      const newUser = await addNewUserToHousehold(this.prisma, req.body, req.query.id);
      return reply.status(201).send(newUser);
    },
  );
};

export default userRoutes;
