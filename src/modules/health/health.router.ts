import "zod-openapi/extend";
import type { FastifyInstance } from "fastify";
import { z } from "zod";

export async function healthRouter(app: FastifyInstance) {
	app.get(
		"/healthz",
		{
			schema: {
				tags: ["Health"],
				response: {
					200: z.object({ message: z.literal("Service is healthy.") }),
				},
			},
		},
		async (_request, reply) => {
			reply.status(200).send({ message: "Service is healthy." });
		},
	);
}
