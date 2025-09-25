import { logger } from '@adapters';
import { PrismaClient } from '@prisma/client';
import { PostgreSqlContainer, type StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { execSync } from 'child_process';

export let dbContainer: StartedPostgreSqlContainer;
export let testDbConn: PrismaClient;

export const createAndSetupDb = async () => {
  dbContainer = await new PostgreSqlContainer('postgres:alpine')
    .withDatabase('test_expenses_db')
    .withUsername('postgres')
    .withPassword('postgres')
    .start();

  // Storing variables coming from container
  process.env.TEST_DB_HOST = dbContainer.getHost();
  process.env.TEST_DB_PORT = dbContainer.getPort().toString();
  process.env.TEST_DB_NAME = dbContainer.getDatabase();
  process.env.TEST_DB_USER = dbContainer.getUsername();
  process.env.TEST_DB_PASS = dbContainer.getPassword();
};

export const runMigrations = () => {
  const dbUrl = `postgresql://${process.env.TEST_DB_USER}:${process.env.TEST_DB_PASS}@${process.env.TEST_DB_HOST}:${process.env.TEST_DB_PORT}/${process.env.TEST_DB_NAME}`;

  process.env.DATABASE_URL = dbUrl;

  // Run Prisma migrations against the test DB
  execSync(`npx prisma migrate deploy`, {
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: dbUrl, // ensure Prisma picks up the test DB
    },
  });
};

export const connectTestDb = async () => {
  try {
    testDbConn = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } });
    await testDbConn.$connect();
    logger.info('🔥 Test Prisma - Connection to db has been established successfully.');
    return testDbConn;
  } catch (err) {
    logger.error(`Connection to db failed => ${(err as Error).message ?? 'DB failure'}`);
    throw err;
  }
};

export const tearDownDb = async () => {
  if (testDbConn) await testDbConn.$disconnect();
  if (dbContainer) await dbContainer.stop();
};
