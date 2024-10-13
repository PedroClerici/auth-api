import type { FastifyReply, FastifyRequest } from "fastify";
import { env } from "@/utils/env";

export async function token(_request: FastifyRequest, reply: FastifyReply) {
	const authToken = await reply.jwtSign({
		exp:
			Math.floor(Date.now() / 1000) + env.JWT_AUTH_TOKEN_EXPIRE_IN_MINUTES * 60,
		sub: crypto.randomUUID(),
	});

	return reply.status(200).send({ token: authToken });
}

export async function superSecret(
	_request: FastifyRequest,
	reply: FastifyReply,
) {
	return reply
		.status(418)
		.send({
			message: "It's dangerous to go alone! Take this.",
			item: "Wooden Sword",
		});
}
