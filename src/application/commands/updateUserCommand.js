class UpdateUserCommand {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async execute(id, userData) {
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
  }
  
  module.exports = UpdateUserCommand;