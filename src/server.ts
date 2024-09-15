import { app } from './app.js';
import { env } from './env/index.js';

app
	.listen({
		port: env.PORT,
		host: env.host,
	})
	.then(() => {
		console.log('HTTP Server Running!');
	});
