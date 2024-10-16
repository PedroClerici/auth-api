import "@fastify/jwt";

declare module "@fastify/jwt" {
	interface FastifyJWT {
		payload: {
			sub: string;
			exp: number;
		};
	}
}
