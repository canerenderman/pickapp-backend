
module.exports = (sequelize, DataTypes) => {
  var UserInput = sequelize.define('UserInput', {
    gym: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sportType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availability: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.DATE,
    },
    processed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  UserInput.associate = (models) => {
    // associations can be defined here
    UserInput.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return UserInput;
};