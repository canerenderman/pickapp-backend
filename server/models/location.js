'use strict';
module.exports = (sequelize, DataTypes) => {
  var Location = sequelize.define('Location', {
    title: DataTypes.STRING
  }, {});
  Location.associate = function(models) {
    Location.hasMany(models.Facility, {
      foreignKey: 'locationId',
      as: 'facilities'
    });
  };
  return Location;
};