'use strict';
module.exports = (sequelize, DataTypes) => {
  var BasketballSubgym = sequelize.define('BasketballSubgym', {
    time: DataTypes.DOUBLE,
    timeDifference: DataTypes.DOUBLE
  }, {});
  BasketballSubgym.associate = function(models) {
    // associations can be defined here
    BasketballSubgym.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return BasketballSubgym;
};