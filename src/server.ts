import { randomUUID } from 'node:crypto';
import fastify from 'fastify';
import { knex } from './database.js';
import { env } from './env/index.js';
import { transactionsRoutes } from './routes/transactions.js';

const app = fastify();
app.register(transactionsRoutes, {
	prefix: '/transactions',
});

app
	.listen({ port: env.PORT })
	.then(() => {
		console.log(`Server listening at http://localhost:${env.PORT}`);
	})
	.then((error) => {
		console.log(error);
	});
