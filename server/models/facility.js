'use strict';
module.exports = (sequelize, DataTypes) => {
  var Facility = sequelize.define('Facility', {
    sportType: {
    	type: DataTypes.STRING,
    	allowNull: false,
	},
  });
  Facility.associate = function(models) {
    // associations can be defined here
    Facility.belongsTo(models.Location, {
      foreignKey: 'locationId',
      onDelete: 'CASCADE',
    });
  };
  return Facility;
};