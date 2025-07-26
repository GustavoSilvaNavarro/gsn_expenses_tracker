import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod/v4';

type ReqType = 'body' | 'query' | 'params';

export const validateSchema = (schema: z.ZodType, type: ReqType) => (req: FastifyRequest, rep: FastifyReply) => {
  try {
    // Attempt to parse and validate the specified part of the request
    req[type] = schema.parse(req[type]);
  } catch (error) {
    // If validation fails, send a 400 Bad Request response
    if (error instanceof z.ZodError) {
      rep.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Validation failed',
        details: error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });
    } else {
      // Handle other potential errors during validation (e.g., unexpected data types)
      rep.status(500).send({
        statusCode: 500,
        error: 'Internal Server Error',
        message: 'An unexpected validation error occurred',
      });
    }
  }
};
