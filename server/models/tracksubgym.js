'use strict';
module.exports = (sequelize, DataTypes) => {
  var TrackSubgym = sequelize.define('TrackSubgym', {
    time: DataTypes.DOUBLE,
    timeDifference: DataTypes.DOUBLE
  }, {});
  TrackSubgym.associate = function(models) {
    // associations can be defined here
    TrackSubgym.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return TrackSubgym;
};