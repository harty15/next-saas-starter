import dotenv from 'dotenv';
import path from 'path';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { client, db } from './drizzle';

dotenv.config();

async function main() {
  console.log('Migrating database...');
  await migrate(db, {
    migrationsFolder: path.join(process.cwd(), '/lib/db/migrations'),
  });
  await client.end();
}

main();
