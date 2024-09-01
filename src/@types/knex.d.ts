import { Knex } from 'knex';
declare module 'knex/types/tables.js' {
	interface Tables {
		transactions: {
			id: string;
			sessions_id?: string;
			title: string;
			amount: number;
			created_at?: string;
		};
	}
}
