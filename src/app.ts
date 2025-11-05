import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import Fastify from "fastify";

import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";

import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { ZodError } from "zod";
import { env } from "./env";

import { usersRoutes } from "./http/routes/users";

export const app = Fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyJwt, {
	secret: env.JTW_HASH,
});

app.register(cors, {
	origin: "*",
	methods: ["POST", "GET", "PATCH", "DELETE"],
});

app.register(fastifySwagger, {
	openapi: { info: { title: "API", version: env.VERSION } },
	transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

app.register(usersRoutes);

// app.setErrorHandler((error, _, reply) => {
//   if (error instanceof ZodError) {
//     return reply
//       .status(400)
//       .send({ message: error.message, issues: error.format() });
//   }
//   if (process.env.NODE_ENV !== "production") {
//     console.error(error);
//   }
//   return reply.status(500).send({ message: "Internal server error" });
// });
