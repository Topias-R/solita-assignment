import { DataTypes } from 'sequelize';
import { sequelize } from './db';
import { Umzug, SequelizeStorage } from 'umzug';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { join } from 'path';

export const umzug = new Umzug({
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
  migrations: [
    {
      name: '00_initial_migration',
      async up({ context: queryInterface }) {
        await queryInterface.createTable('orders', {
          id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
          },
          orderNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          responsiblePerson: {
            type: DataTypes.STRING,
            allowNull: false
          },
          healthCareDistrict: {
            type: DataTypes.STRING,
            allowNull: false
          },
          vaccine: {
            type: DataTypes.STRING,
            allowNull: false
          },
          injections: {
            type: DataTypes.SMALLINT,
            allowNull: false
          },
          arrived: {
            type: DataTypes.DATE,
            allowNull: false
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now()
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now()
          }
        });
        await queryInterface.createTable('vaccinations', {
          id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
          },
          sourceBottle: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: 'orders',
              key: 'id'
            }
          },
          gender: {
            type: DataTypes.STRING,
            allowNull: false
          },
          vaccinationDate: {
            type: DataTypes.DATE,
            allowNull: false
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now()
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now()
          }
        });
      },
      async down({ context: queryInterface }) {
        await queryInterface.dropTable('vaccinations');
        await queryInterface.dropTable('orders');
      }
    },
    {
      name: '01_order_seed',
      async up({ context: queryInterface }) {
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

        await queryInterface.bulkInsert('orders', orders);
      },
      async down({ context: queryInterface }) {
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

        await queryInterface.bulkDelete('orders', {
          id: orderIds
        });
      }
    },
    {
      name: '02_vaccination_seed',
      async up({ context: queryInterface }) {
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

        await queryInterface.bulkInsert(
          'vaccinations',
          vaccinations.map(({ 'vaccination-id': id, ...rest }) => ({
            id,
            ...rest
          }))
        );
      },
      async down({ context: queryInterface }) {
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

        await queryInterface.bulkDelete('vaccinations', {
          id: vaccinationIds
        });
      }
    }
  ]
});
