import { randomUUID } from 'node:crypto';
import { knex } from '@/database.js';
import type { FastifyInstance } from 'fastify';
import { z } from 'zod';

export async function transactionsRoutes(app: FastifyInstance) {
	app.get('/', async () => {
		const transactions = await knex('transactions').select('*');

		return transactions;
	});
	app.get('/:id', async (req) => {
		const getTransactionsParamsSchema = z.object({
			id: z.string().uuid(),
		});
		const { id } = getTransactionsParamsSchema.parse(req.params);
		const transactions = await knex('transactions')
			.select('*')
			.where({
				id,
			})
			.first();
		return transactions;
	});
	app.get('/summary', async () => {
		const summary = await knex('transactions')
			.sum('amount', {
				as: 'amount',
			})
			.first();
		return summary;
	});

	app.post('/', async (req, rep) => {
		const createTransactionsBodySchema = z.object({
			title: z.string(),
			amount: z.number(),
			type: z.enum(['credit', 'debit']),
		});
		const { amount, title, type } = createTransactionsBodySchema.parse(
			req.body,
		);
		await knex('transactions').insert({
			id: randomUUID(),
			title,
			amount: type === 'credit' ? amount : amount * -1,
		});
		rep
			.send({
				message: 'Transaction created successfully',
			})
			.code(201);
	});
}
