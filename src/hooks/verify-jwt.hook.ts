import { UnauthorizedError } from "@/utils/errors";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJwtHook(request: FastifyRequest, _: FastifyReply) {
	const token = request.headers.Authorization;
	if (!token) throw new UnauthorizedError("Unauthorized");

	const decodedToken = await request.jwtDecode<{ sub: string }>();
	request.log.debug(decodedToken, "token");
	if (!decodedToken.sub) throw new UnauthorizedError("Unauthorized");
}
