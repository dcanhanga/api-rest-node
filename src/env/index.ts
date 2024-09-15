import { z } from 'zod';

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
	DATA_BASE_CLIENT: z.enum(['pg', 'sqlite3']).default('pg'),
	DATA_BASE_URL: z.string(),
	PORT: z.coerce.number().default(3333),
	host: z.string().default('0.0.0.0'),
});

const { success, data, error } = envSchema.safeParse(process.env);
if (success === false) {
	console.error('Environment variables are not set', error.errors);
	throw new Error('Environment variables are not set');
}

export const env = data;
