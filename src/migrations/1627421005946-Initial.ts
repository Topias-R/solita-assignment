import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Initial1627421005946 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'orderNumber',
            type: 'int',
            isNullable: false
          },
          {
            name: 'responsiblePerson',
            type: 'varchar(255)',
            isNullable: false
          },
          {
            name: 'healthCareDistrict',
            type: 'varchar(255)',
            isNullable: false
          },
          {
            name: 'vaccine',
            type: 'varchar(255)',
            isNullable: false
          },
          {
            name: 'injections',
            type: 'smallint',
            isNullable: false
          },
          {
            name: 'arrived',
            type: 'timestamptz',
            isNullable: false
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            isNullable: false,
            default: 'now()'
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            isNullable: false,
            default: 'now()'
          }
        ]
      })
    );
    await queryRunner.createTable(
      new Table({
        name: 'vaccinations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'sourceBottle',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'gender',
            type: 'varchar(255)',
            isNullable: false
          },
          {
            name: 'vaccinationDate',
            type: 'timestamptz',
            isNullable: false
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            isNullable: false,
            default: 'now()'
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            isNullable: false,
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            columnNames: ['sourceBottle'],
            referencedTableName: 'orders',
            referencedColumnNames: ['id']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vaccinations');
    await queryRunner.dropTable('orders');
  }
}
