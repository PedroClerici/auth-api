import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]),
	KEY: z.string(),
	JWT_SECRET: z.string(),
	JWT_AUTH_TOKEN_EXPIRE_IN_MINUTES: z.coerce.number(),
	PORT: z.coerce.number(),
	ADDRESS: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (parsedEnv.success === false) {
	console.error(parsedEnv.error.format(), "Invalid environment variables.");

	throw new Error("Invalid environment variables.");
}

export const env = Object.freeze(parsedEnv.data);
