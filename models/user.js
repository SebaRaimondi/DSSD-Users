'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    pass: {
      type: DataTypes.STRING,
      validate: { isEmail: true }
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};