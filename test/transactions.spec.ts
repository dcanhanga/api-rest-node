import { execSync } from 'node:child_process';

import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { app } from '../src/app.js';

describe('Transactions routes', () => {
	beforeAll(async () => {
		await app.ready();
	});
	afterAll(async () => {
		await app.close();
	});
	beforeEach(() => {
		execSync('npm run knex:test:migrate:rollback --all');
		execSync('npm run knex:test:migrate:latest');
	});

	it('should be able to create a new transaction', async () => {
		await request(app.server)
			.post('/transactions')
			.send({
				title: 'Test Transaction',
				amount: 100,
				type: 'credit',
			})
			.expect(201);
	});
	it('should be able to list all transactions', async () => {
		const createTransactionResponse = await request(app.server)
			.post('/transactions')
			.send({ title: 'Test Transaction', amount: 100, type: 'credit' });
		const cookies = createTransactionResponse.get('Set-Cookie');
		const listTransactionsResponse = await request(app.server)
			.get('/transactions')
			.set('Cookie', cookies as string[])
			.expect(200);
		expect(listTransactionsResponse.body.transactions).toEqual([
			expect.objectContaining({
				title: 'Test Transaction',
				amount: 100,
			}),
		]);
	});
	it('should be able to get specific transaction', async () => {
		const createTransactionResponse = await request(app.server)
			.post('/transactions')
			.send({ title: 'Test Transaction', amount: 100, type: 'credit' });
		const cookies = createTransactionResponse.get('Set-Cookie');
		const listTransactionsResponse = await request(app.server)
			.get('/transactions')
			.set('Cookie', cookies as string[])
			.expect(200);

		expect(listTransactionsResponse.body.transactions).toEqual([
			expect.objectContaining({
				title: 'Test Transaction',
				amount: 100,
			}),
		]);
		const transactionId = listTransactionsResponse.body.transactions[0].id;
		console.log({ transactionId });
		const transactionResponse = await request(app.server)
			.get(`/transactions/${transactionId}`)
			.set('Cookie', cookies as string[])
			.expect(200);

		expect(transactionResponse.body.transaction).toEqual(
			expect.objectContaining({
				title: 'Test Transaction',
				amount: 100,
			}),
		);
	});
});
