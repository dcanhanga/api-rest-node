import { app } from './app.js';
import { env } from './env/index.js';

app
	.listen({ port: env.PORT })
	.then(() => {
		console.log(`Server listening at http://localhost:${env.PORT}`);
	})
	.catch((error) => {
		console.error(error);
	});
