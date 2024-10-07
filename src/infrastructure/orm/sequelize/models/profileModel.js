// src/infrastructure/orm/sequelize/models/profileModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database');

const ProfileModel = sequelize.define('Profile', {
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

module.exports = ProfileModel;