// src/domain/services/userService.js
const User = require('../models/user');
const Profile = require('../models/profile');

class UserService {
  constructor(userRepository, profileRepository) {
    this.userRepository = userRepository;
    this.profileRepository = profileRepository;
  }

  async getAllUsers() {
    return await this.userRepository.findAll({ include: this.profileRepository });
  }

  async createUser(userData) {
    const profile = await this.profileRepository.findOrCreate({
      where: { id: userData.profileId || 1 },
      defaults: { role: 'user' }
    });
    userData.profileId = profile[0].id;
    return await this.userRepository.create(userData);
  }

  async updateUser(id, userData) {
    const user = await this.userRepository.findByPk(id);
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
  }

  async deleteUser(id) {
    const user = await this.userRepository.findByPk(id);
    if (user) {
      await user.destroy();
    }
  }
}

module.exports = UserService;