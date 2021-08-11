import { createReadStream } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Order } from '../entities/Order';

export class SeedOrders1627423498795 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const sourceFiles = [
      join(__dirname, '..', 'seeds', 'Antiqua.source'),
      join(__dirname, '..', 'seeds', 'SolarBuddhica.source'),
      join(__dirname, '..', 'seeds', 'Zerpfy.source')
    ];

    const orders = [];

    for (const sourceFile of sourceFiles) {
      const rl = createInterface({
        input: createReadStream(sourceFile),
        crlfDelay: Infinity
      });
      for await (const line of rl) {
        orders.push(JSON.parse(line));
      }
    }

    await queryRunner.connection
      .createQueryBuilder()
      .insert()
      .into(Order)
      .values(orders)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const sourceFiles = [
      join(__dirname, '..', 'seeds', 'Antiqua.source'),
      join(__dirname, '..', 'seeds', 'SolarBuddhica.source'),
      join(__dirname, '..', 'seeds', 'Zerpfy.source')
    ];

    const orderIds = [];

    for (const sourceFile of sourceFiles) {
      const rl = createInterface({
        input: createReadStream(sourceFile),
        crlfDelay: Infinity
      });
      for await (const line of rl) {
        orderIds.push(JSON.parse(line).id);
      }
    }

    await queryRunner.connection
      .createQueryBuilder()
      .delete()
      .from(Order)
      .where('id IN (:...orderIds)', { orderIds })
      .execute();
  }
}
