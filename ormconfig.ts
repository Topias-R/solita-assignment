import env from 'dotenv-safe';
env.config();

export = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  database: 'postgres',
  username: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  logging: true,
  entities: ['entity/*.ts'],
  migrations: ['migration/*.ts'],
  cli: {
    migrationsDir: 'migration'
  },
  migrationsRun: true,
  migrationsTransactionMode: 'each'
};
