import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

const CUSTOMER_TABLE = 'customer';

export interface CustomerAttributes {
  id?: number;

  name: string;
  lastName: string;
  cellPhoneNumber: number;
  country: string;
  avatar: string;
  userId: number;
}

const customerSchema = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },

  cellPhoneNumber: {
    field: 'cell_phone_number',
    type: DataTypes.NUMBER,
    allowNull: true,
    unique: true,
  },

  country: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },

  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: 'user',
      key: 'id',
    },
  },
};

export interface customerInput extends Optional<CustomerAttributes, 'id'> {}
export interface customerOutput extends Required<CustomerAttributes> {}

class Customer
  extends Model<CustomerAttributes, customerInput>
  implements CustomerAttributes
{
  public id!: number;
  public name!: string;
  public lastName!: string;
  public cellPhoneNumber!: number;
  public country!: string;
  public avatar!: string;
  public userId!: number;

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'customer',
      timestamps: false,
    };
  }
}

export { customerSchema, Customer };
