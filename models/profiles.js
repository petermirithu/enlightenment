'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      profiles.belongsTo(models.users,{foreignKey: 'userId', as: 'User'})
    }
  };
  profiles.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    profile_pic: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'profiles',
  });
  return profiles;
};