// controllers/userController.js
const User = require('../models/userModel');
const Profile = require('../models/profileModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: Profile });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, lastName, firstName, phoneNumber, profileId } = req.body;
    const profile = await Profile.findOrCreate({
      where: { id: profileId || 1 },
      defaults: { role: 'user' }
    });
    const newUser = await User.create({ email, lastName, firstName, phoneNumber, profileId: profile[0].id });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, lastName, firstName, phoneNumber, profileId } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.email = email;
    user.lastName = lastName;
    user.firstName = firstName;
    user.phoneNumber = phoneNumber;
    user.profileId = profileId;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};