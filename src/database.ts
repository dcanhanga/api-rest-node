import SetupKnex, { type Knex } from 'knex';
export const config: Knex.Config = {
	client: 'sqlite3',
	connection: {
		filename: './database/app.db',
	},
	migrations: {
		extension: 'ts',
		directory: './database/migrations',
	},
	useNullAsDefault: true,
};
export const knex = SetupKnex(config);
