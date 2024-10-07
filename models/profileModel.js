const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.TINYINT,
    autoIncrement: true,
    primaryKey: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user' 
  }
}, {
  timestamps: false,
  tableName: 'profile'
});

module.exports = Profile;