// models/userModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Profile = require('./profileModel');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.TINYINT,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING(14),
    allowNull: false
  },
  profileId: {
    type: DataTypes.TINYINT,
    allowNull: false,
    references: {
      model: Profile,
      key: 'id'
    }
  }
}, {
  timestamps: false,
  tableName: 'user'
});

Profile.hasMany(User, { foreignKey: 'profileId' });
User.belongsTo(Profile, { foreignKey: 'profileId' });

module.exports = User;