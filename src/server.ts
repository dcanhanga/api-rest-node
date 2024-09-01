import fastify from 'fastify';
import { knex } from './database.js';

const app = fastify();

app.get('/', async (_req, res) => {
	const transactions = await knex('sqlite_schema').select('*');
	res.send({ transactions });
	console.log(transactions);
});

app
	.listen({ port: 3000 })
	.then(() => {
		console.log('Server listening at http://localhost:3000');
	})
	.then((error) => {
		console.log(error);
	});
