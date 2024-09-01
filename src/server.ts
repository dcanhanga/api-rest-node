import fastify from 'fastify';
import { knex } from './database.js';
const app = fastify();

app.get('/', async (_req, res) => {
	res.send({ hello: 'world' });
	const test = await knex('sqlite_schema').select('*');
	console.log(test);
});

app
	.listen({ port: 3000 })
	.then(() => {
		console.log('Server listening at http://localhost:3000');
	})
	.then((error) => {
		console.log(error);
	});
