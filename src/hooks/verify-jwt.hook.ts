import { UnauthorizedError } from "@/utils/errors";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJwtHook(request: FastifyRequest, _: FastifyReply) {
	const token = request.headers.Authorization;
	if (!token) throw new UnauthorizedError("Unauthorized");
	let decodedToken: { sub: string | null } = { sub: null };

	try {
		decodedToken = await request.jwtVerify<{ sub: string }>();
	} catch {
		throw new UnauthorizedError("Invalid token");
	}

	request.log.debug(decodedToken, "token");
	if (!decodedToken.sub) throw new UnauthorizedError("Unauthorized");
}
