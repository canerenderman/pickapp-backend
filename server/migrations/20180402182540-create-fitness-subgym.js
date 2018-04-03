'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('FitnessSubgyms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hour: {
        type: Sequelize.DOUBLE
      },
      availability: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
    }),
  down: (queryInterface /*, Sequelize*/) => 
    queryInterface.dropTable('FitnessSubgyms'),
};