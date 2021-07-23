import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

interface OrderAttributes {
  id: string;
  orderNumber: number;
  responsiblePerson: string;
  healthCareDistrict: string;
  vaccine: string;
  injections: number;
  arrived: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderModel extends Model<OrderAttributes>, OrderAttributes {}

type OrderStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): OrderModel;
};

export function orderFactory(sequelize: Sequelize): OrderStatic {
  return <OrderStatic>sequelize.define('order', {
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
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });
}

interface VaccinationAttributes {
  id: string;
  sourceBottle: string;
  gender: string;
  vaccinationDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface VaccinationModel
  extends Model<VaccinationAttributes>,
    VaccinationAttributes {}

type VaccinationStatic = typeof Model & {
  new (
    values?: Record<string, unknown>,
    options?: BuildOptions
  ): VaccinationModel;
};

export function vaccinationFactory(sequelize: Sequelize): VaccinationStatic {
  return <VaccinationStatic>sequelize.define('vaccination', {
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
    }
  });
}
