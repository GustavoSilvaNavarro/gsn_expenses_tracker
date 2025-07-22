import { type ExpensesQueryParams, expensesQueryParams, type NewExpensesArr, newExpensesArr } from '@interfaces';
import { addNewExpenses } from '@services';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const expensesRoutes = (fastify: FastifyInstance) => {
  fastify.post(
    '/new/expenses',
    { schema: { querystring: expensesQueryParams, body: newExpensesArr } },
    async function (
      req: FastifyRequest<{ Querystring: ExpensesQueryParams; Body: NewExpensesArr }>,
      rep: FastifyReply,
    ) {
      const newExpenses = await addNewExpenses(this.prisma, req.body.expenses, req.query);
      if (Array.isArray(newExpenses)) return rep.status(201).send(newExpenses);
      else rep.status(201).send({ success: true, count: newExpenses });
    },
  );
};

export default expensesRoutes;
