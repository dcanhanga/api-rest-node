import { randomUUID } from 'node:crypto';
import fastify from 'fastify';
import { knex } from './database.js';
import { env } from './env/index.js';

const app = fastify();

app.get('/', async (_req, res) => {
	const transactions = await knex('transactions')
		.insert({
			id: randomUUID(),
			title: 'Transação de teste',
			amount: 1000,
		})
		.returning('*');
	res.send({ transactions });
	console.log(transactions);
});

app
	.listen({ port: env.PORT })
	.then(() => {
		console.log(`Server listening at http://localhost:${env.PORT}`);
	})
	.then((error) => {
		console.log(error);
	});
