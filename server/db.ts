import { createConnection } from 'typeorm';
import { wrapTypes } from '../utils/wrapTypes';

export const prepareDatabaseConnection = wrapTypes(() =>
  createConnection({
    type: 'postgres',
    host: 'postgres',
    username: 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    logging: true,
    entities: ['server/entity/*.ts'],
    migrations: ['server/migration/*.ts'],
    migrationsRun: true,
    migrationsTransactionMode: 'each'
  })
);
