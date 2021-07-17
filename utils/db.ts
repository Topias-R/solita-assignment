import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'postgres',
  'postgres',
  process.env.POSTGRES_PASSWORD,
  {
    host: 'postgres',
    dialect: 'postgres'
  }
);

export default sequelize;
