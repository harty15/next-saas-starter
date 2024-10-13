import type { Config } from 'drizzle-kit';
import { config } from './lib/config';  // Adjust this path if necessary

export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: config.databaseUrl,
  },
} satisfies Config;
