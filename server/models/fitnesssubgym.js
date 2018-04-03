
module.exports = (sequelize, DataTypes) => {
  var FitnessSubgym = sequelize.define('FitnessSubgym', {
    hour: {
      type: DataTypes.DOUBLE,
    },
    availability: {
      type: DataTypes.DOUBLE,
    },
  });
  FitnessSubgym.associate = function(models) {
    // associations can be defined here
    FitnessSubgym.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return FitnessSubgym;
};