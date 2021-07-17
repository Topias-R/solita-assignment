import { Sequelize, QueryInterface } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';

export default function (sequelize: Sequelize): Umzug<QueryInterface> {
  const umzug = new Umzug({
    migrations: [
      /*       {
        name: '00-initial',
        async up({ context: queryInterface }) {

        },
        async down({ context: queryInterface }) {

        }
      } */
    ],
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console
  });

  return umzug;
}
