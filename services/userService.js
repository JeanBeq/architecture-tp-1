// services/userService.js
const User = require('../models/userModel');
const Profile = require('../models/profileModel');

exports.getAllUsers = async () => {
  return await User.findAll({ include: Profile });
};

exports.createUser = async (userData) => {
  const profile = await Profile.findOrCreate({
    where: { id: userData.profileId || 1 }, 
    defaults: { role: 'user' }
  });
  userData.profileId = profile[0].id;
  return await User.create(userData);
};

exports.updateUser = async (id, userData) => {
  const user = await User.findByPk(id);
  if (user) {
    user.email = userData.email;
    user.lastName = userData.lastName;
    user.firstName = userData.firstName;
    user.phoneNumber = userData.phoneNumber;
    user.profileId = userData.profileId;
    await user.save();
    return user;
  }
  return null;
};

exports.deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (user) {
    await user.destroy();
  }
};