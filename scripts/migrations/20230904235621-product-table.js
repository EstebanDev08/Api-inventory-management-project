'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },

      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      rol: {
        allowNull: false,
        type: Sequelize.ENUM('admin', 'limit'),
        defaultValue: 'admin',
      },
      isActive: {
        field: 'is_active',
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      companyId: {
        field: 'company_id',
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });

    await queryInterface.createTable('customer', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'last_name',
      },

      cellPhoneNumber: {
        field: 'cell_phone_number',
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
      },

      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      userId: {
        field: 'user_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('customer');
    await queryInterface.dropTable('user');
  },
};
