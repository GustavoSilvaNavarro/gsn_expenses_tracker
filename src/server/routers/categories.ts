import { type NewCategory, newCategory } from '@interfaces';
import { createNewCategory } from '@services';
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
};

export default categoryRoutes;
