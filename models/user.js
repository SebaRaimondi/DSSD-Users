'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true }
    },
    pass: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};