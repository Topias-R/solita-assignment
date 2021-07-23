import { Sequelize } from 'sequelize';
import { orderFactory, vaccinationFactory } from './models';

export const sequelize = new Sequelize(
  'postgres',
  'postgres',
  process.env.POSTGRES_PASSWORD,
  {
    retry: {
      match: [
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/
      ],
      max: 34
    },
    host: 'postgres',
    dialect: 'postgres'
  }
);

export const Order = orderFactory(sequelize);
export const Vaccination = vaccinationFactory(sequelize);

Order.hasMany(Vaccination, { foreignKey: 'sourceBottle' });
Vaccination.belongsTo(Order, { foreignKey: 'sourceBottle' });
