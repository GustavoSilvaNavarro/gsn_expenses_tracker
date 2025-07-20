// import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

// const quoteRoutes = (fastify: FastifyInstance) => {
//   fastify.post(
//     '/new/user/household',
//     { schema: { body: newQuotePayload } },
//     async function (req: FastifyRequest<{ Body: NewQuote }>, reply: FastifyReply) {
//       const payload = req.body;
//       const newQuote = await addNewQuote(this.prisma, payload);

//       reply.status(201);
//       return newQuote;
//     },
//   );
// };

// export default quoteRoutes;
