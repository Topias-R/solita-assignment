import 'reflect-metadata';
import {
  Connection,
  createConnection,
  getConnection,
  getConnectionOptions
} from 'typeorm';
import { Order } from '../entities/Order';
import { Vaccination } from '../entities/Vaccination';
import { Initial1627421005946 } from '../migrations/1627421005946-Initial';
import { SeedOrders1627423498795 } from '../migrations/1627423498795-SeedOrders';
import { SeedVaccinations1627485392299 } from '../migrations/1627485392299-SeedVaccinations';

export async function prepareDatabaseConnection(): Promise<Connection> {
  const connectionOptions = await getConnectionOptions();
  const options = Object.assign(connectionOptions, {
    entities: [Order, Vaccination],
    migrations: [
      Initial1627421005946,
      SeedOrders1627423498795,
      SeedVaccinations1627485392299
    ]
  });

  if (process.env.NODE_ENV !== 'development') {
    try {
      await repairBrokenConnection();
      return getConnection();
    } catch {
      return createConnection(options);
    }
  } else {
    try {
      // Create new connection for every request in development to make HMR work
      await getConnection().close();
      return createConnection(options);
    } catch {
      return createConnection(options);
    }
  }
}

// Fixes a terminated connection issue with TypeORM & Postgres
async function repairBrokenConnection() {
  const connection = getConnection();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const driver = connection.driver as any;
  for (const client of driver.master._clients) {
    try {
      await client.query('SELECT 1');
    } catch {
      await getConnection().driver.disconnect();
      await getConnection().driver.connect();
      break;
    }
  }
}
