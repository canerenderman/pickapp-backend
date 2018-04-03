
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
	}
  // }, 
});
  User.associate = (models) => {
    User.hasMany(models.UserInput, {
  		foreignKey: 'userId',
  		as: 'userInputs'
  	}),
    User.hasMany(models.FitnessSubgym, {
      foreignKey: 'userId',
      as: 'fitnessSubgyms'
    }),
    User.hasMany(models.BasketballSubgym, {
      foreignKey: 'userId',
      as: 'basketballSubgyms'
    }),
    User.hasMany(models.PoolSubgym, {
      foreignKey: 'userId',
      as: 'poolSubgyms'
    }),
    User.hasMany(models.TrackSubgym, {
      foreignKey: 'userId',
      as: 'trackSubgyms'
    })
  };
  return User;
};