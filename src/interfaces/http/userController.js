// src/interfaces/http/userController.js
const UserService = require('../../domain/services/userService');
const UserModel = require('../../infrastructure/orm/sequelize/models/userModel');
const ProfileModel = require('../../infrastructure/orm/sequelize/models/profileModel');

const userService = new UserService(UserModel, ProfileModel);

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, lastName, firstName, phoneNumber, profileId } = req.body;
    const newUser = await userService.createUser({ email, lastName, firstName, phoneNumber, profileId });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, lastName, firstName, phoneNumber, profileId } = req.body;
    const user = await userService.updateUser(id, { email, lastName, firstName, phoneNumber, profileId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};