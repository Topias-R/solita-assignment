import 'reflect-metadata';
import {
  Connection,
  createConnection,
  getConnection,
  getConnectionOptions
} from 'typeorm';
import { Order } from '../entity/Order';
import { Vaccination } from '../entity/Vaccination';
import { Initial1627421005946 } from '../migration/1627421005946-Initial';
import { SeedOrders1627423498795 } from '../migration/1627423498795-SeedOrders';
import { SeedVaccinations1627485392299 } from '../migration/1627485392299-SeedVaccinations';

export async function prepareDatabaseConnection(): Promise<Connection> {
  try {
    return getConnection();
  } catch {
    const connectionOptions = await getConnectionOptions();
    return createConnection(
      Object.assign(connectionOptions, {
        entities: [Order, Vaccination],
        migrations: [
          Initial1627421005946,
          SeedOrders1627423498795,
          SeedVaccinations1627485392299
        ]
      })
    );
  }
}
