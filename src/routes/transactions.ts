import { randomUUID } from 'node:crypto';

import { knex } from './../database.js';

import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { checkSessionIdExists } from './../middlewares/check-session-id-exists.js';

export async function transactionsRoutes(app: FastifyInstance) {
	app.get('/', { preHandler: [checkSessionIdExists] }, async (req) => {
		const { sessionId } = req.cookies;

		const transactions = await knex('transactions')
			.select('*')
			.where({ session_id: sessionId });

		return { transactions };
	});
	app.get('/:id', { preHandler: [checkSessionIdExists] }, async (req) => {
		const getTransactionsParamsSchema = z.object({
			id: z.string().uuid(),
		});
		const { id } = getTransactionsParamsSchema.parse(req.params);
		const { sessionId } = req.cookies;
		const transaction = await knex('transactions')
			.select('*')
			.where({
				id,
				session_id: sessionId,
			})
			.first();
		return { transaction };
	});
	app.get('/summary', { preHandler: [checkSessionIdExists] }, async () => {
		const summary = await knex('transactions')
			.sum('amount', {
				as: 'amount',
			})
			.first();
		return { summary };
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

		let { sessionId } = req.cookies;

		if (!sessionId) {
			sessionId = randomUUID();
			rep.cookie('sessionId', sessionId, {
				path: '/',
				maxAge: 60 * 60 * 24 * 7, // 7 days
			});
		}
		await knex('transactions').insert({
			id: randomUUID(),
			title,
			amount: type === 'credit' ? amount : amount * -1,
			session_id: sessionId,
		});
		return rep.status(201).send({
			message: 'Transaction created successfully',
		});
	});
}
