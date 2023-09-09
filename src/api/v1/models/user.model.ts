import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { encryptData } from '../../../framework/utils/bcrypt';

const USER_TABLE = 'user';

export interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  rol: string;
  isActive: boolean;
}

const userSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },

  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  rol: {
    allowNull: false,
    type: DataTypes.ENUM('admin', 'limit'),
    defaultValue: 'admin',
  },
  isActive: {
    field: 'is_active',
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

  company: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
};

export interface UserInput extends Optional<UserAttributes, 'id'> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public rol!: string;
  public isActive!: boolean;

  static associate() {}

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'user',
      timestamps: false,
      hooks: {
        beforeCreate: async (user: User) => {
          const ecriptedPassword = await encryptData(user.password);
          console.log('create');

          user.password = ecriptedPassword;
        },
      },
    };
  }
}

export { userSchema, User };
