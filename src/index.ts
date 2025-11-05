import { app } from "./app";
import { env } from "./env";

app.listen({ host: env.HOST, port: env.PORT }).then((address) => {
	console.log(`✅ Server is running in port: ${address}`);
});
