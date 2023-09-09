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
      company: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  },
};
