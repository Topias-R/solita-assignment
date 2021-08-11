import { createReadStream } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Vaccination } from '../entities/Vaccination';

export class SeedVaccinations1627485392299 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const vaccinations = [];

    const rl = createInterface({
      input: createReadStream(
        join(__dirname, '..', 'seeds', 'vaccinations.source')
      ),
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      vaccinations.push(JSON.parse(line));
    }

    await queryRunner.connection
      .createQueryBuilder()
      .insert()
      .into(Vaccination)
      .values(
        vaccinations.map(({ 'vaccination-id': id, ...rest }) => ({
          id,
          ...rest
        }))
      )
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const vaccinationIds = [];

    const rl = createInterface({
      input: createReadStream(
        join(__dirname, '..', 'seeds', 'vaccinations.source')
      ),
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      vaccinationIds.push(JSON.parse(line)['vaccination-id']);
    }

    await queryRunner.connection
      .createQueryBuilder()
      .delete()
      .from(Vaccination)
      .where('id IN (:...vaccinationIds)', { vaccinationIds })
      .execute();
  }
}
