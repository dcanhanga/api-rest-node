import { randomUUID } from 'node:crypto';
import { knex } from '@/database.js';
import type { FastifyInstance } from 'fastify';
import { z } from 'zod';

export async function transactionsRoutes(app: FastifyInstance) {
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
