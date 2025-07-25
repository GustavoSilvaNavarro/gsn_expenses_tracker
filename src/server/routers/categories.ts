import { householdId, type HouseholdIdParam, type NewCategory, newCategory } from '@interfaces';
import { createNewCategory, retrieveCategoriesByHouseholdId } from '@services';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const categoryRoutes = (fastify: FastifyInstance) => {
  fastify.post(
    '/new/category',
    { schema: { body: newCategory } },
    async function (req: FastifyRequest<{ Body: NewCategory }>, rep: FastifyReply) {
      const newCategory = await createNewCategory(this.prisma, req.body);
      return rep.status(201).send(newCategory);
    },
  );
  fastify.get(
    '/household/categories',
    { schema: { querystring: householdId } },
    async function (req: FastifyRequest<{ Querystring: HouseholdIdParam }>, rep: FastifyReply) {
      const categories = await retrieveCategoriesByHouseholdId(this.prisma, req.query.id);
      return rep.status(200).send(categories);
    },
  );
};

export default categoryRoutes;
