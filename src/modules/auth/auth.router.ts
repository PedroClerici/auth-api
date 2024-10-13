import "zod-openapi/extend";
import { z } from "zod";
import * as authController from "./auth.controller";
import type { FastifyInstance } from "fastify";
import { verifyJwtHook } from "@/hooks/verify-jwt.hook";

export async function authRouter(app: FastifyInstance) {
	app.get(
		"/token",
		{
			schema: {
				tags: ["Auth"],
				response: {
					200: z.object({ token: z.string() }),
				},
			},
		},
		authController.token,
	);
	app.get(
		"/super-secret",
		{
			schema: {
				tags: ["Auth"],
				headers: z.object({
					Authorization: z.string().default("Bearer"),
				}),
				response: {
					418: z.object({ message: z.string(), item: z.string() }),
				},
			},
			preHandler: verifyJwtHook,
		},
		authController.superSecret,
	);
}
