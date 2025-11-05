import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const CreateUserSchema = z.object({
	name: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(6),
});

export const CreateUserResponseSchema = {
	201: z.object({
		id: z.string(),
		name: z.string(),
		email: z.string(),
	}),
	200: z.object({
		id: z.string(),
		name: z.string(),
		email: z.string(),
	}),
	409: z.object({
		message: z.string(),
	}),
};

export const create = async (
	request: FastifyRequest<{ Body: z.infer<typeof CreateUserSchema> }>,
	reply: FastifyReply,
) => {
	const { email, name, password } = request.body;

	const user = {
		id: crypto.randomUUID(),
		name,
		email,
		password,
	};

	return reply.status(200).send(user);
};
