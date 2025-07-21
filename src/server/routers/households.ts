import { householdId, type HouseholdIdParam } from '@interfaces';
import { getHouseholdsData } from '@services';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const householdRoutes = (fastify: FastifyInstance) => {
  fastify.get(
    '/details/:id',
    { schema: { params: householdId } },
    async function (req: FastifyRequest<{ Params: HouseholdIdParam }>, rep: FastifyReply) {
      const household = await getHouseholdsData(this.prisma, req.params.id);
      return rep.status(200).send(household);
    },
  );
};

export default householdRoutes;
