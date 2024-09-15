import { app } from './app.js';
import { env } from './env/index.js';

app
	.listen({
		port: env.PORT,
		host: env.host,
	})
	.then(() => {
		console.log('HTTP Server Running!');
		console.log({
			port: env.PORT,
			environment: env.NODE_ENV,
			host: env.host,
			dataBaseUrl: env.DATA_BASE_URL,
			dataBaseClient: env.DATA_BASE_CLIENT,
		});
	});
