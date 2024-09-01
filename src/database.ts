import SetupKnex from 'knex';
export const knex = SetupKnex({
	client: 'sqlite3',
	connection: {
		filename: './temp/app.db',
	},
});
