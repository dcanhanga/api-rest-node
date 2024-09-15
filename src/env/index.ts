import { z } from 'zod';

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
	DATA_BASE_CLIENT: z.string(),
	DATA_BASE_URL: z.string(),
	PORT: z.number().default(3333),
});

const { success, data, error } = envSchema.safeParse(process.env);
if (success === false) {
	console.error('Environment variables are not set', error.errors);
	throw new Error('Environment variables are not set');
}

export const env = data;
