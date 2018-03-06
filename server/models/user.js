
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
  	})
  };
  return User;
};