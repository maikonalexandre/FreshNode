import type { FastifyTypedInstance } from "../../_types/fastify";
import {
	CreateUserResponseSchema,
	CreateUserSchema,
	create,
} from "../controllers/users/create";

export async function usersRoutes(app: FastifyTypedInstance) {
	app.post(
		"/users",
		{
			schema: {
				tags: ["Users"],
				description: "Create a new user",
				body: CreateUserSchema,
				response: CreateUserResponseSchema,
			},
		},
		create,
	);
}
