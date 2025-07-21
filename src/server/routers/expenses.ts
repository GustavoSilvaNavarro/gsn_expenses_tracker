import { newExpensesArr, userIdQuery } from '@interfaces';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const expensesRoutes = (fastify: FastifyInstance) => {
  fastify.post(
    '/new/expenses',
    { schema: { querystring: userIdQuery, body: newExpensesArr } },
    function (req: FastifyRequest, _rep: FastifyReply) {
      console.log(req.query);
      console.log(req.body);
      return { msg: 'Hello' };
    },
  );
};

export default expensesRoutes;
