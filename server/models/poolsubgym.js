'use strict';
module.exports = (sequelize, DataTypes) => {
  var PoolSubgym = sequelize.define('PoolSubgym', {
    time: DataTypes.DOUBLE,
    timeDifference: DataTypes.DOUBLE
  }, {});
  PoolSubgym.associate = function(models) {
    // associations can be defined here
    PoolSubgym.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return PoolSubgym;
};