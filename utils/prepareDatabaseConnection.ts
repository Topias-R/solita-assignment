import env from 'dotenv-safe';
env.config();

import 'reflect-metadata';

import { createConnection, getConnection } from 'typeorm';
import { wrapTypes } from '../utils/wrapTypes';

import { Order } from '../entity/Order';
import { Vaccination } from '../entity/Vaccination';

export const prepareDatabaseConnection = wrapTypes(() => {
  try {
    return getConnection();
  } catch {
    return createConnection({
      type: 'postgres',
      host: 'postgres',
      username: 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      entities: [Order, Vaccination]
    });
  }
});
