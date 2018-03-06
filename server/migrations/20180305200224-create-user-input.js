
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('UserInputs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gym: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sportType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      availability: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.DATE
      },
      processed: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
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
    queryInterface.dropTable('UserInputs'),
};