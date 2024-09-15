import SetupKnex, { type Knex } from 'knex';
import { env } from './env/index.js';

export const config: Knex.Config = {
	client: env.DATA_BASE_CLIENT,
	connection:
		env.DATA_BASE_CLIENT === 'sqlite3'
			? {
					filename: env.DATA_BASE_URL,
				}
			: env.DATA_BASE_URL,
	migrations: {
		extension: 'ts',
		directory: './database/migrations',
	},
	useNullAsDefault: true,
};
export const knex = SetupKnex(config);
